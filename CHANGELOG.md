# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/arlophoenix/ts-toolkit/compare/v5.0.0...master)

## [v5.0.0](https://github.com/arlophoenix/ts-toolkit/compare/v4.1.0...v5.0.0) - 2019-04-19

### BREAKING CHANGE

- major version bump to eslint-config-airbnb-typescript

### Changed

- newFile command now opens files on creation

## [v4.1.0](https://github.com/arlophoenix/ts-toolkit/compare/v4.0.1...v4.1.0) - 2019-04-19

### Added

- newFile command for creating file and test partner

## [v4.0.1](https://github.com/arlophoenix/ts-toolkit/compare/v4.0.0...v4.0.1) - 2019-04-18

### Changed

- dependabot now increases versions in package json to ensure downstream projects are on the latest

## [v4.0.0](https://github.com/arlophoenix/ts-toolkit/compare/v3.0.3...v4.0.0) - 2019-04-18

### BREAKING CHANGE

- major version bump to eslint-config-airbnb-typescript

## [v3.0.3](https://github.com/arlophoenix/ts-toolkit/compare/v3.0.2...v3.0.3) - 2019-04-18

### Changed

- update dependencies

## [v3.0.2](https://github.com/arlophoenix/ts-toolkit/compare/v3.0.1...v3.0.2) - 2019-04-10

### Changed

- add ability to run related tests as task in vscode

## [v3.0.1](https://github.com/arlophoenix/ts-toolkit/compare/v3.0.0...v3.0.1) - 2019-04-10

### Changed

- fix prettier ignore

## [v3.0.0](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.19...v3.0.0) - 2019-04-10

### BREAKING CHANGE

- added .eslintignore file (previously used .gitignore command line arguments) for better support in VSCode. Run `tsk install` after upgrading.

### Changed

- update dependencies

## [v2.1.19](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.18...v2.1.19) - 2019-04-07

### Changed

- lint rules to allow abbreviations in variable names
- update typescript

## [v2.1.18](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.17...v2.1.18) - 2019-04-04

### Changed

- eslint jest globals only apply to test files
- remove requirement for return types on inline arrow functions

## [v2.1.17](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.16...v2.1.17) - 2019-04-04

### Changed

- Fix warning about unsupported typescript eslint parser

## [v2.1.16](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.15...v2.1.16) - 2019-04-03

### Changed

- Fix VSCode test tasks

## [v2.1.6 to v2.1.15](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.5...v2.1.15) - 2019-04-02

### Changed

- Only publish on tagged commits
- Updated babel dependencies

## [v2.1.5](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.4...v2.1.5) - 2019-04-02

### Changed

- Include both config and built code in published package :blush: Really fixes `install`

## [v2.1.4](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.3...v2.1.4) - 2019-04-02

### Changed

- Stop excluding config files from published package... Fixes `install`

## [v2.1.3](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.2...v2.1.3) - 2019-04-02

### Changed

- Fix publish in circle CI

## [v2.1.2](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.1...v2.1.2) - 2019-04-02

### Changed

- Fix build command in package.json

## [v2.1.1](https://github.com/arlophoenix/ts-toolkit/compare/v2.1.0...v2.1.1) - 2019-04-02

### Changed

- Removed private flag so the package can be published on npm

## [v2.1.0](https://github.com/arlophoenix/ts-toolkit/compare/v2.0.0...v2.1.0) - 2019-04-02

### Added

- Publish from CI when version changes

### Changed

- Fixed reporting artifacts in CI

## [v2.0.0](https://github.com/arlophoenix/ts-toolkit/compare/v1.0.0...v2.0.0) - 2019-04-02

### Breaking Change

- Updated dependencies
  - eslint-plugin-unicorn 7->8
  - typescript
  - jest
  - babel
  - eslint

### Added

- changelog

## [v1.0.0] - 2019-04-02

### Added

- Everything!
