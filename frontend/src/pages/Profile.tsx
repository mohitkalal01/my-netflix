import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Button from '../components/Button';
import { Spinner } from '../components/Loader';

const Profile = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
        Account
      </h1>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-800 rounded">
          <span className="text-gray-400">Username</span>
          <span>{user.username}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-800 rounded">
          <span className="text-gray-400">Email</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-800 rounded">
          <span className="text-gray-400">Membership</span>
          <span className="bg-green-600 px-2 py-1 rounded-sm text-sm font-bold">
            {user.isAdmin ? 'Admin' : 'Premium'}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <Button onClick={logout} fullWidth>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
