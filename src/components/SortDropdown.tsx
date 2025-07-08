'use client';

import { useRef, useState } from 'react';

import type { SortOptionType } from '@/types/movieTypes';
import { SORT_OPTIONS } from '@/constants/movieConstants';

import { BASE_URL } from '@/constants/routes';
import { useClickAway } from 'react-use';

type SortDropMenuProps = {
  selected: SortOptionType;
  setSelected: (newSelected: SortOptionType) => void;
  setIsOpen: (isOpen: boolean) => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
  handleClearState: () => void;
};

export const SortDropdown = ({
  selected,
  setSelected,
}: {
  selected: SortOptionType;
  setSelected: (newSelected: SortOptionType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortDropdown = useRef<HTMLDivElement>(null);

  const handleClearState = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative shrink-0" ref={sortDropdown}>
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer text-[20px] flex items-center gap-[10px]"
      >
        Sort by: <span className="min-w-[147px]">{selected.name}</span>{' '}
        <span>
          <svg
            className={`h-[30px] w-[30px] object-cover duration-300 ease-in-out  stroke-main-icon-color ${
              isOpen && 'rotate-180'
            }`}
          >
            <use href={`${BASE_URL}/icons/sprite.svg#up-icon`}></use>
          </svg>
        </span>
      </button>
      {isOpen && (
        <SortDropMenu
          selected={selected}
          setSelected={setSelected}
          setIsOpen={setIsOpen}
          parentRef={sortDropdown}
          handleClearState={handleClearState}
        />
      )}
    </div>
  );
};

const SortDropMenu: React.FC<SortDropMenuProps> = ({
  selected,
  setSelected,
  setIsOpen,
  handleClearState,
  parentRef,
}: SortDropMenuProps) => {
  useClickAway(parentRef, () => {
    handleClearState();
  });

  return (
    <ul
      role="listbox"
      tabIndex={-1}
      aria-label="Sort options"
      className="
absolute z-10 mt-1 min-w-full duration-300 ease-in-out  flex flex-col border rounded shadow bg-dropdown-bg border-dropdown-border
"
    >
      {SORT_OPTIONS.map((option) => (
        <li
          key={option.sortBy}
          role="option"
          tabIndex={option.name === selected.name ? -1 : 0}
          aria-selected={option.name === selected.name}
          onClick={() => {
            setSelected(option);
            setIsOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelected(option);
              setIsOpen(false);
            }
          }}
          className={`text-main-text px-4 py-2 duration-300 hover:bg-dropdown-list-bg cursor-pointer ${
            option.name === selected.name &&
            'bg-dropdown-list-bg pointer-events-none cursor-default'
          }`}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
};
