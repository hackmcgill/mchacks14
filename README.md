# [McHacks 14](https://mchacks.ca)

This repository contains the code behind the static site of McHacks 14.

## Setup

1. Make sure you have [node **v22**](https://nodejs.org/en/download) installed. You can check using `node -v`. 
    * It is recommended to install and use [node version manager (nvm)](https://www.nvmnode.com/guide/download.html).
    * If you have another standalone version of node installed, uninstall it or make sure that your shell calls the node from nvm and *not* the standalone one.
    * Run `nvm install 22`, then `nvm use 22`
    * If you want your default node version to be a different version, you can install that version and follow instructions [here](https://www.nvmnode.com/guide/usage.html#setting-a-default-node-js-version). Then you'll have to run `nvm use 22` when starting a terminal to run this repo.
2. Make sure you have [yarn](https://yarnpkg.com/lang/en/) installed. You can check using `yarn -v`. 
    * Once you have node installed, you can install/activate yarn by running `npm install -g corepack`
    * Make sure your yarn executables are on the PATH (check where the folder with executables is using `yarn global bin`)
3. Run `yarn global add gatsby-cli` to install Gatsby CLI locally.
4. Run `yarn` to install dependencies.
5. Make a `.env` file in the repo folder and add the variables:
    * `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` - the value can be found in a file in the 1Password
    * `PEOPLE_GOOGLE_SPREADSHEET_IDENTIFIER` - this is a Google Sheets spreadsheet ID, the value should be provided to you
6. Run `gatsby develop` / `yarn start` to start dev server! 🚀

## Scripts

**Start the development server:**

`yarn start` or `gatsby develop`

**Build the website:**

`yarn build` or `gatsby build`

**Start the production server:**

`yarn serve` or `gatsby serve`

**Format code:**

`yarn format`

## Folder Structure

    .
    ├── docs                    # Documentation files
    ├── public                  # Build and bundled files
    ├── src                     # Source files
    │   ├── components          # Page sections files
    │   ├── assets              # Assets files
    │   │   ├── fonts
    │   │   └── images
    │   └── pages               # Page files
    │   └── styles              # Style files
    ├── static                  # Unbundled assets

## Contributing

> Want to contribute to the McHacks site?

See our [contributing guide](https://github.com/hackmcgill/mchacks7/blob/develop/docs/CONTRIBUTING.md).

## Deployment

We are using Vercel to compile and host our code. When a PR is created, Vercel builds the site and generates a deploy preview to confirm everything is working as expected. Once code is merged to `main` branch, Vercel will promote the code to production at `mchacks.ca`. Vercel also handles the SSL certificate for this site.

### Domains

The domains for this site `mchacks.ca` and `mchacks.io` have their DNS with Cloudflare. `2025.mchacks.ca` has a CNAME record pointing to `cname.vercel-dns.com`.
