import { useQuery } from '@tanstack/react-query';
import { mockStands } from '../mock/mock-stands';
import { Stand } from '../types/stand.types';

// Simulate API delay
const fetchStands = async (): Promise<Stand[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockStands;
};

export const useStands = () => {
  return useQuery({
    queryKey: ['stands'],
    queryFn: fetchStands,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};