import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Sun, Moon } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import type { IPData } from './types/ip';

const queryClient = new QueryClient();

function IPLookup() {
  const [ipAddress, setIpAddress] = React.useState<string>('');
  const { theme, toggleTheme } = useTheme();

  const { data, error, isLoading, refetch } = useQuery<IPData>({
    queryKey: ['ipData', ipAddress],
    queryFn: async () => {
      if (!ipAddress) return null;
      const response = await fetch(`https://ip-api.com/json/${ipAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch IP data');
      }
      return response.json();
    },
    enabled: false,
  });

  const handleSearch = (ip: string) => {
    setIpAddress(ip);
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg 
                     transition-all duration-200"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-600" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            GeoIntel
          </h1>
          
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <ErrorMessage message={error instanceof Error ? error.message : 'An error occurred'} />
          )}

          {data && data.status === 'success' && <ResultCard data={data} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IPLookup />
    </QueryClientProvider>
  );
}

export default App;
