import React, { createContext, useState, useEffect, useContext } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [selectedProfile, setSelectedProfile] = useState(() => {
    // Initialize from localStorage, if available
    const storedProfile = localStorage.getItem('selectedProfile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  useEffect(() => {
    // Save to localStorage whenever selectedProfile changes
    if (selectedProfile) {
      localStorage.setItem('selectedProfile', JSON.stringify(selectedProfile));
    } else {
      localStorage.removeItem('selectedProfile');
    }
  }, [selectedProfile]);

  const selectProfile = (profile) => {
    setSelectedProfile(profile);
  };

  const clearSelectedProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <ProfileContext.Provider value={{ selectedProfile, selectProfile, clearSelectedProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
