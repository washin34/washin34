import React, { useState } from 'react';
import { SearchParams } from '../types';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, loading }) => {
  const [formData, setFormData] = useState<SearchParams>({
    query: '',
    location: '',
    minPrice: undefined,
    maxPrice: undefined,
    radius: undefined,
    sortBy: 'relevance'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.query.trim()) {
      alert('Please enter a search query');
      return;
    }
    onSearch(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'minPrice' || name === 'maxPrice' || name === 'radius' 
        ? value ? Number(value) : undefined 
        : value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Facebook Marketplace</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Query */}
          <div className="md:col-span-2">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
              Search Query *
            </label>
            <input
              type="text"
              id="query"
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              placeholder="What are you looking for?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, State or ZIP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Radius */}
          <div>
            <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
              Radius (miles)
            </label>
            <select
              id="radius"
              name="radius"
              value={formData.radius || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Any distance</option>
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="25">25 miles</option>
              <option value="50">50 miles</option>
              <option value="100">100 miles</option>
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price ($)
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={formData.minPrice || ''}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Max Price */}
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price ($)
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice || ''}
              onChange={handleInputChange}
              placeholder="No limit"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              name="sortBy"
              value={formData.sortBy}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="relevance">Best Match</option>
              <option value="creation_time_descend">Newest First</option>
              <option value="creation_time_ascend">Oldest First</option>
              <option value="price_ascend">Price: Low to High</option>
              <option value="price_descend">Price: High to Low</option>
              <option value="distance_ascend">Distance: Nearest First</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </div>
            ) : (
              'Search Marketplace'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;