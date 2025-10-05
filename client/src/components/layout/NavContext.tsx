import React, { createContext, useState, useEffect, useMemo } from 'react';

// Define the shape of the context state
interface NavContextState {
  userType: 'recruiter' | 'peer' | 'general';
  menuOpen: boolean;
  location: string | null;
  greeting: string;
  toggleMenu: () => void;
  setUserType: (type: 'recruiter' | 'peer' | 'general') => void;
}

// Create the context with a default value
export const NavContext = createContext<NavContextState | undefined>(undefined);

// Create the provider component
export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  // --- STATE MANAGEMENT ---
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserTypeState] = useState<'recruiter' | 'peer' | 'general'>('general');
  const [location, setLocation] = useState<string | null>(null);
  const [greeting, setGreeting] = useState('');

  // --- EFFECTS ---

  // Effect to load user data from localStorage on initial render
  useEffect(() => {
    try {
      const storedUserType = localStorage.getItem('userType') as 'recruiter' | 'peer' | 'general' | null;
      const storedLocation = localStorage.getItem('location');

      if (storedUserType) {
        setUserTypeState(storedUserType);
      }
      if (storedLocation) {
        setLocation(storedLocation);
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage', error);
    }
  }, []);

  // Effect to generate a time-based greeting
  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    };

    let fullGreeting = `${getGreeting()}`;
    if (userType !== 'general') {
      fullGreeting += `, ${userType}`;
    }
    if (location) {
      fullGreeting += ` from ${location}`;
    }
    fullGreeting += ' 👋';
    setGreeting(fullGreeting);
  }, [userType, location]);

  // --- ACTIONS ---

  // Action to toggle the menu state
  const toggleMenu = () => {
    setMenuOpen((prev: boolean) => !prev);
  };

  // Action to set user type and persist to localStorage
  const setUserType = (type: 'recruiter' | 'peer' | 'general') => {
    setUserTypeState(type);
    localStorage.setItem('userType', type);
  };

  // --- CONTEXT VALUE ---

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    userType,
    menuOpen,
    location,
    greeting,
    toggleMenu,
    setUserType,
  }), [userType, menuOpen, location, greeting]);

  return (
    <NavContext.Provider value={value}>
      {children}
    </NavContext.Provider>
  );
};
