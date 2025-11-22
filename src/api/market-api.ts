import { HttpClient } from '../client/http-client';
import {
  CandlesticksRequest,
  CandlesticksResponse,
  FundingsRequest,
  FundingsResponse,
  FundingRatesRequest,
  FundingRatesResponse,
  FastBridgeInfoRequest,
  FastBridgeInfoResponse,
} from '../types';

export class MarketApi {
  private readonly basePath = '/api/v1';

  constructor(private client: HttpClient) {}

  async getCandlesticks(params: CandlesticksRequest): Promise<CandlesticksResponse> {
    const { interval, start_time, end_time, limit, ...rest } = params;
    return this.client.get<CandlesticksResponse>(`${this.basePath}/candlesticks`, {
      params: {
        ...rest,
        // Map interval to resolution for API compatibility
        resolution: interval,
        // Map start_time/end_time to start_timestamp/end_timestamp
        ...(start_time && { start_timestamp: start_time }),
        ...(end_time && { end_timestamp: end_time }),
        // Map limit to count_back
        ...(limit && { count_back: limit }),
      },
    });
  }

  async getFundings(params: FundingsRequest): Promise<FundingsResponse> {
    return this.client.get<FundingsResponse>(`${this.basePath}/fundings`, {
      params,
    });
  }

  async getFundingRates(params?: FundingRatesRequest): Promise<FundingRatesResponse> {
    return this.client.get<FundingRatesResponse>(`${this.basePath}/funding-rates`, {
      params,
    });
  }

  async getFastBridgeInfo(
    params?: FastBridgeInfoRequest
  ): Promise<FastBridgeInfoResponse> {
    return this.client.get<FastBridgeInfoResponse>(`${this.basePath}/fastbridge_info`, {
      params,
    });
  }
}
