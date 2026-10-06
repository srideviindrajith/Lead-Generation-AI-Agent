export type SignalType =
  | 'visitor_detected'
  | 'high_intent_page'
  | 'pricing_interaction'
  | 'requirement_identified'
  | 'lead_captured';

export interface SignalEvent {
  id: string;
  type: SignalType;
  label: string;
  description: string;
  timestamp: string;
  page?: string;
  metadata?: Record<string, string>;
}

export interface QualificationQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    value: string;
    intentDelta: number;
    confidenceDelta: number;
    qualityImpact: 'up' | 'down' | 'neutral';
  }[];
}

export interface QualificationAnswer {
  questionId: number;
  question: string;
  answer: string;
  intentDelta: number;
  confidenceDelta: number;
}

export const SIGNAL_EVENTS: Omit<SignalEvent, 'id' | 'timestamp'>[] = [
  {
    type: 'visitor_detected',
    label: 'Visitor Detected',
    description: 'New anonymous signal entering detection grid',
    page: '/landing',
    metadata: { source: 'Organic Search', location: 'San Francisco, CA', device: 'Desktop' },
  },
  {
    type: 'high_intent_page',
    label: 'High-Intent Page Viewed',
    description: 'Visitor accessed deep-funnel service page',
    page: '/services/ai-agents',
    metadata: { timeOnPage: '2m 14s', scrollDepth: '87%', source: 'Direct' },
  },
  {
    type: 'pricing_interaction',
    label: 'Pricing Interaction',
    description: 'Visitor engaged with pricing matrix',
    page: '/pricing',
    metadata: { planViewed: 'Business', duration: '45s', source: 'Internal Nav' },
  },
  {
    type: 'requirement_identified',
    label: 'Requirement Identified',
    description: 'AI detected explicit business need from behavior',
    page: '/services/ai-agents',
    metadata: { category: 'Web Development', confidence: '78%', source: 'Pattern Match' },
  },
  {
    type: 'lead_captured',
    label: 'Lead Captured',
    description: 'Signal converted to structured lead profile',
    page: '/contact',
    metadata: { email: 'captured@signal.io', source: 'AI Qualification' },
  },
];

export const QUALIFICATION_QUESTIONS: QualificationQuestion[] = [
  {
    id: 1,
    question: 'What are you looking to build?',
    options: [
      { label: 'Website + AI Chatbot', value: 'website_chatbot', intentDelta: 15, confidenceDelta: 20, qualityImpact: 'up' },
      { label: 'AI Agent for Sales', value: 'sales_agent', intentDelta: 12, confidenceDelta: 15, qualityImpact: 'up' },
      { label: 'Just exploring', value: 'exploring', intentDelta: -5, confidenceDelta: 5, qualityImpact: 'down' },
    ],
  },
  {
    id: 2,
    question: 'What timeline are you working with?',
    options: [
      { label: 'Immediately (1-2 weeks)', value: 'immediate', intentDelta: 18, confidenceDelta: 15, qualityImpact: 'up' },
      { label: 'This quarter', value: 'quarter', intentDelta: 10, confidenceDelta: 10, qualityImpact: 'up' },
      { label: 'No fixed timeline', value: 'none', intentDelta: -3, confidenceDelta: 5, qualityImpact: 'neutral' },
    ],
  },
  {
    id: 3,
    question: 'Do you have an existing website or system?',
    options: [
      { label: 'No, starting fresh', value: 'fresh', intentDelta: 8, confidenceDelta: 12, qualityImpact: 'up' },
      { label: 'Yes, needs replacement', value: 'replace', intentDelta: 12, confidenceDelta: 10, qualityImpact: 'up' },
      { label: 'Yes, just adding AI', value: 'adding', intentDelta: 6, confidenceDelta: 8, qualityImpact: 'neutral' },
    ],
  },
  {
    id: 4,
    question: 'What budget range fits your project?',
    options: [
      { label: '$5k – $15k', value: 'mid', intentDelta: 10, confidenceDelta: 15, qualityImpact: 'up' },
      { label: '$15k – $50k', value: 'high', intentDelta: 15, confidenceDelta: 18, qualityImpact: 'up' },
      { label: 'Not sure yet', value: 'unsure', intentDelta: 0, confidenceDelta: -5, qualityImpact: 'neutral' },
    ],
  },
  {
    id: 5,
    question: 'How many users or customers do you serve?',
    options: [
      { label: '1,000+ active users', value: 'large', intentDelta: 12, confidenceDelta: 12, qualityImpact: 'up' },
      { label: '100 – 1,000 users', value: 'medium', intentDelta: 8, confidenceDelta: 10, qualityImpact: 'up' },
      { label: 'Just getting started', value: 'early', intentDelta: 5, confidenceDelta: 8, qualityImpact: 'neutral' },
    ],
  },
];

export const SIGNAL_TYPE_CONFIG: Record<SignalType, { color: 'cyan' | 'lime' | 'orange'; icon: string }> = {
  visitor_detected: { color: 'cyan', icon: 'radar' },
  high_intent_page: { color: 'cyan', icon: 'eye' },
  pricing_interaction: { color: 'lime', icon: 'dollar' },
  requirement_identified: { color: 'lime', icon: 'target' },
  lead_captured: { color: 'lime', icon: 'check' },
};

export const FINAL_LEAD = {
  score: 92,
  intent: 'High',
  requirement: 'Website + AI Agent',
  status: 'Sales Ready',
  name: 'Signal Alpha-7',
  email: 'alpha7@prospect.io',
  company: 'Nexus Dynamics',
  timeline: '1-2 weeks',
  budget: '$15k – $50k',
  source: 'Organic Search → AI Qualification',
  captured: '2026-10-04 14:22:07 UTC',
};
