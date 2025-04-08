import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthForm } from './components/AuthForm';
import { Sidebar } from './components/Sidebar';
import { EditorSection } from './sections/EditorSection';
import { TutorialSection } from './sections/TutorialSection';
import { Header } from './components/Header';
import { getTutorials, getTutorial } from './lib/api';
import { Toaster } from 'react-hot-toast';

function App() {
  const { user, token, logout, isAuthenticated } = useAuth();
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const data = await getTutorials(token);
        setTutorials(data);
      } catch (error) {
        console.error('Failed to fetch tutorials:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchTutorials();
    }
  }, [token, isAuthenticated]);

  const handleSelectTutorial = async (id) => {
    try {
      const tutorial = await getTutorial(id);
      setSelectedTutorial(tutorial);
    } catch (error) {
      console.error('Failed to fetch tutorial:', error);
    }
  };

  const handleTutorialComplete = (tutorialId) => {
    setTutorials(prevTutorials =>
      prevTutorials.map(tutorial =>
        tutorial._id === tutorialId
          ? { ...tutorial, completed: true }
          : tutorial
      )
    );
  };

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        tutorials={tutorials}
        selectedTutorial={selectedTutorial}
        onSelectTutorial={handleSelectTutorial}
        loading={loading}
      />
      <div className="flex-1 flex flex-col">
        <Header user={user} onLogout={logout} />
        <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditorSection
            tutorial={selectedTutorial}
            onTutorialComplete={handleTutorialComplete}
          />
          <TutorialSection tutorial={selectedTutorial} />
        </main>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;