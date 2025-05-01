import { Assignment } from '../types/assignment';
import { getWeeklySchedule } from '../lib/dates';

interface WeeklyCalendarProps {
  assignments: Assignment[];
}

export default function WeeklyCalendar({ assignments }: WeeklyCalendarProps) {
  const weeklySchedule = getWeeklySchedule(assignments);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Weekly Schedule</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        {days.map((day) => (
          <div
            key={day}
            className="rounded-lg border border-gray-200 bg-gray-50 p-4"
          >
            <h3 className="mb-3 text-sm font-medium text-gray-900">{day}</h3>
            <div className="space-y-2">
              {weeklySchedule[day].length === 0 ? (
                <p className="text-sm text-gray-500">No assignments due</p>
              ) : (
                weeklySchedule[day].map((assignment) => (
                  <div
                    key={assignment.id}
                    className="rounded-md border border-gray-200 bg-white p-3 shadow-sm"
                  >
                    <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">{assignment.course}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          assignment.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : assignment.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(assignment.dueDate).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 