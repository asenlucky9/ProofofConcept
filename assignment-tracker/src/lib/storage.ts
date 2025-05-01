import { Assignment } from '../types/assignment';

const STORAGE_KEY = 'assignments';

export function saveAssignments(assignments: Assignment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

export function loadAssignments(): Assignment[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
} 