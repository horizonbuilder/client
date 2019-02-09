export type JobStatus = 'in-progress' | 'in-review' | 'prospective' | 'completed' | 'revised';

export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  created_at: number;
  client_name: string;
}

export interface JobInput {
  name: string;
  client_name: string;
}
