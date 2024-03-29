# Acme Repo

A monorepo starter kit for Typescript code.

## Includes

- [NPM Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) to
  managing multiple packages in a monorepo
- [Turborepo](https://turbo.build/repo/) a build system with caching and
  monorepo support
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) + [Stylelint](https://stylelint.io/) for code
  linting
- [Prettier](https://prettier.io) for code formatting
- [Jest](https://jestjs.io) a test framework
- a sample of the [Next.js](https://nextjs.org/) implementation
- [Commitizen](https://commitizen-tools.github.io/commitizen/) +
  [Commitlint](https://commitlint.js.org)
  working together with Git Hooks via
  [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged) with Git Hooks via Husky


- [ ] TODO: add a sample of the
  [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
  implementation over [Next.js](https://nextjs.org/)

## Creating a new package

Packages must be one of the types: `sites`, `services` and `packages`.

A site package is a client-side application. Typically, this generates, at
build or runtime (SSR), at least one HTML and/or static assets entrypoint.

A service package is a server-side application. Typically, exposes an API.

Any other is a general purpose package. Can be a library,
configuration presets, helpers packages, utils packages, dev packages, etc.

### Package & Service

```shell
npm init --yes --scope='@acme' --workspace='<packages | services>/<package-dirname>'
```

- [ ] TODO: make a npm init template of package and service

## Configuring a new package

Any package is completely isolated. To integrate a package with this repository,
follow the steps below:

### package.json

Make sure the package has the `package.json` file configured correctly.

Given the
[specifities of how Node.js handles module resolution](https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_all_together)
all packages inside workspaces can be used as `devDependencies` without
any configuration. To packages that must be included in the bundle, we
recommended that you install these packages in the main bundle package. _See an
example that uses `@acme/logger` as dependency in
[./services/api-service/package.json](./services/api-service/package.json)_

Configure the `jest` to preset `@acme/jest-preset/<some-preset-file>`:

```json
{
  "jest": {
    "preset": "@acme/jest-preset/node"
  }
}
```

Configure the common `scripts` to run with Turborepo:

```json
{
  "scripts": {
    "build": "...",
    "dev": "...",
    "lint": "npm run lint:code && npm run lint:styles",
    "lint:code": "TIMING=1 eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:styles": "TIMING=1 stylelint 'src/**/*.{html,css,scss}'",
    "test": "jest"
  }
}
```

> :warning: Watch out for linters. If `stylelint` is not needed, do not
> install or configure it.

_See an example without stylelint in
[./packages/logger/package.json](./packages/logger/package.json)_

_See an example with stylelint in
[./packages/ui/package.json](./packages/ui/package.json)_

### tsconfig.json

Make sure the package configures this file extending the `@acme/tsconfig`.

Sites, services and packages may depend on another package. For Typescript
to correctly interpret these files, the `compilerOptions.composite` and
`references` properties must be defined.

In the package to be **imported**, make sure that `compilerOptions.outDir`,
`compilerOptions.rootDir`, `compilerOptions.composite` and `includes` are
defined in `tsconfig.json`:

```json
{
  "extends": "@acme/tsconfig/<some-config-file>",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "composite": true
  },
  "includes": [
    "src"
  ]
}
```

> :warning: Packages that use [tsup](https://github.com/egoist/tsup) to build
> do not work according to `composite` option. Remove `composite` in this
> case and use `@acme/lint-staged-config/with-tsup` to configure
> `.lintstagedrc.js`. See this
> [tsup issue](https://github.com/egoist/tsup/issues/647).

_See an example with composite option in
[./packages/logger/tsconfig.json](./packages/logger/tsconfig.json)_

_See an example without composite option in
[./packages/ui/tsconfig.json](./packages/ui/tsconfig.json)_

_See an example of the lint-staged configuration in
[./packages/ui/.lintstagedrc.js](./packages/ui/.lintstagedrc.js)_

In the package that will **import** another package, make sure that
`compilerOptions.composite` and `references` are defined in `tsconfig.json`:

```json
{
  "extends": "@acme/tsconfig/<some-config-file>",
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "<relative-path-to-another-package>"
    }
  ]
}
```

_See an example in
[./services/api-service/tsconfig.json](./services/api-service/tsconfig.json)_

> :warning: For correct type checking a build of **imported** package must be
> generated, or a declaration type of module should be defined. _See an example
> of the declaration type in
> [./services/api-service/src/modules.d.ts](./services/api-service/src/modules.d.ts)_

### .lintstagedrc.js

Make sure the package configures this file extending the
`@acme/lint-staged-config`.

_See an example without stylelint in
[./packages/logger/.lintstagedrc.js](./packages/logger/.lintstagedrc.js)_

_See an example with stylelint (and tsup) in
[./packages/ui/.lintstagedrc.js](./packages/ui/.lintstagedrc.js)_

### .eslintrc.js

Make sure the package configures this file extending the `@acme/eslint-config`.

The `.eslintrc.js` file must be marked with the `root` property.

_See an example in
[./packages/ui/.eslintrc.js](./packages/ui/.eslintrc.js)_

### .stylelintrc.js

If needed, make sure the package configures this file extending the
`@acme/stylelint-config`.

The `.stylelintrc.js` file must be marked with the `root` property.

_See an example in
[./packages/ui/.stylelintrc.js](./packages/ui/.stylelintrc.js)_

### .stylelintignore

If needed, make sure the package has this file configured correctly.

_See an example in
[./packages/ui/.stylelintignore](./packages/ui/.stylelintignore)_

## Running DEV mode

To run a site in DEV mode without run your dependencies in DEV mode:

```shell
npm run dev -- --filter='<site-package-name>'
```

To run a site in DEV mode with all your dependencies in DEV mode too:

```shell
npm run dev -- --filter='<site-package-name>...'
```

> :warning: Pay attention to run two or more sites with all dependencies when
> the dependencies is shared. If you run two or more sites in separated
> terminal, you will get two or more compilers of the same shared dependencies
> running at same time. Utilize the `--filter` instead run in multiple
> terminals.

Example:

```shell
npm run dev -- --filter='@acme/home-site...' --filter='@acme/root-site...'
```

_To use more filter syntaxes, see
[Turborepo Filtering Workspaces](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
._
