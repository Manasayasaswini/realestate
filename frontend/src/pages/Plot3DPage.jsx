import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlot3DByPlotId, getPlotById } from '../api/lands';
import HeaderBar from '../components/HeaderBar';
import ThreeViewer from '../components/ThreeViewer';
import { useAuth } from '../context/AuthContext';

const Plot3DPage = () => {
  const { plotId } = useParams();
  const { token } = useAuth();

  const [plot, setPlot] = useState(null);
  const [plot3d, setPlot3d] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [plotData, plot3dData] = await Promise.all([
          getPlotById(token, plotId),
          getPlot3DByPlotId(token, plotId)
        ]);

        setPlot(plotData);
        setPlot3d(plot3dData);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [plotId, token]);

  return (
    <main className="layout">
      <HeaderBar />
      <Link to={`/lands/${plot?.land_id || ''}/plots`} className="btn btn-secondary" style={{ display: 'inline-block', marginBottom: '1rem' }}>
        Back to plots
      </Link>

      {loading && <p>Loading 3D details...</p>}
      {error && <p style={{ color: '#c83a3a' }}>{error}</p>}

      {plot && plot3d && (
        <>
          <section className="card" style={{ padding: '1rem', marginBottom: '1rem' }}>
            <h1 style={{ marginTop: 0 }}>Plot {plot.plot_number} - 3D View</h1>
            <p style={{ color: '#4b6890' }}>Area: {plot.area} sq.ft | Status: {plot.status}</p>
            <p style={{ color: '#4b6890', marginBottom: 0 }}>
              Dimensions (W x L x H): {plot3d.dimensions.width} x {plot3d.dimensions.length} x {plot3d.dimensions.height}
            </p>
          </section>
          <ThreeViewer dimensions={plot3d.dimensions} />
        </>
      )}
    </main>
  );
};

export default Plot3DPage;
