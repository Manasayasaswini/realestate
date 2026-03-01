import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import LandsPage from './pages/LandsPage';
import PlotsPage from './pages/PlotsPage';
import Plot3DPage from './pages/Plot3DPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/lands"
        element={
          <ProtectedRoute>
            <LandsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/lands/:landId/plots"
        element={
          <ProtectedRoute>
            <PlotsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/plots/:plotId/3d"
        element={
          <ProtectedRoute>
            <Plot3DPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/lands" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
