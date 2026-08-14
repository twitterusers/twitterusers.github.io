import type { FC } from "react";
import { Avatar } from "./Avatar";
import type { XUser } from "../models/XUser";

interface UserCardProps {
  user: XUser;
  baseUrl: string;
  style?: React.CSSProperties;
}

/**
 * The whole card links to the user's live X profile, since that is the
 * primary action. A secondary row underneath offers the archived
 * history as an explicit, separate link so it never gets triggered by
 * accident.
 */
export const UserCard: FC<UserCardProps> = ({ user, baseUrl, style }) => {
  return (
    <div className="user-card" style={style}>
      <a
        href={user.xProfileUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${user.displayName} on X`}
      >
        <div className="user-card-top">
          <Avatar user={user} baseUrl={baseUrl} />
          <div className="user-text">
            <div className="user-name">{user.displayName}</div>
            <div className="user-handle">@{user.handle}</div>
          </div>
        </div>
      </a>
      <div className="user-card-links">
        <a
          className="user-link"
          href={user.xProfileUrl}
          target="_blank"
          rel="noreferrer"
        >
          X profile
        </a>
        <a
          className="user-link"
          href={user.archiveProfileUrl}
          target="_blank"
          rel="noreferrer"
        >
          Archive
        </a>
      </div>
    </div>
  );
};
