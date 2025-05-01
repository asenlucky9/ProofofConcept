import { Assignment } from '../types/assignment';

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleString();
}

export function getDaysUntilDue(dueDate: string): number {
  const now = new Date();
  const due = new Date(dueDate);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getUpcomingDeadlines(assignments: Assignment[], days: number = 7): Assignment[] {
  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  
  return assignments
    .filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      return dueDate > now && dueDate <= futureDate && assignment.status !== 'completed';
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

export function getOverdueAssignments(assignments: Assignment[]): Assignment[] {
  const now = new Date();
  
  return assignments
    .filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      return dueDate < now && assignment.status !== 'completed';
    })
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
}

export function formatDueDate(dueDate: string): string {
  const days = getDaysUntilDue(dueDate);
  
  if (days < 0) {
    const overdueDays = Math.abs(days);
    return `Overdue by ${overdueDays} ${overdueDays === 1 ? 'day' : 'days'}`;
  }
  
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  if (days < 7) return `Due in ${days} days`;
  
  return formatDate(dueDate);
}

export function getWeeklySchedule(assignments: Assignment[]): Record<string, Assignment[]> {
  const schedule: Record<string, Assignment[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  assignments.forEach(assignment => {
    const dueDate = new Date(assignment.dueDate);
    const dayName = days[dueDate.getDay()];
    schedule[dayName].push(assignment);
  });

  return schedule;
}

export function generateReminderMessage(assignment: Assignment): string {
  const days = getDaysUntilDue(assignment.dueDate);
  const dueDate = new Date(assignment.dueDate);
  
  if (days < 0) {
    return `⚠️ "${assignment.title}" for ${assignment.course} is overdue! It was due on ${formatDate(dueDate)}.`;
  }
  
  if (days === 0) {
    return `🚨 "${assignment.title}" for ${assignment.course} is due today!`;
  }
  
  if (days === 1) {
    return `⏰ "${assignment.title}" for ${assignment.course} is due tomorrow!`;
  }
  
  if (days <= 3) {
    return `📅 "${assignment.title}" for ${assignment.course} is due in ${days} days.`;
  }
  
  return `📌 "${assignment.title}" for ${assignment.course} is due on ${formatDate(dueDate)}.`;
} 