import api from "@/config/axios";
import { convertQueryParam } from "@/lib/utils/index";

class JobServiceService {
  async getAll({ pageSize, pageNumber, filter }: { pageSize: number; pageNumber: number; filter?: any }) {
    const queryParams = convertQueryParam(filter || {});
    return api.get(
      `${import.meta.env.VITE_API_BASE_URL}job-services?pageSize=${pageSize}&pageNumber=${pageNumber}&${queryParams}`
    );
  }

  async getById(id: string) {
    return api.get(`${import.meta.env.VITE_API_BASE_URL}document-type/${id}`);
  }

  async create(data: any) {
    return api.post(`${import.meta.env.VITE_API_BASE_URL}document-type`, data);
  }

  async update(id: string, data: any) {
    return api.put(`${import.meta.env.VITE_API_BASE_URL}document-type/${id}`, data);
  }

  async delete(id: string) {
    return api.delete(`${import.meta.env.VITE_API_BASE_URL}document-type/${id}`);
  }
}

export const jobServiceService = new JobServiceService();
