## Nullboard Agent Express Port

This is a repo with the source code for a port of [Nullboard Agent (C++, Windows only)](https://github.com/apankrat/nullboard-agent) written in Express.js. See that repo for more details about Nullboard backups or the Nullboard project in general.

## Installation

#### Running on-demand:

Using `npx` you can run the script without installing it first:

    npx nullboard-agent

#### Globally via `npm`

    npm install --global nullboard-agent

This will install `nullboard-agent` globally so that it may be run from the command line anywhere.

#### Globally via Homebrew (pending)

    brew install nullboard-agent

## Usage

- Agent runs local backup server on port 10001
- Agent uses `/opt/nullboard-agent` as the backup directory

## License

The 2-clause BSD license.

## Feedback and contributions

This repo is maintained by @justinpchang, separate from the Nullboard project. Please open issues relating to the Nullboard Agent Express Port in this repository. Please direct all other Nullboard-related feedback to the appropriate repository ([Nullboard](https://github.com/apankrat/nullboard), [Nullboard Agent (C++)](https://github.com/apankrat/nullboard-agent)).
