# Typescript Toolkit

[![Build](https://circleci.com/gh/arlophoenix/ts-toolkit/tree/master.svg?style=svg)](https://circleci.com/gh/arlophoenix/ts-toolkit/tree/master) [![Version](https://img.shields.io/npm/v/ts-toolkit.svg?style=flat-square)](https://www.npmjs.com/package/ts-toolkit?activeTab=versions) [![License](https://img.shields.io/github/license/arlophoenix/ts-toolkit.svg?style=flat-square)](https://github.com/arlophoenix/ts-toolkit/blob/master/LICENSE)

Get a project up and running with Typescript. Includes Typescript, Babel, Jest, ESLint, Prettier, CircleCI, VSCode config and more.

## Usage

Provides a binary `tsk` with a range of useful commands including `build`, `format`, `test`. For the full list run `yarn tsk --help`.

### Adding to new project

```bash
  yarn add --dev ts-toolkit
  yarn tsk install
```

This will add the dependencies and copy over necessary config files.

### Updating in existing project

```bash
  yarn tsk uninstall
  yarn add --dev ts-toolkit
  yarn tsk install
```

## Contributing

- Feedback welcome.
- PRs welcome.
- Everyone welcome.

## Publish

Automatically published to npmjs when a version bump is detected by CI.

`yarn version`

## Credits

Thank you to all [contributors](https://github.com/arlophoenix/ts-toolkit/graphs/contributors).

## License

Open-source under the [MIT License](LICENSE.md)
