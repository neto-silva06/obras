import api from './api.js';
import type { WorkDiary, LaborEntry, MaterialUsage, WorkDiaryService } from './work-diary.service.js';

const WorkDiaryServiceImplementation: WorkDiaryService = {
  async getDiary(workId, date) {
    const { data } = await api.get<WorkDiary>('/work-diaries', { params: { workId, date } });
    return data;
  },
  async addLabor(workDiaryId, employeeId) {
    const { data } = await api.post<LaborEntry>('/work-diaries/labor', { workDiaryId, employeeId });
    return data;
  },
  async removeLabor(id) {
    await api.delete(`/work-diaries/labor/${id}`);
  },
  async addMaterial(usage) {
    const { data } = await api.post<MaterialUsage>('/work-diaries/material', usage);
    return data;
  },
  async removeMaterial(id) {
    await api.delete(`/work-diaries/material/${id}`);
  },
  async getReport(workId, startDate, endDate) {
    const { data } = await api.get<WorkDiary[]>('/work-diaries/report', { params: { workId, startDate, endDate } });
    return data;
  }
};

export default WorkDiaryServiceImplementation;
