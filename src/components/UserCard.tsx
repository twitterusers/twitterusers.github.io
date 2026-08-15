import { useState, type FC, type KeyboardEvent } from "react";
import { Avatar } from "./Avatar";
import type { XUser } from "../models/XUser";

interface UserCardProps {
  user: XUser;
  baseUrl: string;
  style?: React.CSSProperties;
}

/**
 * Collapsed by default: just the avatar and handle, so the grid can
 * pack many entries into a small footprint. Clicking (or pressing
 * Enter/Space on) the card toggles it open in place to reveal the
 * display name and the two outbound links. Only the expanded links
 * navigate away, so a stray click never leaves the page.
 */
export const UserCard: FC<UserCardProps> = ({ user, baseUrl, style }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((value) => !value);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className={`user-card${expanded ? " user-card-expanded" : ""}`}
      style={style}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${expanded ? "Collapse" : "Expand"} ${user.displayName}`}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <div className="user-card-top">
        <Avatar user={user} baseUrl={baseUrl} />
        <div className="user-text">
          <div className="user-handle">@{user.handle}</div>
          {expanded && <div className="user-name">{user.displayName}</div>}
        </div>
      </div>

      {expanded && (
        <div className="user-card-links">
          <a
            className="user-link"
            href={user.xProfileUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            X profile
          </a>
          <a
            className="user-link"
            href={user.archiveProfileUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            Archive
          </a>
        </div>
      )}
    </div>
  );
};
