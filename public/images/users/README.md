# User images

Drop each avatar in this folder, named exactly after the handle in
`src/data/users.json`, lowercase, using the extension below.

Example: the user with `"handle": "jfjfj"` needs a file at:

```
public/images/users/jfjfj.webp
```

Format: `.webp` is expected by default. If you only have `.jpg` or
`.png` files, either convert them to `.webp` or change the
`imageExtension` value in `src/models/XUser.ts`.

If a file is missing for a given handle, the card falls back to a
generated initials avatar automatically. No build step is required to
add or replace images, just drop the file in and redeploy.
