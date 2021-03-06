## Using it
The template uses webpack as build tool to serve files and run tests. The following commands are available:

```bash
# Start for development
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Run the unit tests continuously (repeat the test when code changes are saved)
npm run test:watch

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy
```

You can also use your globally installed version of webpack like this:

```bash
# Build or run the dev version:
webpack
webpack --env=dev

webpack-dev-server
webpack-dev-server --env=dev

# Build or run the dist version
webpack --env=dist
webpack-dev-server --env=dist
```

## Including third party modules (e.g. from npm)
The default setting for the webpack configuration is to only include the ```src``` and ```test``` directories. If you want to add any modules from npm, you have to add them in ```cfg/base.js```. One example is:

```javascript
// Somewhere on top of the file:
let npmBase = path.join(__dirname, '../node_modules');
let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
```

All entries added to the additionalPaths array will be appended to the include path for babel.

## A note on unit testing
When running tests, coverage information (provided via Istanbul) will also be written into the ```coverage/``` directory. If you do not need this, just comment out or remove the section in ```karma.conf``` like this:

```javascript
/* do not use coverage reporting!
coverageReporter: {
  type: 'html',
  dir: 'coverage/'
}*/
```

Also, you should adjust your webpack test configuration (located in ```cfg/test.js```) to reflect this:

```javascript
/* Uncomment this to prevent loading via isparta
{
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  include: [
    path.join(__dirname, '/../src')
  ],
  loader: 'isparta'
}*/
```

## License
based on https://github.com/react-webpack-generators/react-webpack-template