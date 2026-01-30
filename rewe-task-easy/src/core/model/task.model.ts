export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'TO DO' | 'IN PROGRESS' | 'DONE';
  assignedUserId?: number;
}
