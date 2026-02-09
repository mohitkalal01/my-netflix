import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface IProfile {
  // Define the properties of a profile
  id: string;
  name: string;
  avatar: string;
}

interface ProfileContextType {
  selectedProfile: IProfile | null;
  selectProfile: (profile: IProfile) => void;
  clearSelectedProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType>({
  selectedProfile: null,
  selectProfile: () => {},
  clearSelectedProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(() => {
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

  const selectProfile = (profile: IProfile) => {
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
