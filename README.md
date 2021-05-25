# CEPTO Web Application
Clone this repository to your machine.
Then go to the repository dirctory on your mahcine in a terminal.
If you don't already have `node.js` and `npm` installed, you'll need that first. You can find documentation here [nodejs.org](nodejs.org).

To install all dependencies run
```
npm install
```
Then to build the application run
```
npm run build
```
If you do not already have the `npm serve` package install it with
```
npm install -g serve
```
When the application has finished building you can serve it locally with
```
serve -s dist
```
By default the application will be available at [localhost:5000](http://localhost:5000/).
But you can change the port with the `-l` flag as such
```
server -s dist -l <port>
```

# Command Short List

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
