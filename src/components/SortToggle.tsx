import type { FC } from "react";
import type { SortOrder } from "../services/UserDirectory";

interface SortToggleProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

/**
 * Two clear, scannable options rather than raw internal names:
 * "A-Z" for the alphabetical order, "Recently updated" for entries
 * that were most recently added or edited. Both read as outcomes
 * ("what will I see"), not implementation details.
 */
const OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "alphabetical", label: "A–Z" },
  { value: "recentlyUpdated", label: "Recently updated" },
];

export const SortToggle: FC<SortToggleProps> = ({ value, onChange }) => {
  return (
    <div className="sort-toggle" role="group" aria-label="Sort directory">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`sort-toggle-option${value === option.value ? " sort-toggle-option-active" : ""}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
