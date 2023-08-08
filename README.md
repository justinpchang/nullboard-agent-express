## Nullboard Agent Express Port

[![npm version](https://badge.fury.io/js/nullboard-agent-express.svg)](https://badge.fury.io/js/nullboard-agent-express)

This is a repo with the source code for a port of [Nullboard Agent (C++, Windows only)](https://github.com/apankrat/nullboard-agent) written in Express.js. See that repo for more details about Nullboard backups or the Nullboard project in general.

## Installation:

#### Running on-demand:

Using `npx` you can run the script without installing it first:

    npx nullboard-agent

#### Globally via `npm`:

    npm install --global nullboard-agent

This will install `nullboard-agent` globally so that it may be run from the command line anywhere.

#### Globally via Homebrew:

    brew tap justinpchang/nullboard-agent

## Usage:

#### Starting the server and getting your token:

```
nullboard-agent [command] [options]
```

Possible commands:

- `token` to retrive the token that the server is using
- `server` to start the agent server

Possible options:

- `-p` or `--port` signifies port to use. Use `-p 0` to look for an open port. Defaults to 10001.

Agent uses `/opt/nullboard-agent` as the backup directory.

#### Connecting to Nullboard:

- Navigate to Nullboard
- Open the Auto-backup menu from the top-right
- Select Local backup
- Add your token (retrieved from running `nullboard-agent token`) to the Access token field
- Click `Check...` and ensure that the connection is established
- Click `Save`

## License:

The 2-clause BSD license.

## Feedback and contributions:

This repo is maintained by @justinpchang, separate from the Nullboard project. Please open issues relating to the Nullboard Agent Express Port in this repository. Please direct all other Nullboard-related feedback to the appropriate repository ([Nullboard](https://github.com/apankrat/nullboard), [Nullboard Agent (C++)](https://github.com/apankrat/nullboard-agent)).
