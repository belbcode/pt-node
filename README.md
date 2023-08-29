oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pt
$ pt COMMAND
running command...
$ pt (--version)
pt/0.0.0 linux-x64 node-v18.16.1
$ pt --help [COMMAND]
USAGE
  $ pt COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pt hello PERSON`](#pt-hello-person)
* [`pt hello world`](#pt-hello-world)
* [`pt help [COMMANDS]`](#pt-help-commands)
* [`pt plugins`](#pt-plugins)
* [`pt plugins:install PLUGIN...`](#pt-pluginsinstall-plugin)
* [`pt plugins:inspect PLUGIN...`](#pt-pluginsinspect-plugin)
* [`pt plugins:install PLUGIN...`](#pt-pluginsinstall-plugin-1)
* [`pt plugins:link PLUGIN`](#pt-pluginslink-plugin)
* [`pt plugins:uninstall PLUGIN...`](#pt-pluginsuninstall-plugin)
* [`pt plugins:uninstall PLUGIN...`](#pt-pluginsuninstall-plugin-1)
* [`pt plugins:uninstall PLUGIN...`](#pt-pluginsuninstall-plugin-2)
* [`pt plugins update`](#pt-plugins-update)

## `pt hello PERSON`

Say hello

```
USAGE
  $ pt hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/belbcode/ptnode/blob/v0.0.0/dist/commands/hello/index.ts)_

## `pt hello world`

Say hello world

```
USAGE
  $ pt hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ pt hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [dist/commands/hello/world.ts](https://github.com/belbcode/ptnode/blob/v0.0.0/dist/commands/hello/world.ts)_

## `pt help [COMMANDS]`

Display help for pt.

```
USAGE
  $ pt help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for pt.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.17/src/commands/help.ts)_

## `pt plugins`

List installed plugins.

```
USAGE
  $ pt plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ pt plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/index.ts)_

## `pt plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ pt plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ pt plugins add

EXAMPLES
  $ pt plugins:install myplugin 

  $ pt plugins:install https://github.com/someuser/someplugin

  $ pt plugins:install someuser/someplugin
```

## `pt plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ pt plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ pt plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/inspect.ts)_

## `pt plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ pt plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ pt plugins add

EXAMPLES
  $ pt plugins:install myplugin 

  $ pt plugins:install https://github.com/someuser/someplugin

  $ pt plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/install.ts)_

## `pt plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ pt plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ pt plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/link.ts)_

## `pt plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pt plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pt plugins unlink
  $ pt plugins remove
```

## `pt plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pt plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pt plugins unlink
  $ pt plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/uninstall.ts)_

## `pt plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ pt plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ pt plugins unlink
  $ pt plugins remove
```

## `pt plugins update`

Update installed plugins.

```
USAGE
  $ pt plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.2.6/src/commands/plugins/update.ts)_
<!-- commandsstop -->
