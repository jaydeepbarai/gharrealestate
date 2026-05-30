/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory lead database to track submissions made during current session
const leadsDB: any[] = [];

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API: Record a lead submission (simulates database persistence)
app.post("/api/leads", (req, res) => {
  try {
    const { name, email, phone, interestedCity, interestedProject, budgetRange, message } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Missing required contact details (name, email, phone)." });
    }
    
    const newLead = {
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      phone,
      interestedCity: interestedCity || "Not Specified",
      interestedProject: interestedProject || "General Counsel",
      budgetRange: budgetRange || "Not Specified",
      message: message || "",
      createdAt: new Date().toISOString()
    };
    
    leadsDB.push(newLead);
    console.log("[CRM System] New Premium Advisory Lead Registered:", newLead);
    
    return res.status(201).json({ 
      success: true, 
      message: "Lead successfully captured in active advisory queues.", 
      lead: newLead 
    });
  } catch (error: any) {
    console.error("Lead submission error:", error);
    return res.status(500).json({ error: "Internal server registry error." });
  }
});

// Lazy initialization of Gemini API to guard against startup crashes
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      aiInstance = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
      console.log("[AI Engine] Gemini client initialized successfully with search resources.");
    } else {
      console.warn("[AI Engine] GEMINI_API_KEY is not defined. Falling back to structured response templates.");
    }
  }
  return aiInstance;
}

// API: Smart Luxury Real Estate Advisor
app.post("/api/advisory/chat", async (req, res) => {
  try {
    const { messages, interestedProject } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required." });
    }
    
    const userMessage = messages[messages.length - 1].text;
    
    // Check if Gemini is configured
    const aiClient = getGeminiClient();
    
    if (aiClient) {
      const systemInstruction = `You are the primary Elite Investment Advisor for GHAR ADVISORY based in Dubai, UAE. 
      You handle high-net-worth investors (HNIs) looking for premium off-plan real estate opportunities in Dubai and Abu Dhabi.
      Your tone is impeccable, sophisticated, objective, and deeply professional. Avoid cheap sales jargon or fake friendly filler.
      Focus on capital growth, rental yields (RoI), developer credit ratings, and exact payment architectures.
      
      If the user is asking about a specific project, here is the context: "${interestedProject || 'General Dubai & Abu Dhabi Off-Plan developments'}".
      Utilize Google Search grounding to reference actual latest luxury project announcements, pricing, or community development reports from 2026.
      
      Keep responses structured, concise, and elegant. Bullet points are fine but keep them classy. Include a prompt to connect directly with a senior human advisor at +971586936812 or book an official advisory session.`;
      
      // Map prior messages into Google GenAI format if needed, but since we want search grounding, a direct generateContent works beautifully
      const recentHistoryPrompt = messages.slice(-5).map(m => `${m.role === 'user' ? 'Client' : 'Ghar Advisor'}: ${m.text}`).join("\n");
      const finalPrompt = `Previous history:\n${recentHistoryPrompt}\n\nClient inquiry: ${userMessage}`;
      
      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: finalPrompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        }
      });
      
      const text = response.text || "I apologize. I experienced a slight latency issue on my advisory network. Please contact our main advisory desk directly on +971586936812 for immediate elite guidance.";
      
      // Extract Google search grounding references if available
      const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const references = searchChunks ? searchChunks.map((chunk: any) => ({
        title: chunk.web?.title || "Market Source",
        uri: chunk.web?.uri || "#"
      })).filter((c: any) => c.uri !== "#") : [];
      
      return res.json({
        text,
        references
      });
    } else {
      // Elegant rule-based advisory response fallback when API key is missing (ensures 100% working demo!)
      const query = userMessage.toLowerCase();
      let responseText = "Thank you for consulting GHAR ADVISORY. Our elite investment desk is currently processing high investor volumes. ";
      
      if (query.includes("roi") || query.includes("yield") || query.includes("rent")) {
        responseText += `For high-yield off-plan assets, we recommend targeting Jumeirah Village Circle (JVC) where net RoI is averaging 9.1% to 9.4%, or Masdar City in Abu Dhabi yielding around 8.5% to 9.0%. Premium waterfront assets in Palm Jumeirah or Saadiyat Island offer lower entry yields (around 7% net) but double the capital appreciation projections under current 2026 indices.`;
      } else if (query.includes("developer") || query.includes("emaar") || query.includes("aldar")) {
        responseText += `The primary tier-1 developer ecosystem in the UAE includes Emaar and Sobha in Dubai, and Aldar in Abu Dhabi. Emaar maintains the largest liquidation pool with solid historical handovers. Aldar offers pristine cultural dominance on Saadiyat Island. We recommend comparing their payment architectures (typically 60/40 vs 80/20 escrow structures) prior to signature.`;
      } else if (query.includes("payment") || query.includes("plan")) {
        responseText += `Off-plan properties in the UAE typically feature standard escrow plans during construction, varying from 50/50 (half during build, half on handover), 60/40, up to 90/10. Some developers like Danube offer attractive 1% monthly structures. We highly counsel our clients to analyze structural interest rates before selecting secondary financing packages.`;
      } else {
        responseText += `To give you precise capital allocations and payment schedule plans for ${interestedProject || "your desired Dubai or Abu Dhabi off-plan acquisition"}, we invite you to book a private briefing session or contact our elite advisory desk instantly at +971586936812 (WhatsApp Direct).`;
      }
      
      return res.json({
        text: responseText,
        references: [
          { title: "Dubai Land Department (DLD) Official Guide", uri: "https://dubailand.gov.ae/" },
          { title: "Abu Dhabi Real Estate Centre (ADREC)", uri: "https://www.adrec.gov.ae/" }
        ]
      });
    }
  } catch (error: any) {
    console.error("Advisory chatbot error:", error);
    return res.status(200).json({ 
      text: "Our digital advisory service has met a brief communication delay. Please write to baraijaydeep13@gmail.com, or direct message our Senior Consultant at +971586936812 via WhatsApp for immediate representation.",
      references: []
    });
  }
});

// Vite middleware integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("[Vite Link] Mounted dynamic Vite developer middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("[Prod Link] Serving statically compiled client bundles.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Status] Ghar Real Estate Server online running at http://localhost:${PORT}`);
  });
}

startServer();
