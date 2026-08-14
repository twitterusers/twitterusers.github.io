import type { FC } from "react";

export const Footer: FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="page-footer">
      <span>{year}, directory of archived community handles.</span>
      <span>Cards link out to x.com and web.archive.org.</span>
    </footer>
  );
};
