import { Assignment } from '../types/assignment';

interface ProgressChartProps {
  assignments: Assignment[];
}

export default function ProgressChart({ assignments }: ProgressChartProps) {
  const getProgressData = () => {
    const courseProgress: Record<string, { total: number; completed: number }> = {};

    assignments.forEach((assignment) => {
      if (!courseProgress[assignment.course]) {
        courseProgress[assignment.course] = { total: 0, completed: 0 };
      }
      courseProgress[assignment.course].total++;
      if (assignment.status === 'completed') {
        courseProgress[assignment.course].completed++;
      }
    });

    return Object.entries(courseProgress)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([course, data]) => ({
        course,
        ...data,
        percentage: Math.round((data.completed / data.total) * 100),
      }));
  };

  const progressData = getProgressData();

  if (progressData.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Course Progress</h2>
      <div className="space-y-4">
        {progressData.map(({ course, total, completed, percentage }) => (
          <div key={course}>
            <div className="mb-1 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{course}</h3>
                <p className="text-sm text-gray-500">
                  {completed} of {total} completed
                </p>
              </div>
              <span
                className={`text-sm font-medium ${
                  percentage >= 75
                    ? 'text-green-600'
                    : percentage >= 50
                    ? 'text-yellow-600'
                    : percentage >= 25
                    ? 'text-orange-600'
                    : 'text-red-600'
                }`}
              >
                {percentage}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-bar-fill ${
                  percentage >= 75
                    ? 'progress-bar-fill-green'
                    : percentage >= 50
                    ? 'progress-bar-fill-yellow'
                    : percentage >= 25
                    ? 'progress-bar-fill-orange'
                    : 'progress-bar-fill-red'
                }`}
                style={{"--width": `${percentage}%`} as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 