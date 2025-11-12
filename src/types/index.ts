export type SentimentType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

export interface Message {
  message_id: number;
  content: string;
  timestamp: string;
  from_id: number;
  to_id: number;
  sentiment?: SentimentType;
  reasoning?: string;
}

export interface UserData {
  patient_id: string;
  total_messages: number;
  overall_sentiment: SentimentType;
  sentiment_reasoning: string;
  most_recent_matching_message: Message;
  messages: Message[];
  analysis_timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}