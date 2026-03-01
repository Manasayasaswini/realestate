import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getLandById, getPlotsByLandId } from '../api/lands';
import HeaderBar from '../components/HeaderBar';
import MapView from '../components/MapView';
import PlotCard from '../components/PlotCard';
import { useAuth } from '../context/AuthContext';

const PlotsPage = () => {
  const { landId } = useParams();
  const { token } = useAuth();

  const [land, setLand] = useState(null);
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [landData, plotsData] = await Promise.all([
          getLandById(token, landId),
          getPlotsByLandId(token, landId)
        ]);

        setLand(landData);
        setPlots(plotsData);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [landId, token]);

  return (
    <main className="layout">
      <HeaderBar />
      <Link to="/lands" className="btn btn-secondary" style={{ display: 'inline-block', marginBottom: '1rem' }}>
        Back to lands
      </Link>

      {loading && <p>Loading plots...</p>}
      {error && <p style={{ color: '#c83a3a' }}>{error}</p>}

      {land && (
        <section className="card" style={{ padding: '1rem', marginBottom: '1rem' }}>
          <h1 style={{ marginTop: 0 }}>{land.name}</h1>
          <p style={{ color: '#4b6890' }}>{land.location}</p>
          <MapView coordinates={land.coordinates} color="#2d9d78" />
        </section>
      )}

      <section className="grid grid-2">
        {plots.map((plot) => (
          <PlotCard key={plot._id} plot={plot} />
        ))}
      </section>
    </main>
  );
};

export default PlotsPage;
