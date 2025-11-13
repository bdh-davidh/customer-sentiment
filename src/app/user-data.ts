import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  returnedData = [
    {
      patient_id: '64374',
      total_messages: 5,
      overall_sentiment: 'NEGATIVE',
      sentiment_reasoning:
        'The user expressed dissatisfaction with the Boots Online Doctor Skin Service, describing the advice as generic and unhelpful, the online consultation as lacking depth, and the treatment options as not tailored to their skin concerns. They also experienced delays in receiving their prescription and felt the consultation process was rushed, which led to a negative overall impression of the service.',
      most_recent_matching_message: {
        message_id: 10380,
        content:
          'I expected more detailed advice from the Boots Skin Service, but the responses felt generic and unhelpful.',
        timestamp: '2025-10-28T14:16:25',
        sentiment: 'NEGATIVE',
        reasoning:
          'The message expresses disappointment and dissatisfaction with the Boots Online Doctor service, indicating that the responses received were not personalized or useful enough.',
      },
      messages: [
        {
          message_id: 10380,
          content:
            'I expected more detailed advice from the Boots Skin Service, but the responses felt generic and unhelpful.',
          timestamp: '2025-10-28T14:16:25',
          from_id: 64374,
          to_id: -1,
        },
        {
          message_id: 10379,
          content:
            'The online consultation lacked depth, and I didn’t feel my skin condition was properly assessed.',
          timestamp: '2025-10-28T14:16:15',
          from_id: 64374,
          to_id: -1,
        },
        {
          message_id: 10378,
          content:
            'I experienced delays in receiving my prescription after using the skin service, which was frustrating.',
          timestamp: '2025-10-28T14:16:02',
          from_id: -1,
          to_id: 64374,
        },
        {
          message_id: 10377,
          content:
            'The treatment options offered didn’t seem tailored to my skin concerns, and I didn’t feel confident in the recommendations.',
          timestamp: '2025-10-28T14:15:51',
          from_id: 64374,
          to_id: -1,
        },
        {
          message_id: 10376,
          content:
            'I found the Boots Online Doctor Skin Service confusing to navigate, and the consultation process felt rushed.',
          timestamp: '2025-10-28T14:15:40',
          from_id: 64374,
          to_id: -1,
        },
      ],
      analysis_timestamp: '2025-11-06T09:18:49.393978+00:00',
    },

  ];
}
