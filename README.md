# Spaceheon - SpaceHey to Napoleon migrator

Easily migrate your Spacehey Blogs to Napoleon. (Windows Only)

### Quick Guide

Install the program (building locally) and run `spaceheon setup`.
It will ask for your SpaceHey and Napoleon credentials. In order to get them,
open the console on both windows and go to Application > Cookies > (First URL).
For SpaceHey, pick the value of the **SPACEHEY_SESSID** cookie. For Napoleon, pick the value of the **PHPSESSID** cookie.

Once that's done, you can run `spaceheon migrate` and paste the desired blog's ID.

### Building locally

After cloning the repo, install the dependencies and run the build script.

```
pnpm install
pnpm build

# Binary is built under the /bin directory
./bin/spaceheon.exe
```

### Roadmap

- [x] Blog migration
- [x] Secure session storage
- [ ] Better error handling
- [ ] Blog category mapping
- [ ] Multi-platform support
- [ ] Multi-blog migration support
