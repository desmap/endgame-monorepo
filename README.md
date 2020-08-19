# Endgame Monorepo

These are notes for myself and a basic monorepo template because it isn't trivial to setup a proper monorepo in 2020. IDK if this is the real endgame in monorepos—everyone has different requirements—but I just wanted a solution when using all major libs (TS, React, Next), one as simple as possble and with as few as possible dependencies, e.g. no yarn (future unknown), no pnpm (adoption risk but it's excellent), no lerna b/c sophisticated publishing of the monorepo isn't my top prio for now.

My requirements are:

1. A monorepo with proper code sharing and incremental rebuilds on change of shared repositories as much as possible
2. Conditional imports, e.g. for the client side
3. Interoperability with React's major frontend framework Next (which is quite tricky because Next isn't a lib and doesn't like to be integrated)

The implementation:

1. **Monorepo with TypeScript Project References**; while this feature isn't easy to grok it's the most simple way to setup a proper monorepo with incremental builds
2. **Conditional imports** will be handled only on the client side and only in the compile target with `webpack.NormalModuleReplacementPlugin` within Next.js
3. **Interoperability with Next**; TypeScript references (actually the "repos" in the monorepo) have to be declared in Next's `tsconfig.json` as `paths`, this works but be aware that Next does not rebuild on change of the imported module, example:

```
  "baseUrl": ".",
  "paths": {
    "p1": ["../dist/p1"]
  }

```

re 3: Next can be hacked to import paths out of its scope, eg. with `next-transpile-modules` or with other hacks described in https://github.com/vercel/next.js/issues/5666; I couldn't get any to work and transpile the decorators in the shared `p1`. Also I don't know if this will rebuild on change and if those hacks break on upgrading Next, eventually.

Further notes:

- The `.babelrc` is for getting full decorator support with Next: https://github.com/vercel/next.js/issues/4707 but is not required for the requirements
- I chose to have all builds (`dist`) in the top dir and not in each repo; it just makes the handing easier; be aware that every repo needs its dedicated script in the one `package.json`
