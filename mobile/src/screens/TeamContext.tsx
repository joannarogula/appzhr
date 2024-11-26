import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

// Typ dla kontekstu
type TeamContextType = {
    teamId: string | null;
    setTeamId: Dispatch<SetStateAction<string | null>>;
};

// Tworzenie kontekstu z domyślną wartością
const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Provider dla kontekstu
export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [teamId, setTeamId] = useState<string | null>(null);

    return (
        <TeamContext.Provider value={{ teamId, setTeamId }}>
            {children}
        </TeamContext.Provider>
    );
};

// Hook do korzystania z kontekstu
export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeam must be used within a TeamProvider');
    }
    return context;
};
