'use client';

import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

export interface DropdownOption {
  id: string | number;
  label: string;
  value: string | number;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function Dropdown({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  error,
  className = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedOption = options.find(option => option.value === value);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = options.findIndex(opt => opt.value === value) + 1;
          if (nextIndex < options.length) {
            onChange(options[nextIndex].value);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = options.findIndex(opt => opt.value === value) - 1;
          if (prevIndex >= 0) {
            onChange(options[prevIndex].value);
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(false);
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        case 'Tab':
          setIsOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, options, value, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 ease-in-out">
        {label}
        {required && <span className="text-error-600 ml-1">*</span>}
      </label>
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            ref={buttonRef}
            className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border transition-all duration-200 ease-in-out
              ${error 
                ? 'border-error-300 focus:border-error-500 focus:ring-2 focus:ring-error-500' 
                : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500'
              }
              hover:border-gray-400
            `}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-labelledby={label ? `${label}-label` : undefined}
            onKeyDown={handleKeyDown}
          >
            <span className={`block truncate ${selectedOption ? 'text-gray-900' : 'text-gray-500'} transition-colors duration-200 ease-in-out`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            enter="transition ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <Listbox.Options
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm transition-all duration-200 ease-in-out"
              aria-label={label || 'Options'}
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 transition-all duration-200 ease-in-out
                    ${active ? 'bg-primary-50 text-primary-900' : 'text-gray-900 hover:bg-gray-50'}`
                  }
                  value={option.value}
                  aria-selected={option.value === value}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'} transition-all duration-200 ease-in-out`}>
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600 transition-transform duration-200 ease-in-out group-hover:scale-110">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error && (
        <p className="mt-1 text-sm text-error-600 transition-all duration-200 ease-in-out">
          {error}
        </p>
      )}
    </div>
  );
} 