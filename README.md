# GITLAB RELEASE NOTIFICATION
_A simple method to send notification reading a feed web_

## Technologies
* [Node](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [Google Apps Script](https://developers.google.com/apps-script/) _(You need a Google account)_
* [Docker](https://www.docker.com/) (optional for local environment)
* [VS Code](https://code.visualstudio.com/) (optional but recommended for local environment)

## Start Project

### Clone the project
```bash
git clone https://github.com/wagner-sousa/gitlab-release-notification.git
```

### Dependencies
**If** (you use the VS Code with Dev Containers)
- you don't need to install anything 😎

**Else**
After downloading the project, you need to install the dependencies:
```bash
npm install
```

## Setup Google Account
_This project uses the [clasp package](https://github.com/google/clasp) for managing Google Apps Script._

So, you need to setup your Google account, for that you need to run:
```bash
npm run login
```
This command will returns a link authentication.

_Probably, you need to authorize a [Google Apps Script API](https://script.google.com/home/usersettings) for you user account to continue._

***This is very important. Without this, you don't publish/deploy your script***

---
Case this you firt time, you need to read the [clasp package](https://github.com/google/clasp) documentation for a setup account and a create a new project.
