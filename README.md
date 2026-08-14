# Directory

A landing page listing former community members as cards. Each card
links to that person's current X profile by handle, and offers a
second link to their archived history on the Wayback Machine.

Built with React and TypeScript, using an OOP data layer:

- `src/models/XUser.ts`, a class wrapping one handle/display-name pair
  and exposing the derived X and archive URLs, the local avatar path,
  and a search matcher.
- `src/services/UserDirectory.ts`, a class that loads, dedupes, sorts,
  and searches the full set of `XUser` instances.

## Adding or updating users

Edit `public/data/users.json`. Each entry needs just a handle and a
display name:

```json
{ "handle": "jfjfj", "displayName": "Example Name" }
```

Clicking that card opens `https://x.com/jfjfj`. Its archive link opens
the Wayback Machine's calendar view for `https://twitter.com/jfjfj`.

## Adding avatars

Drop an image at `public/images/users/<handle-lowercase>.webp`. See
`public/images/users/README.md` for details. Cards without a matching
image fall back to a generated initials badge automatically, so this
step is optional per user.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a production build to `dist/`.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings, under Pages, set the source to
   "GitHub Actions".
3. Push to `main`. The included workflow at
   `.github/workflows/deploy.yml` builds the site and publishes
   `dist/` automatically.
