export interface Message {
  message_id: number;
  content: string;
  timestamp: string;
  from_id: number;
  to_id: number;
}

export interface Response {
  patient_id: string;
  total_messages: number;
  overall_sentiment: string;
  sentiment_reasoning: string;
  most_recent_matching_message: {
    message_id: number;
    content: string;
    timestamp: string;
    sentiment: string;
    reasoning: string;
  };
  messages: Message[];
  analysis_timestamp: string;
}
