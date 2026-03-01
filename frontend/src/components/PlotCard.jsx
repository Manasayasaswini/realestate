import { Link } from 'react-router-dom';

const statusColor = (status) => (status === 'sold' ? '#c83a3a' : '#14873a');

const PlotCard = ({ plot }) => {
  return (
    <article className="card" style={{ padding: '1rem' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Plot {plot.plot_number}</h3>
      <p style={{ margin: 0, color: '#3a587c' }}>Area: {plot.area} sq.ft</p>
      <p style={{ marginTop: '0.35rem', marginBottom: '1rem', color: statusColor(plot.status) }}>
        Status: {plot.status}
      </p>
      <Link className="btn btn-primary" to={`/plots/${plot._id}/3d`}>
        View 3D
      </Link>
    </article>
  );
};

export default PlotCard;
