
export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
}

export interface PainPoint {
  question: string;
  solution: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
