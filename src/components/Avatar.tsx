import { useState, type FC } from "react";
import type { XUser } from "../models/XUser";

interface AvatarProps {
  user: XUser;
  baseUrl: string;
}

/**
 * Shows the locally supplied avatar image when one exists at
 * public/images/users/<handle>.webp, otherwise falls back to a generated
 * initials badge. The fallback state is sticky for the component's
 * lifetime once an image fails to load, avoiding a retry loop.
 */
export const Avatar: FC<AvatarProps> = ({ user, baseUrl }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="user-avatar-fallback" aria-hidden="true">
        {user.initials}
      </div>
    );
  }

  return (
    <img
      className="user-avatar"
      src={`${baseUrl}${user.localImagePath}`}
      alt=""
      width={46}
      height={46}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};
