import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AssignmentList from './components/AssignmentList';
import AssignmentForm from './components/AssignmentForm';
import { Toaster } from './components/ui/toaster';
import { Assignment, AssignmentFormData, Priority, Status } from './types/assignment';
import { saveAssignments, loadAssignments } from './lib/storage';
import { useToast } from './components/ui/use-toast';
import Dashboard from './components/Dashboard';
import Reminders from './components/Reminders';
import Login from './components/Login';

type SortOption = 'dueDate' | 'priority' | 'status';
type FilterOption = {
  course?: string;
  priority?: Priority;
  status?: Status;
};

function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('dueDate');
  const [filters, setFilters] = useState<FilterOption>({});
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const loadedAssignments = loadAssignments();
        setAssignments(loadedAssignments);
      } catch (err) {
        console.error('Failed to load assignments:', err);
        toast({
          title: 'Error',
          description: 'Failed to load assignments'
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    try {
      saveAssignments(assignments);
    } catch (err) {
      console.error('Failed to save assignments:', err);
      toast({
        title: 'Error',
        description: 'Failed to save assignments'
      });
    }
  }, [assignments]);

  const handleAddAssignment = (data: AssignmentFormData) => {
    const newAssignment: Assignment = {
      ...data,
      id: Date.now().toString(),
    };
    setAssignments([...assignments, newAssignment]);
    setEditingAssignment(null);
    toast({
      title: 'Success',
      description: 'Assignment added successfully',
    });
  };

  const handleEditAssignment = (data: AssignmentFormData) => {
    if (!editingAssignment) return;
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === editingAssignment.id
        ? { ...assignment, ...data }
        : assignment
    );
    setAssignments(updatedAssignments);
    setEditingAssignment(null);
    toast({
      title: 'Success',
      description: 'Assignment updated successfully',
    });
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
  };

  const getDueDateStatus = (dueDate: string): 'overdue' | 'urgent' | 'soon' | 'normal' => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffInDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) return 'overdue';
    if (diffInDays <= 1) return 'urgent';
    if (diffInDays <= 3) return 'soon';
    return 'normal';
  };

  const filteredAssignments = assignments
    .filter((assignment) => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assignment.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return assignment[key as keyof FilterOption] === value;
      });

      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === 'status') {
        const statusOrder = { completed: 0, in_progress: 1, not_started: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

  const uniqueCourses = Array.from(new Set(assignments.map((a) => a.course)));

  if (!isAuthenticated) {
    return <Login onLogin={() => {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    }} />;
  }

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Assignment Tracker</h1>
              <p className="mt-1 text-sm text-gray-500">
                Software Development and Mobile/Desktop Web Application Course - Manage your assignments, deadlines, and progress all in one place.
              </p>
            </div>
            <button
              onClick={() => setEditingAssignment({} as Assignment)}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Assignment
            </button>
          </div>

          <Dashboard assignments={assignments} />
          <Reminders assignments={assignments} />

          <div className="mb-6 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <svg
                  className={`-ml-1 mr-2 h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {showFilters && (
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select
                      value={filters.course || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, course: e.target.value || undefined }))}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      aria-label="Filter assignments by course"
                    >
                      <option value="">All Courses</option>
                      {uniqueCourses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      value={filters.priority || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value as Priority || undefined }))}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      aria-label="Filter assignments by priority level"
                    >
                      <option value="">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={filters.status || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value as Status || undefined }))}
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      aria-label="Filter assignments by completion status"
                    >
                      <option value="">All Statuses</option>
                      <option value="completed">Completed</option>
                      <option value="in_progress">In Progress</option>
                      <option value="not_started">Not Started</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                aria-label="Sort assignments by"
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {editingAssignment && (
            <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {editingAssignment.id ? 'Edit Assignment' : 'Add New Assignment'}
              </h2>
              <AssignmentForm
                onSubmit={editingAssignment.id ? handleEditAssignment : handleAddAssignment}
                initialData={editingAssignment.id ? editingAssignment : undefined}
              />
            </div>
          )}

          <AssignmentList
            assignments={filteredAssignments}
            onDelete={handleDeleteAssignment}
            onEdit={handleEdit}
            getDueDateStatus={getDueDateStatus}
            isLoading={isLoading}
          />
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
