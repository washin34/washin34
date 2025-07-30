import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import { searchMarketplace, checkHealth } from './services/api';
import { SearchParams, MarketplaceItem } from './types';

function App() {
  const [results, setResults] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  useEffect(() => {
    // Check if backend server is running
    const checkServerHealth = async () => {
      try {
        const isHealthy = await checkHealth();
        setServerStatus(isHealthy ? 'online' : 'offline');
      } catch (error) {
        setServerStatus('offline');
      }
    };

    checkServerHealth();
    
    // Check server status every 30 seconds
    const interval = setInterval(checkServerHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await searchMarketplace(params);
      
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.error || 'Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Facebook Marketplace Search
              </h1>
            </div>
            
            {/* Server Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                serverStatus === 'online' ? 'bg-green-500' : 
                serverStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {serverStatus === 'online' ? 'Server Online' : 
                 serverStatus === 'offline' ? 'Server Offline' : 'Checking...'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Server Offline Warning */}
        {serverStatus === 'offline' && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Backend Server Offline
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    The backend server is not running. Please start the server by running:
                  </p>
                  <code className="bg-red-100 px-2 py-1 rounded mt-2 inline-block">
                    npm run server
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Results or Initial State */}
        {(results.length > 0 || loading || error) ? (
          <SearchResults results={results} loading={loading} error={error} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Search Facebook Marketplace
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your search criteria above to find items on Facebook Marketplace.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="font-medium text-blue-800 mb-2">How it works:</h3>
              <ul className="text-sm text-blue-700 space-y-1 text-left max-w-md mx-auto">
                <li>• Enter what you're looking for in the search box</li>
                <li>• Optionally specify location, price range, and other filters</li>
                <li>• Click "Search Marketplace" to find matching listings</li>
                <li>• View results and click "View on Facebook" to see the full listing</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              This tool searches Facebook Marketplace using web scraping. 
              Results may vary and Facebook may block requests if used excessively.
            </p>
            <p className="mt-2">
              Built with React, Node.js, and Puppeteer for educational purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
