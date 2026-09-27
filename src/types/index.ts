export type SegmentId = 'gastronomia' | 'lojas' | 'comercio' | 'profissionais' | 'personalizado';

export interface Segment {
  id: SegmentId;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  features: string[];
  mockupTitle: string;
  mockupSubtitle: string;
  highlightText: string;
  exampleImage?: string;
  whatsappMessage: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  badgeText?: string;
}

export interface PackageTier {
  id: string;
  title: string;
  subtitle: string;
  priceTag: string;
  priceNote: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaType: 'demo' | 'consult' | 'call';
  introText?: string;
  noCommitmentNotice?: string;
  featuresTitle?: string;
  closingQuestion?: string;
  disclaimer?: string;
}

export interface DemoProject {
  id: string;
  title: string;
  segment: string;
  description: string;
  image: string;
  tag: string;
  features: string[];
  actionLabel: string;
  headline?: string;
  bodyParagraphs?: string[];
  highlightTakeaway?: string;
  detailedItems?: { title: string; desc: string }[];
}

export interface DemoRequestData {
  businessName: string;
  segment: string;
  city: string;
  whatsapp: string;
  hasWebsite: string;
  mainGoal: string;
}

export interface CallScheduleData {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  topic: string;
}
