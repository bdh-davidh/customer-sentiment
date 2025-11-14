import { Injectable, signal } from '@angular/core';
import { Response } from './models';

@Injectable({
  providedIn: 'root',
})
export class Responses {
  data = signal<Response[]>([])
  // responses = [
  //   {
  //     patient_id: '64374',
  //     total_messages: 5,
  //     overall_sentiment: 'NEGATIVE',
  //     sentiment_reasoning:
  //       'The user expressed dissatisfaction with the Boots Online Doctor Skin Service, describing the advice as generic and unhelpful, the online consultation as lacking depth, and the treatment options as not tailored to their skin concerns. They also experienced delays in receiving their prescription and felt the consultation process was rushed, which led to a negative overall impression of the service.',
  //     most_recent_matching_message: {
  //       message_id: 10380,
  //       content:
  //         'I expected more detailed advice from the Boots Skin Service, but the responses felt generic and unhelpful.',
  //       timestamp: '2025-10-28T14:16:25',
  //       sentiment: 'NEGATIVE',
  //       reasoning:
  //         'The message expresses disappointment and dissatisfaction with the Boots Online Doctor service, indicating that the responses received were not personalized or useful enough.',
  //     },
  //     messages: [
  //       {
  //         message_id: 10380,
  //         content:
  //           'I expected more detailed advice from the Boots Skin Service, but the responses felt generic and unhelpful.',
  //         timestamp: '2025-10-28T14:16:25',
  //         from_id: 64374,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10379,
  //         content:
  //           'The online consultation lacked depth, and I didn’t feel my skin condition was properly assessed.',
  //         timestamp: '2025-10-28T14:16:15',
  //         from_id: 64374,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10378,
  //         content:
  //           'I experienced delays in receiving my prescription after using the skin service, which was frustrating.',
  //         timestamp: '2025-10-28T14:16:02',
  //         from_id: 64374,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10377,
  //         content:
  //           'The treatment options offered didn’t seem tailored to my skin concerns, and I didn’t feel confident in the recommendations.',
  //         timestamp: '2025-10-28T14:15:51',
  //         from_id: 64374,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10376,
  //         content:
  //           'I found the Boots Online Doctor Skin Service confusing to navigate, and the consultation process felt rushed.',
  //         timestamp: '2025-10-28T14:15:40',
  //         from_id: 64374,
  //         to_id: -1,
  //       },
  //     ],
  //     analysis_timestamp: '2025-11-06T09:18:49.393978+00:00',
  //   },
  //   {
  //     patient_id: '64373',
  //     total_messages: 6,
  //     overall_sentiment: 'NEUTRAL',
  //     sentiment_reasoning:
  //       'The message expresses a neutral sentiment towards the Boots Online Doctor Weight Loss Service, stating that the user is "OK with the service at the moment." This suggests a neutral or ambivalent attitude, without strong positive or negative feelings expressed.',
  //     most_recent_matching_message: {
  //       message_id: 10370,
  //       content:
  //         'Hi, \n\nI am using Weight Loss service from Boots Online Doctor.\n\nI am OK with the service at the moment.\n\n\n\nThank you,\n\nGulab',
  //       timestamp: '2025-10-28T14:09:08',
  //       sentiment: 'NEUTRAL',
  //       reasoning:
  //         'The message expresses a neutral sentiment towards the Boots Online Doctor\'s Weight Loss service. The user states that they are "OK with the service at the moment," indicating a neutral or indifferent attitude rather than a strong positive or negative sentiment.',
  //     },
  //     messages: [
  //       {
  //         message_id: 10375,
  //         content:
  //           'The online consultation offered by Boots was helpful in outlining potential weight loss solutions, but I’m taking time to review my choices.',
  //         timestamp: '2025-10-28T14:11:13',
  //         from_id: 64373,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10374,
  //         content:
  //           'Booking a consultation through the Boots Online Doctor Weight Loss Service was simple. I appreciated the convenience of accessing it from home.',
  //         timestamp: '2025-10-28T14:10:57',
  //         from_id: 64373,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10373,
  //         content:
  //           'I found the Boots Online Doctor platform to be functional and informative, though I’m still considering whether to proceed with the recommended treatment.',
  //         timestamp: '2025-10-28T14:10:44',
  //         from_id: 64373,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10372,
  //         content:
  //           'The service provided clear information about weight loss treatments, and I was able to complete the consultation online without any issues.',
  //         timestamp: '2025-10-28T14:10:34',
  //         from_id: 64373,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10371,
  //         content:
  //           'Hi\n\nI used the Boots Online Doctor Weight Loss Service to explore available treatment options. The process was straightforward and easy to follow.',
  //         timestamp: '2025-10-28T14:10:21',
  //         from_id: 64373,
  //         to_id: -1,
  //       },
  //       {
  //         message_id: 10370,
  //         content:
  //           'Hi, \n\nI am using Weight Loss service from Boots Online Doctor.\n\nI am OK with the service at the moment.\n\n\n\nThank you,\n\nGulab',
  //         timestamp: '2025-10-28T14:09:08',
  //         from_id: 64373,
  //         to_id: -1,
  //       },
  //     ],
  //     analysis_timestamp: '2025-11-06T09:19:39.311585+00:00',
  //   },
  // ];
}
