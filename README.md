<div align="center">
  <img src="public/favicon.svg" width="64" height="64" alt="Directory logo" />

  <h1>Directory</h1>

  <p>
    A community directory of archived X (formerly Twitter) handles &mdash;
    each entry links out to the current live profile and to its history
    on the Wayback Machine.
  </p>

  <p>
    <a href="https://twitterusers.github.io/"><img alt="Live site" src="https://img.shields.io/badge/live-twitterusers.github.io-e6e3da?style=flat-square&labelColor=08090b" /></a>
    <a href="https://github.com/twitterusers/twitterusers.github.io/actions/workflows/deploy.yml"><img alt="Deploy status" src="https://img.shields.io/github/actions/workflow/status/twitterusers/twitterusers.github.io/deploy.yml?branch=main&style=flat-square&label=deploy&labelColor=08090b&color=7c8891" /></a>
    <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-c9cfd2?style=flat-square&labelColor=08090b" />
  </p>

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-9aa3a8?style=flat-square&logo=react&logoColor=e6e3da&labelColor=08090b" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-9aa3a8?style=flat-square&logo=typescript&logoColor=e6e3da&labelColor=08090b" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-8-9aa3a8?style=flat-square&logo=vite&logoColor=e6e3da&labelColor=08090b" />
    <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-deployed-9aa3a8?style=flat-square&logo=githubpages&logoColor=e6e3da&labelColor=08090b" />
  </p>
</div>

<br />

<p align="center">
  <a href="#overview">Overview</a> &nbsp;&middot;&nbsp;
  <a href="#architecture">Architecture</a> &nbsp;&middot;&nbsp;
  <a href="#managing-the-directory">Managing the directory</a> &nbsp;&middot;&nbsp;
  <a href="#local-development">Local development</a> &nbsp;&middot;&nbsp;
  <a href="#deployment">Deployment</a>
</p>

---

## Overview

Directory renders a searchable grid of compact, expandable cards. Each
card is collapsed by default &mdash; avatar and handle only &mdash; and
opens in place on click (or <kbd>Enter</kbd> / <kbd>Space</kbd>) to
reveal the display name, optional location and join date, and two
icon links:

<table>
  <tr>
    <td width="36" align="center"><img src="https://cdn.simpleicons.org/x/9aa3a8" width="16" height="16" alt="X" /></td>
    <td>Opens the account's live profile at <code>x.com/&lt;handle&gt;</code>.</td>
  </tr>
  <tr>
    <td align="center"><img src="https://cdn.simpleicons.org/internetarchive/9aa3a8" width="16" height="16" alt="Wayback Machine" /></td>
    <td>
      Opens the Wayback Machine's calendar of every archived snapshot
      of <code>twitter.com/&lt;handle&gt;</code>, over <code>http</code>
      since that's the scheme early Twitter profile pages were actually
      served and captured under.
    </td>
  </tr>
</table>

All 600+ entries are held in one shared, in-memory directory object,
built once from a static JSON file and queried by every card and by
the search bar &mdash; there's no per-card duplication of state or
fetch logic.

## Architecture

An OOP data layer keeps every handle&rarr;URL rule in exactly one
place:

```
src/
├── models/
│   └── XUser.ts            # one directory entry: handle, display name,
│                            # optional location/joined, derived URLs
├── services/
│   └── UserDirectory.ts    # loads users.json once, dedupes, sorts,
│                            # and searches the full XUser[] set
├── components/
│   ├── NavHeader.tsx        # sticky top navigation
│   ├── SearchBar.tsx        # filters the directory in place
│   ├── UserCard.tsx         # collapsed/expandable card
│   ├── Avatar.tsx           # local image with initials fallback
│   ├── Icons.tsx            # inline SVG icon set (no emoji, no icon font)
│   └── Footer.tsx
├── App.tsx                  # data loading + layout
└── main.tsx
```

| Layer | Responsibility |
|---|---|
| `XUser` | Wraps one JSON record; exposes `xProfileUrl`, `archiveProfileUrl`, `localImagePath`, `initials`, and `matches(query)` as getters/methods, so components stay dumb. |
| `UserDirectory` | Fetches `public/data/users.json`, builds `XUser` instances, dedupes by lowercased handle, sorts alphabetically, and answers `search()` / `count`. |
| `UserCard` | Presentation only. Reads an `XUser`, renders the collapsed/expanded states, never touches URL-building logic directly. |

## Managing the directory

### Adding or updating a user

Edit `public/data/users.json`. Each entry needs a handle and display
name; `location` and `joined` are optional:

```json
{
  "handle": "jfjfj",
  "displayName": "Example Name",
  "location": "London, England",
  "joined": "April 2007"
}
```

### Adding an avatar

Drop an image at `public/images/users/<handle-lowercase>.webp` &mdash;
see `public/images/users/README.md`. Entries without a matching image
fall back to a generated initials badge automatically, so this step
is optional per user.

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

## Deployment

This repo is a GitHub Pages **user/organization site**
(`twitterusers.github.io`), served from the domain root, which is why
`vite.config.ts` sets `base: "/"`.

1. Push to `main`.
2. In the repository's **Settings &rarr; Pages**, set the source to
   **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds the project with
   `npm ci && npm run build` and publishes `dist/` via
   `actions/deploy-pages` automatically on every push to `main`.

## License

No license file is currently included in this repository. Add a
`LICENSE` file if you want to grant explicit reuse rights.

<div align="center">
<sub>

`GET /web/*/http://twitter.com/<handle>` &nbsp;&middot;&nbsp; archived by [the Wayback Machine](https://web.archive.org)

</sub>
</div>
