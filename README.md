# Zanake

_noun_ **.** _swahili_ **.** **`zana`**

A tool set apart for a particular purpose.

> This project is a collection of utilities and / or helper functions, for web developement on primarily JavaScript projects. i.e both on the web & Node.js

<br/>
<br/>

## NRWL - NX

This project was built using [Nx](https://nx.dev) which helps developers build **💭 smart**, **⚡ fast** and **👐 extensible** build systems

[Nx Documentation](https://nx.dev)

<br/>

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are their core plugins:

-   [React](https://reactjs.org)
    -   `npm install --save-dev @nrwl/react`
-   Web (no framework frontends)
    -   `npm install --save-dev @nrwl/web`
-   [Angular](https://angular.io)
    -   `npm install --save-dev @nrwl/angular`
-   [Nest](https://nestjs.com)
    -   `npm install --save-dev @nrwl/nest`
-   [Next]https://nextjs.org/)
    -   `npm install --save-dev @nrwl/next`
-   [Express](https://expressjs.com)
    -   `npm install --save-dev @nrwl/express`
-   [Node](https://nodejs.org)
    -   `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

<br/>

## Scaffolding

> They allow you to create multiple applications and libraries in the same workspace.

| Plugin        | Command                       | Description     |
| :------------ | :---------------------------- | :-------------- |
| `@nrwl/react` | `nx g @nrwl/react:app my-app` | React SPA       |
| `@nrwl/react` | `nx g @nrwl/react:lib my-lib` | React component |

> You can also use any of the plugins above to generate libraries as well.

> Libraries are shareable across libraries and applications. They can be imported from `@zanake/my-lib`.

<br/>

## Generate a package to publish in [NPM](https://www.npmjs.com/) or [GitHub](https://docs.github.com/en/packages)

| Plugin       | Command                                                                  | Description        |
| :----------- | :----------------------------------------------------------------------- | :----------------- |
| `@nrwl/js`   | `nx generate @nrwl/js:lib <pkg> --publishable --importPath=@org/<pkg>`   | JavaScript Package |
| `@nrwl/node` | `nx generate @nrwl/node:lib <pkg> --publishable --importPath=@org/<pkg>` | NodeJS Package     |

> Add the `--buildable` flag to enable the build process for minification & other optimizations

<br/>

## Serve

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

<br/>

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

<br/>

## Unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

<br/>

## End-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

<br/>

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.
