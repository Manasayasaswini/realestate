import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/lands';

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = isRegisterMode
        ? await registerUser(form)
        : await loginUser({ email: form.email, password: form.password });

      login(payload);
      navigate(from, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="layout" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <section className="card" style={{ width: '100%', maxWidth: '420px', padding: '1.25rem' }}>
        <h1 style={{ marginTop: 0 }}>{isRegisterMode ? 'Create account' : 'Login'}</h1>
        <p style={{ color: '#49688f' }}>Access lands, plots, and 3D visualization.</p>

        <form onSubmit={onSubmit} className="grid" style={{ marginTop: '1rem' }}>
          {isRegisterMode && (
            <label>
              Name
              <input className="input" name="name" onChange={onChange} required value={form.name} />
            </label>
          )}

          <label>
            Email
            <input
              className="input"
              name="email"
              type="email"
              onChange={onChange}
              required
              value={form.email}
            />
          </label>

          <label>
            Password
            <input
              className="input"
              name="password"
              type="password"
              onChange={onChange}
              required
              value={form.password}
            />
          </label>

          {error && <p style={{ color: '#c83a3a', margin: 0 }}>{error}</p>}

          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? 'Please wait...' : isRegisterMode ? 'Register' : 'Login'}
          </button>
        </form>

        <button
          className="btn btn-secondary"
          type="button"
          style={{ marginTop: '0.75rem', width: '100%' }}
          onClick={() => setIsRegisterMode((prev) => !prev)}
        >
          {isRegisterMode ? 'Already have an account? Login' : 'No account? Register'}
        </button>
      </section>
    </main>
  );
};

export default LoginPage;
