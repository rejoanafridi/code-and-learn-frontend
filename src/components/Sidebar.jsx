import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export function Sidebar({ tutorials, selectedTutorial, onSelectTutorial, loading }) {
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="w-64 bg-white border-r p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Tutorials</h2>
        <nav className="space-y-1">
          {tutorials.map((tutorial) => {
            const isCompleted = user?.completedTutorials?.some(
              (t) => t._id === tutorial._id
            );
            const isSelected = selectedTutorial?._id === tutorial._id;

            return (
              <button
                key={tutorial._id}
                onClick={() => onSelectTutorial(tutorial._id)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md transition-colors',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-gray-100',
                  isCompleted && 'text-green-600'
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{tutorial.title}</span>
                  {isCompleted && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}