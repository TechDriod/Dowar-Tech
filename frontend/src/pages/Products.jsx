import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { getProducts } from '../services/api';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState('newest');
  const [filters, setFilters] = useState({
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    gpuFilter: [],
    cpuFilter: [],
    ramFilter: [],
    minPrice: '',
    maxPrice: '',
  });
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        search,
        sort,
        page,
        limit: 12,
      };
      if (filters.categories.length > 0) params.category = filters.categories.join(',');
      if (filters.gpuFilter.length > 0) params.gpu = filters.gpuFilter.join(',');
      if (filters.cpuFilter.length > 0) params.cpu = filters.cpuFilter.join(',');
      if (filters.ramFilter.length > 0) params.ram = filters.ramFilter.join(',');
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const res = await getProducts(params);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, sort, filters, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [fetchProducts, search]);

  useEffect(() => {
    setPage(1);
  }, [search, filters, sort]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ categories: [], gpuFilter: [], cpuFilter: [], ramFilter: [], minPrice: '', maxPrice: '' });
    setSearch('');
    setPage(1);
  };

  const activeFilterCount =
    filters.categories.length + filters.gpuFilter.length + filters.cpuFilter.length +
    filters.ramFilter.length + (filters.minPrice ? 1 : 0) + (filters.maxPrice ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-gaming text-3xl font-bold text-white mb-1">Gaming PCs</h1>
        <p className="text-gray-400">
          {loading ? 'Loading...' : `${pagination.total} products found`}
        </p>
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-grow">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex gap-3">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 bg-dark-800 border border-gray-700 hover:border-purple-500 rounded-xl px-4 py-3 text-gray-300 text-sm transition-all"
          >
            <FiFilter size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-dark-800 border border-gray-700 hover:border-purple-500 rounded-xl px-4 py-3 pr-10 text-gray-300 text-sm focus:outline-none focus:border-purple-500 cursor-pointer transition-all"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onClear={clearFilters} />
        </aside>

        {/* Products */}
        <div className="flex-grow min-w-0">
          <ProductGrid products={products} loading={loading} error={error} />

          {/* Pagination */}
          {!loading && pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all
                    ${page === p
                      ? 'bg-purple-600 text-white shadow-neon-purple'
                      : 'bg-dark-800 border border-gray-700 text-gray-400 hover:border-purple-500 hover:text-white'
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
