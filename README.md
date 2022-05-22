# solid-experience

## Usage

duplicate and rename .env.example to .env

Those templates dependencies are maintained via [yarn]

This is the reason you see a `yarn.lock`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ yarn install # or pnpm install or npm install
```
### This boilerplate, uses for the generation of views, solid.js [Solid Website](https://solidjs.com)

## Available Scripts

In the project directory, you can run:

### `yarn dev` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `yarn run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid Experience in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!


## Mock server with json-server

install mock server dependencies
```bash
cd json-server && yarn
```

run server
```bash
cd json-server && yarn server
```

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)


Each feature is divided:

- Auth
- Role
- User
- Shared

The directory structures for business domains are as follows: 

**Folder structure of a module**

```sh 
├── assets
├── config
├── features
│   └── [your_domain/feature]
│      ├── constants
│      ├── helper
│      ├── hooks
│      ├── interfaces
│      ├── organisms
│      ├── repositories
│      ├── templates
│      ├── utils
│      └── validations
├── Pages
│   ├── domain
│   ├── error
│   └── spinner
├── App.tsx
└── services
 ```

---

As it is only a boilerplate, you have the freedom to structure the code whatever you want.

In this project you will find:

Basic authentication and authorization (http only cookies)
Language i18n (solid-i18n)
Sort and Filters
Http repositories (axios)
CRUD with form validations (solid-js-form, yup)
Permissions for dom elements (cash-dom)
Routing (solid-app-router)


## Husky
### Husky is available to run pre-commits, which check syntax with eslint and types with ts

```bash
yarn husky:init
```

```bash
yarn prepare
```
restore .husky/pre-commit

```bash
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```