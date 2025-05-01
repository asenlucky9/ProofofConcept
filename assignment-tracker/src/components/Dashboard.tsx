import { Assignment } from '../types/assignment';

interface DashboardProps {
  assignments: Assignment[];
}

export default function Dashboard({ assignments }: DashboardProps) {
  const getStatistics = () => {
    const total = assignments.length;
    const completed = assignments.filter((a) => a.status === 'completed').length;
    const inProgress = assignments.filter((a) => a.status === 'in_progress').length;
    const notStarted = assignments.filter((a) => a.status === 'not_started').length;
    const overdue = assignments.filter(
      (a) => new Date(a.dueDate) < new Date() && a.status !== 'completed'
    ).length;
    const highPriority = assignments.filter((a) => a.priority === 'high').length;

    return {
      total,
      completed,
      inProgress,
      notStarted,
      overdue,
      highPriority,
      completionRate: total ? Math.round((completed / total) * 100) : 0,
    };
  };

  const stats = getStatistics();

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center">
          <div className="rounded-full bg-blue-100 p-3">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Total Assignments</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Completion Rate</span>
            <span className="font-medium text-green-600">{stats.completionRate}%</span>
          </div>
          <div className="progress-bar">
            <div
              className={`progress-bar-fill progress-bar-fill-green`}
              style={{"--width": `${stats.completionRate}%`} as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center">
          <div className="rounded-full bg-yellow-100 p-3">
            <svg
              className="h-6 w-6 text-yellow-600"
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
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Status Breakdown</h3>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-green-600">{stats.completed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">In Progress</span>
                <span className="font-medium text-blue-600">{stats.inProgress}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Not Started</span>
                <span className="font-medium text-gray-600">{stats.notStarted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center">
          <div className="rounded-full bg-red-100 p-3">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Attention Required</h3>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Overdue</span>
                <span className="font-medium text-red-600">{stats.overdue}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">High Priority</span>
                <span className="font-medium text-orange-600">{stats.highPriority}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 