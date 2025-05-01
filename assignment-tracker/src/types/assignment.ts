export type Priority = 'low' | 'medium' | 'high';
export type Status = 'not_started' | 'in_progress' | 'completed';

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  description?: string;
}

export interface AssignmentFormData {
  title: string;
  course: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  description?: string;
} 