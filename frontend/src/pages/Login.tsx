import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/Button';
import Input from '../components/Input';
import ErrorState from '../components/ErrorState';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', formData);
      login(data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Sign In</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <ErrorState message={error} />}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" onClick={() => {}} disabled={loading} fullWidth>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
      <p className="text-center text-gray-400">
        New to My-netflix?{' '}
        <Link to="/register" className="font-bold text-white hover:underline">
          Sign up now.
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
