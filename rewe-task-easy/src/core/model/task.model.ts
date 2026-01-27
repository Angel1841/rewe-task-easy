export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'TO DO' | 'IN PROGRESS' | 'PR' | 'QA' | 'UAT' | 'DONE';
  assignedTo?: number; // userId
}
