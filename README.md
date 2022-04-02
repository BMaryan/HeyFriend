# Hey Friend

<!-- <p align="center">
  <img src="https://media.heyauto.com/media/dotbot.png" alt="dotbot" width="500" />
</p>
<p align="center">
  <strong>Simple. Trusted. Car Buying</strong>
</p>
<br />
<p align="center">
  <a href="https://heyauto.com/">
    <img alt="https://heyauto.com/" src="https://img.shields.io/website?down_color=red&down_message=down&up_color=yellow&up_message=up&url=https%3A%2F%2Fheyauto.com">
  </a>
    <a href="https://heyauto.com/">
    <img alt="https://heyauto.com/" src="https://app.codacy.com/project/badge/Grade/cc3fa6ac19674ce6aedbd0f501491998">
  </a>
</p> -->

- [heyfriend](#heyfriend)
  - [Quick Start](#quick-start)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Run the apps!](#2-run-the-apps)
  - [Structure](#structure)
    - [1. Build all packages](#1-build-all-packages)
 
 Running the `npm` command in the root directory of the project will install all top level dependencies.

The root directory has a `package.json` which contains build-related dependencies for tasks including:

 
## Quick Start

Below is a quick start guide for setting up and running the HeyFriend development environment.

### 1. Clone the Repository

> <https://github.com/BMaryan/HeyFriend>

Ensure that the heyfriend code repository is present on your machine. Either follow the link above and select the code dropdown for the ssh and html links or run one of the following commands:

```bash
  git clone https://github.com/BMaryan/HeyFriend.git
```

```bash
  git clone git@github.com:BMaryan/HeyFriend.git
```

```bash
  gh repo clone BMaryan/HeyFriend
```


### 1. Install all `node_modules`

Running the npm command in the root directory of the project will install all top level dependencies.

The root directory has a package.json which contains build-related dependencies for tasks including:

```bash
npm init
```

### 2. Run the apps!

```bash
npm start
```

## Structure

This structure is used in heyfriend. This structure helps to better interact with the site.

```bash
social_network/
├── src/ 
    ├── assets/
    ├── components/
    ├── core/
    ├── defaultsAccounts/
    ├── hoc/ 
    ├── redux/
    ├── utils/
```

### 1. Build all packages

While still in the root directory running `npm build` will run a global build of local dependencies.

This process can take a few minutes.
