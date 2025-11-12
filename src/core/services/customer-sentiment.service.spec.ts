import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerSentimentService } from './customer-sentiment.service';
import { UserData } from '../../types';

describe('CustomerSentimentService', () => {
  let service: CustomerSentimentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerSentimentService]
    });
    service = TestBed.inject(CustomerSentimentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make POST request with correct patient_id', () => {
    const patientId = '12345';
    const mockResponse: UserData = {
      patient_id: patientId,
      total_messages: 1,
      overall_sentiment: 'POSITIVE',
      sentiment_reasoning: 'Test',
      most_recent_matching_message: {
        message_id: 1,
        content: 'Test',
        timestamp: '2025-01-01T00:00:00Z',
        from_id: 12345,
        to_id: -1
      },
      messages: [],
      analysis_timestamp: '2025-01-01T00:00:00Z'
    };

    service.getPatientData(patientId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://dev-sapi.lemonaidpims.co.uk/sentiment/analyse');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ patient_id: patientId });
    req.flush(mockResponse);
  });
});