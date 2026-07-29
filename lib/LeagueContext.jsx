'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LeagueCtx = createContext({ league: 'euroleague', toggle: () => {} });

export function LeagueProvider({ children }) {
  const [league, setLeague] = useState('euroleague');

  useEffect(() => {
    const saved = localStorage.getItem('mtn-league');
    if (saved === 'euroleague' || saved === 'bsl') setLeague(saved);
  }, []);

  function setLeagueAndSave(l) {
    setLeague(l);
    localStorage.setItem('mtn-league', l);
  }

  return (
    <LeagueCtx.Provider value={{ league, setLeague: setLeagueAndSave }}>
      {children}
    </LeagueCtx.Provider>
  );
}

export const useLeague = () => useContext(LeagueCtx);
