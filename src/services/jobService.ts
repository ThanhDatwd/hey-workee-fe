/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios";
import { convertQueryParam } from "@/lib/utils/index";

class JobService {
  async getAllJobRequest({ pageSize, pageNumber, filter }: { pageSize: number; pageNumber: number; filter?: any }) {
    const queryParams = convertQueryParam(filter || {});
    return api.get(
      `${import.meta.env.VITE_API_BASE_URL}job-request?pageSize=${pageSize}&pageNumber=${pageNumber}&${queryParams}`
    );
  }


  async getById(id: string) {
    return api.get(`${import.meta.env.VITE_API_BASE_URL}document-type/${id}`);
  }

  async createJobRequest(data: any) {
    return api.post(`${import.meta.env.VITE_API_BASE_URL}job-request`, data);
  }

  async update(id: string, data: any) {
    return api.put(`${import.meta.env.VITE_API_BASE_URL}document-type/${id}`, data);
  }

  async delete(id: string) {
    return api.delete(`${import.meta.env.VITE_API_BASE_URL}document-type/${id}`);
  }


  // API WORKER

    async getJobMatchesByWorker({workerId, pageSize, pageNumber, filter }: {workerId:string, pageSize: number; pageNumber: number; filter?: any }) {
    const queryParams = convertQueryParam(filter || {});
    return api.get(
      `${import.meta.env.VITE_API_BASE_URL}job-match/worker/${workerId}?pageSize=${pageSize}&pageNumber=${pageNumber}&${queryParams}`
    );
  }
}

export const jobService = new JobService();
