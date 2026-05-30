/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  slug: string;
  name: string;
  developer: string;
  city: 'Dubai' | 'Abu Dhabi';
  community: string;
  location: string;
  startingPrice: number;
  currency: string;
  paymentPlan: string;
  handover: string;
  propertyTypes: string[];
  bedrooms: string[];
  status: 'Upcoming' | 'Launched' | 'Selling' | 'Sold Out';
  description: string;
  highlights: string[];
  amenities: string[];
  images: string[];
  brochureUrl: string;
  latitude: number;
  longitude: number;
  expectedROI?: string;
  sqftRange?: string;
}

export interface InquiryLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedCity: string;
  interestedProject: string;
  budgetRange: string;
  message: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
