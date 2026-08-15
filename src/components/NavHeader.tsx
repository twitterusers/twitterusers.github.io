import type { FC } from "react";
import { GitHubIcon, GridIcon } from "./Icons";

interface NavHeaderProps {
  userCount?: number;
}

/**
 * Sticky top navigation. Kept intentionally small and quiet so it
 * doesn't compete with the hero title beneath it: a brand mark on the
 * left that acts as the home link, and a single outbound link (the
 * repo) on the right. Per-entry X / Wayback Machine links already
 * live on every card, so repeating them here was redundant.
 */
export const NavHeader: FC<NavHeaderProps> = ({ userCount }) => {
  return (
    <header className="nav-header">
      <div className="nav-inner">
        <a className="nav-brand" href={import.meta.env.BASE_URL} aria-label="Directory home">
          <span className="nav-brand-mark" aria-hidden="true">
            <GridIcon className="nav-brand-icon" />
          </span>
          <span className="nav-brand-text">
            Directory
            {typeof userCount === "number" && (
              <span className="nav-brand-count">{userCount}</span>
            )}
          </span>
        </a>

        <nav className="nav-links" aria-label="Reference links">
          <a
            className="nav-link nav-link-repo"
            href="https://github.com/twitterusers/twitterusers.github.io"
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
          >
            <GitHubIcon className="nav-link-icon" />
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
