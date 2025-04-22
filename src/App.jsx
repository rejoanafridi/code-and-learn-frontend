import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LoadingPage from './components/LoadingPage';
import { Sidebar } from './components/Sidebar';
import { EditorSection } from './sections/EditorSection';
import { TutorialSection } from './sections/TutorialSection';
import { Header } from './components/Header';
import TutorialUploadManager from './components/TutorialUploadManager';
import { getTutorials, getTutorial } from './lib/api';
import { useAuthContext } from './context/AuthContext';
import "./assets/AuthStyles.css"
import { useScreenSize } from './hooks/useScreen';
// Protected route component
const ProtectedRoute = () => {
  const { token, loading } = useAuthContext();

  if (loading) {
    return <LoadingPage />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Layout component for authenticated pages
const AppLayout = () => {
  const { user, token, logout } = useAuthContext();
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
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
  const size = useScreenSize()


  useEffect(() => {


    if (token) {
      fetchTutorials();
    } else {
      setLoading(false);
    }

    if (size === 'small') {
      setIsOpen(false)
    }
  }, [token, size]);

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

  const handleTutorialUploadSuccess = () => {
    // Refresh tutorials list after successful upload
    if (token) {
      setLoading(true);
      getTutorials(token)
        .then(data => setTutorials(data))
        .catch(error => console.error('Failed to refresh tutorials:', error))
        .finally(() => setLoading(false));
    }
  };



  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        key={loading}
        toggleSidebar={toggleSidebar}
        tutorials={tutorials}
        selectedTutorial={selectedTutorial}
        onSelectTutorial={handleSelectTutorial}
        loading={loading}
        isOpen={isOpen}

      />
      <div className="flex-1 flex flex-col">
        <Header isOpen={isOpen} user={user} onLogout={logout} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EditorSection
                    tutorial={selectedTutorial}
                    onTutorialComplete={handleTutorialComplete}
                    fetchTutorials={fetchTutorials}
                  />
                  <TutorialSection tutorial={selectedTutorial} />
                </div>
              }
            />
            <Route
              path="/upload"
              element={<TutorialUploadManager onSuccess={handleTutorialUploadSuccess} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  const { loading } = useAuthContext();

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="*" element={<AppLayout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;