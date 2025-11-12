import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Response } from './response';
import { UserData } from '../../types';

describe('Response', () => {
  let component: Response;
  let fixture: ComponentFixture<Response>;

  const mockUserData: UserData = {
    patient_id: '12345',
    total_messages: 2,
    overall_sentiment: 'POSITIVE',
    sentiment_reasoning: 'Test reasoning',
    most_recent_matching_message: {
      message_id: 1,
      content: 'Test message',
      timestamp: '2025-01-01T00:00:00Z',
      from_id: 12345,
      to_id: -1
    },
    messages: [
      {
        message_id: 1,
        content: 'Test message',
        timestamp: '2025-01-01T00:00:00Z',
        from_id: 12345,
        to_id: -1
      }
    ],
    analysis_timestamp: '2025-01-01T00:00:00Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Response]
    }).compileComponents();

    fixture = TestBed.createComponent(Response);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('userData', mockUserData);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should track messages by message_id', () => {
    const message = mockUserData.messages[0];
    const result = component.trackByMessageId(0, message);
    expect(result).toBe(message.message_id);
  });
});