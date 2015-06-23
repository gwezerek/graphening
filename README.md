# Magic: The Graphening

## Global dependencies

* [NPM](https://nodejs.org/)
* [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Development

1. Run `npm install --global gulp && npm install` from the project directory
2. Run `gulp serve` to open and view the project at localhost:3000

## Deployment
1. `git subtree split --prefix output -b gh-pages`
2. `git push -f origin gh-pages:gh-pages`
3. `git branch -D gh-pages`
