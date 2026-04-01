import React from 'react';
import { FiX, FiFilter } from 'react-icons/fi';

const GPU_OPTIONS = [
  'RTX 4090', 'RTX 4080', 'RTX 4070 Ti', 'RTX 4070',
  'RTX 4060 Ti', 'RTX 4060', 'RX 7900 XTX', 'RX 7800 XT', 'RX 7700 XT', 'RX 7600',
];

const CPU_OPTIONS = [
  { label: 'Intel i9', value: 'i9' },
  { label: 'Intel i7', value: 'i7' },
  { label: 'Intel i5', value: 'i5' },
  { label: 'AMD Ryzen 9', value: 'Ryzen 9' },
  { label: 'AMD Ryzen 7', value: 'Ryzen 7' },
  { label: 'AMD Ryzen 5', value: 'Ryzen 5' },
];

const RAM_OPTIONS = ['16GB', '32GB', '64GB'];
const CATEGORIES = ['Budget', 'Mid-Range', 'High-End', 'Ultra'];

const FilterCheckbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-gray-600 bg-dark-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
    />
    <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{label}</span>
  </label>
);

const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <h4 className="font-gaming text-xs text-gray-400 uppercase tracking-wider mb-3">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const FilterSidebar = ({ filters, onFilterChange, onClear }) => {
  const { gpuFilter = [], cpuFilter = [], ramFilter = [], categories = [], minPrice = '', maxPrice = '' } = filters;

  const toggleArrayFilter = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(key, updated);
  };

  const hasActiveFilters =
    gpuFilter.length > 0 || cpuFilter.length > 0 || ramFilter.length > 0 ||
    categories.length > 0 || minPrice || maxPrice;

  return (
    <div className="bg-dark-800 border border-gray-700 rounded-xl p-5 sticky top-20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FiFilter className="text-purple-400" />
          <h3 className="font-gaming text-sm text-white uppercase tracking-wider">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            <FiX size={12} /> Clear All
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="w-full bg-dark-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
          <input
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="w-full bg-dark-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        {CATEGORIES.map((cat) => (
          <FilterCheckbox
            key={cat}
            label={cat}
            checked={categories.includes(cat)}
            onChange={() => toggleArrayFilter('categories', cat)}
          />
        ))}
      </FilterSection>

      {/* GPU */}
      <FilterSection title="GPU">
        {GPU_OPTIONS.map((gpu) => (
          <FilterCheckbox
            key={gpu}
            label={gpu}
            checked={gpuFilter.includes(gpu)}
            onChange={() => toggleArrayFilter('gpuFilter', gpu)}
          />
        ))}
      </FilterSection>

      {/* CPU */}
      <FilterSection title="CPU">
        {CPU_OPTIONS.map(({ label, value }) => (
          <FilterCheckbox
            key={value}
            label={label}
            checked={cpuFilter.includes(value)}
            onChange={() => toggleArrayFilter('cpuFilter', value)}
          />
        ))}
      </FilterSection>

      {/* RAM */}
      <FilterSection title="RAM">
        {RAM_OPTIONS.map((ram) => (
          <FilterCheckbox
            key={ram}
            label={ram}
            checked={ramFilter.includes(ram)}
            onChange={() => toggleArrayFilter('ramFilter', ram)}
          />
        ))}
      </FilterSection>
    </div>
  );
};

export default FilterSidebar;
