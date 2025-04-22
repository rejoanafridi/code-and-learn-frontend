import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';
import { ArrowRightLeft } from "lucide-react"
import { useTranslation } from 'react-i18next';

export function Sidebar({ tutorials, selectedTutorial, onSelectTutorial, loading, toggleSidebar, isOpen }) {
  const { user } = useAuth();
  const { t } = useTranslation();

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
    <div className='relative '>

      <div className={` inset-y-0 left-0 z-30 w-0 ${isOpen ? "w-64 fixed md:relative " : "w-0"} md:w-64 bg-white  border-r overflow-y-auto transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">{t('sidebar.title')}</h2>
          <nav className="space-y-1">
            {tutorials.map((tutorial) => {
              const isCompleted = user?.completedTutorials?.some(
                (t) => t === tutorial._id
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

      {isOpen && <button onClick={toggleSidebar} className="md:hidden">
        <ArrowRightLeft className='cursor-pointer fixed top-4 left-48 right-4 z-50' />
      </button>}
    </div>
  );
}