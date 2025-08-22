import { createContext, useContext } from 'react';

// Created the context.
export const SharedStateContext = createContext();

// Created a custom hook to make consuming the context cleaner.
export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
}