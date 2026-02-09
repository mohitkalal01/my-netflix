import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

interface IProfile {
  id: string;
  name: string;
  avatar: string;
}

const profiles: IProfile[] = [
  { id: '1', name: 'User 1', avatar: 'https://occ-0-2794-2795.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHNpc/AAAABTYctxxbe-UkKEdxahlXjZDL7OvUjNCpQxRsrkosmFwCGNWQt individually for example' },
  { id: '2', name: 'User 2', avatar: 'https://occ-0-2794-2795.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHNpc/AAAABbS7Yj3S40aT8oN3j-xT10_N-Q46pW_M0l3f0s_V7d2Q-g-t4N0t_U0e-fT1-w-x-R-z-y-0.png?r=a7f' },
  { id: '3', name: 'Kids', avatar: 'https://occ-0-2794-2795.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHNpc/AAAABZgq7j2W2-jQ2q-v3Q2r-2Q-x-2Q-y-2Q-z-2Q-w-2Q-a-2Q-b-2Q-c-2Q-d-2Q-e-2Q-f-2Q-g-2Q-h-2Q-i-2Q-j-2Q-k-2Q-l-2Q-m-2Q-n-2Q-o-2Q-p-2Q-q-2Q-r-2Q-s-2Q-t-2Q-u-2Q-v-2Q-w-2Q-x-2Q-y-2Q-z-2Q.png?r=0a6' },
];

const ProfileSelector = () => {
  const navigate = useNavigate();
  const { selectedProfile, selectProfile } = useProfile();

  useEffect(() => {
    if (selectedProfile) {
      navigate('/'); // Redirect to home if a profile is already selected
    }
  }, [selectedProfile, navigate]);

  const handleProfileSelect = (profile: IProfile) => {
    selectProfile(profile);
    navigate('/'); // Navigate to home after selecting a profile
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-black text-white">
      <div className="text-center p-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Who's watching?</h1>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-4xl mx-auto">
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              className="group flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden ring-2 ring-transparent group-hover:ring-white transition-all duration-300">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-gray-400 group-hover:text-white text-lg md:text-xl transition-colors duration-300">
                {profile.name}
              </p>
            </motion.div>
          ))}
        </div>
        <button className="mt-12 px-6 py-3 border border-gray-500 text-gray-500 text-lg hover:border-white hover:text-white transition-colors duration-300 rounded">
          Manage Profiles
        </button>
      </div>
    </div>
  );
};

export default ProfileSelector;

