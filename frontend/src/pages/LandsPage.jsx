import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLands } from '../api/lands';
import HeaderBar from '../components/HeaderBar';
import MapView from '../components/MapView';
import { useAuth } from '../context/AuthContext';

const LandsPage = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadLands = async () => {
      try {
        setLoading(true);
        const data = await getLands(token);
        setLands(data);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadLands();
  }, [token]);

  return (
    <main className="layout">
      <HeaderBar />
      <h1 style={{ marginTop: 0 }}>Lands</h1>
      <p style={{ color: '#44658c' }}>Click a land polygon to open its subdivided plots.</p>

      {loading && <p>Loading lands...</p>}
      {error && <p style={{ color: '#c83a3a' }}>{error}</p>}

      <section className="grid">
        {lands.map((land) => (
          <article key={land._id} className="card" style={{ padding: '1rem' }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <h2 style={{ margin: 0 }}>{land.name}</h2>
              <p style={{ margin: '0.4rem 0 0', color: '#4b6890' }}>{land.location}</p>
              <p style={{ margin: '0.3rem 0 0', color: '#4b6890' }}>Total area: {land.total_area} sq.ft</p>
            </div>
            <MapView
              coordinates={land.coordinates}
              onPolygonClick={() => navigate(`/lands/${land._id}/plots`)}
            />
          </article>
        ))}
      </section>
    </main>
  );
};

export default LandsPage;
