/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios";
import { convertQueryParam } from "@/lib/utils/index";

class QuoteService {


  // API WORKER
    async getQuotesByReQuest({requestId, pageSize, pageNumber, filter }: {requestId:string, pageSize: number; pageNumber: number; filter?: any }) {
    const queryParams = convertQueryParam(filter || {});
    return api.get(
      `${import.meta.env.VITE_API_BASE_URL}job-match/worker/${requestId}?pageSize=${pageSize}&pageNumber=${pageNumber}&${queryParams}`
    );
  }
}

export const quoteService = new QuoteService();
