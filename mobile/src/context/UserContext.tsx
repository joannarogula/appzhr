import React, { createContext, useState, ReactNode } from 'react';

// Tworzymy kontekst z domyślną wartością
export const UserContext = createContext<{
  userId: string | null;
  teamId: string | null;
  setUserId: (id: string | null) => void;
  setTeamId: (id: string | null) => void;
}>({
  userId: null,
  teamId: null,
  setUserId: () => {},
  setTeamId: () => {},
});

// Typowanie dla komponentu UserProvider
interface UserProviderProps {
  children: ReactNode; // Definiuje typ dla `children`
}

// Tworzymy dostawcę kontekstu
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId, teamId, setTeamId }}>
      {children}
    </UserContext.Provider>
  );
};
