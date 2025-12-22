import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {isSearchOpen ? (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-5 duration-200">
          <Input
            type="text"
            placeholder="Search..."
            className="h-8 w-64 bg-transparent border-gray-800 text-gray-200 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-700"
            autoFocus
            onBlur={() => setIsSearchOpen(false)}
          />
        </div>
      ) : (
        <Button
          size="sm"
          className="bg-transparent hover:bg-gray-800 text-gray-400 h-8 px-3 border border-gray-800 animate-in fade-in duration-400"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search size={16} />
        </Button>
      )}
    </>
  );
}
