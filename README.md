# Acme Repo

A monorepo starter kit for Typescript code.

## Includes

- [NPM Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) to
  managing multiple packages in a monorepo
- [Turborepo](https://turbo.build/repo/) a build system with caching and
  monorepo support
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Stylelint](https://stylelint.io/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Jest](https://jestjs.io) a test framework

## Configuring a new package

Any package is completely isolated. To integrate a package with this repository,
follow the steps below:

### package.json

Make sure the package has the `package.json` file configured correctly.

Insert the `devDependencies` and configure the `jest`:

```json
{
  "jest": {
    "preset": "@acme/jest-preset/node"
  },
  "devDependencies": {
    "@acme/eslint-config": "*",
    "@acme/jest-preset": "*",
    "@acme/lint-staged-config": "*",
    "@acme/stylelint-config": "*",
    "@acme/tsconfig": "*"
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
    "lint:styles": "TIMING=1 stylelint 'src/**/*.{html,css,js,jsx,ts,tsx}'",
    "lint:staged": "lint-staged -q",
    "test": "jest"
  }
}
```

> :warning: Watch out for linters. If `stylelint` is not needed, do not
> install it.

_See an example without stylelint
in [./packages/logger/package.json](./packages/logger/package.json)_

_See an example with stylelint
in [./packages/ui/package.json](./packages/ui/package.json)_

### tsconfig.json

Make sure the package configures this file extending the `@acme/tsconfig`.

Sites, services and packages may depend on another package. For Typescript
to correctly interpret these files, the `compilerOptions.composite` and
`references` properties must be defined.

In the package to be **imported**, make sure that `compilerOptions.outDir`,
`compilerOptions.rootDir` and `includes` are defined in `tsconfig.json`:

```json
{
  "extends": "@acme/tsconfig/<some-config-file>",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "includes": [
    "src"
  ]
}
```

_See an example
in [./packages/logger/tsconfig.json](./packages/logger/tsconfig.json)_

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

_See an example
in [./services/api-service/tsconfig.json](./services/api-service/tsconfig.json)_

> :warning: For correct type checking a build of **imported** package must be
> generated.

### .lintstagedrc.js

Make sure the package configures this file extending the
`@acme/lint-staged-config`.

_See an example without stylelint
in [./packages/logger/.lintstagedrc.js](./packages/logger/.lintstagedrc.js)_

_See an example with stylelint
in [./packages/ui/.lintstagedrc.js](./packages/ui/.lintstagedrc.js)_

### .eslintrc.js

Make sure the package configures this file extending the `@acme/eslint-config`.

The `.eslintrc.js` file must be marked with the `root` property.

_See an example
in [./packages/ui/.eslintrc.js](./packages/ui/.eslintrc.js)_

### .stylelintrc.js

If needed, make sure the package configures this file extending the
`@acme/stylelint-config`.

The `.stylelintrc.js` file must be marked with the `root` property.

_See an example
in [./packages/ui/.stylelintrc.js](./packages/ui/.stylelintrc.js)_

### .stylelintignore

If needed, make sure the package has this file configured correctly.

_See an example
in [./packages/ui/.stylelintignore](./packages/ui/.stylelintignore)_
