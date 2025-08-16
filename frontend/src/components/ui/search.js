import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const CustomSearchField = ({ 
  placeholder = "Search...",
  onSearch,
  className = "",
  debounceTime = 300
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  let debounceTimer;

  // Handle search with debounce
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      onSearch?.(query);
    }, debounceTime);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    inputRef.current.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`
        flex items-center border rounded-lg overflow-hidden
        transition-all duration-200
        ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300 hover:border-gray-400'}
        dark:border-gray-600 dark:hover:border-gray-500
      `}>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`
            w-full h-full py-2 px-1 outline-none bg-transparent
            text-gray-800 dark:text-gray-200 placeholder-gray-400
          `}
        />

        {/* Clear Button (visible when text exists) */}
        {query && (
          <button
            onClick={handleClear}
            className="pr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Optional: Recent searches dropdown */}
      {isFocused && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md py-1">
          {searchSuggestions.map((item) => (
            <button
              key={item}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setQuery(item);
                inputRef.current.focus();
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSearchField;