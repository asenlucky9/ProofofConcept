import { Assignment } from '../types/assignment';
import { getUpcomingDeadlines, getOverdueAssignments, formatDueDate, generateReminderMessage } from '../lib/dates';

interface RemindersProps {
  assignments: Assignment[];
}

export default function Reminders({ assignments }: RemindersProps) {
  const upcomingDeadlines = getUpcomingDeadlines(assignments, 7);
  const overdueAssignments = getOverdueAssignments(assignments);

  if (upcomingDeadlines.length === 0 && overdueAssignments.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Reminders</h2>
      
      {overdueAssignments.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium text-red-600">Overdue Assignments</h3>
          <div className="space-y-3">
            {overdueAssignments.map((assignment) => (
              <div
                key={assignment.id}
                className="flex items-start rounded-lg border border-red-100 bg-red-50 p-4"
              >
                <div className="mr-3 flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-800">{assignment.title}</h4>
                  <p className="mt-1 text-sm text-red-600">
                    {generateReminderMessage(assignment)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {upcomingDeadlines.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-medium text-gray-900">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {upcomingDeadlines.map((assignment) => {
              const daysUntilDue = formatDueDate(assignment.dueDate);
              const isUrgent = daysUntilDue.includes('today') || daysUntilDue.includes('tomorrow');

              return (
                <div
                  key={assignment.id}
                  className={`flex items-start rounded-lg border p-4 ${
                    isUrgent
                      ? 'border-yellow-100 bg-yellow-50'
                      : 'border-blue-100 bg-blue-50'
                  }`}
                >
                  <div className="mr-3 flex-shrink-0">
                    <svg
                      className={`h-5 w-5 ${isUrgent ? 'text-yellow-400' : 'text-blue-400'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-medium ${
                        isUrgent ? 'text-yellow-800' : 'text-blue-800'
                      }`}
                    >
                      {assignment.title}
                    </h4>
                    <p
                      className={`mt-1 text-sm ${
                        isUrgent ? 'text-yellow-600' : 'text-blue-600'
                      }`}
                    >
                      {generateReminderMessage(assignment)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
} 