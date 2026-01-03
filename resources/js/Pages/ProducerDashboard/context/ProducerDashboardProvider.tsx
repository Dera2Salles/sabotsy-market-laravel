import React, { createContext, ReactNode, useState } from 'react';

interface ProducerDashboardContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const ProducerDashboardContext = createContext<ProducerDashboardContextType | undefined>(undefined);

export const ProducerDashboardProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ProducerDashboardContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </ProducerDashboardContext.Provider>
  );
};

export const useProducerDashboard = () => {
  const context = React.useContext(ProducerDashboardContext);
  if (!context) {
    throw new Error('useProducerDashboard must be used within ProducerDashboardProvider');
  }
  return context;
};
