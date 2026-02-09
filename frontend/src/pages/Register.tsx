import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import Button from '../components/Button';
import Input from '../components/Input';
import ErrorState from '../components/ErrorState';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/register', formData);
      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <ErrorState message={error} />}
        <Input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
        />
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
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
      <p className="text-center text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-white hover:underline">
          Sign in.
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
