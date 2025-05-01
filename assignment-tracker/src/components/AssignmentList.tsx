import { Assignment, Priority, Status } from '../types/assignment';
import { useToast } from '../components/ui/use-toast';

interface AssignmentListProps {
  assignments: Assignment[];
  onDelete: (id: string) => void;
  onEdit: (assignment: Assignment) => void;
  getDueDateStatus: (dueDate: string) => 'overdue' | 'urgent' | 'soon' | 'normal';
  isLoading?: boolean;
}

export default function AssignmentList({ 
  assignments, 
  onDelete, 
  onEdit, 
  getDueDateStatus,
  isLoading = false 
}: AssignmentListProps) {
  const { toast } = useToast();

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'not_started':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDueDateColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'urgent':
        return 'bg-orange-100 text-orange-800';
      case 'soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="w-3/4">
                <div className="mb-2 h-5 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 w-16 rounded bg-gray-200"></div>
                <div className="h-8 w-16 rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="h-4 w-1/3 rounded bg-gray-200"></div>
              <div className="h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <div className="mb-4 rounded-full bg-gray-100 p-3">
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900">No assignments found</h3>
        <p className="text-sm text-gray-500">
          Get started by adding your first assignment using the "Add Assignment" button above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((assignment) => {
          const dueDateStatus = getDueDateStatus(assignment.dueDate);
          return (
            <div
              key={assignment.id}
              className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                  <p className="text-sm text-gray-500">{assignment.course}</p>
                </div>
                <div className="flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => onEdit(assignment)}
                    className="rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(assignment.id);
                      toast({
                        title: 'Success',
                        description: 'Assignment deleted successfully',
                      });
                    }}
                    className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Due Date:</span>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getDueDateColor(dueDateStatus)}`}>
                    {formatDate(assignment.dueDate)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Priority:</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(
                      assignment.priority
                    )}`}
                  >
                    {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                      assignment.status
                    )}`}
                  >
                    {assignment.status
                      .split('_')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </span>
                </div>

                {assignment.description && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Description:</span>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{assignment.description}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 