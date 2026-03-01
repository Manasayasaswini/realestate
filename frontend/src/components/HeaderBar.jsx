import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HeaderBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="card" style={{ padding: '0.75rem 1rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <Link to="/lands" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
          Real Estate Visualizer
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.9rem' }}>{user?.email || 'Guest'}</span>
          <button className="btn btn-secondary" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
