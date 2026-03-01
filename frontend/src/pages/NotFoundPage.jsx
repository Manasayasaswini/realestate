import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="layout" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <section className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ marginTop: 0 }}>404</h1>
        <p>Page not found.</p>
        <Link className="btn btn-primary" to="/lands">
          Go to lands
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
