# Conway's Glimmer of Life

**Note: This is a work in progress.**

An implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using [Glimmer](https://glimmerjs.com/). Meant primarily as an exploration of building beautiful and performant visualization with Glimmer.

## Notes from Development

Tracking changes at a "chunky" level produces poor performance characteristics. In particular, treating entire generations (or "worlds" as implemented here) as immutable and replacing them with each "tick" leads to frequent busting of the frame rate.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd glimmer-of-life`
* `yarn`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* [glimmerjs](http://github.com/tildeio/glimmer/)
* [ember-cli](https://ember-cli.com/)
