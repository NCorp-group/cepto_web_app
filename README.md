# Cloning the Repository
Open your preferred terminal and navigate to the directory where you want to clone the repository.<br>
You can clone the repository with
```
git clone https://github.com/NCorp-group/cepto_web_app.git
```

# Installation & Deployment
Go to the repository dirctory on your mahcine in a terminal.<br>
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
It is recommended to use the listen flag `-l` to change the port, since the server also runs on port `5000` by default, this can be done by executing the following command
```
server -s dist -l <port>
```
*If you want to deploy the application elsewhere you can do so by deploying the `./dist` folder. Though do be aware that the application is set up to communicate with the server on `localhost:5000`, which is likely not possible to connect with from external hosts. You can change the server location IP at [`./src/main.js:28`](https://github.com/NCorp-group/cepto_web_app/blob/c3cfef438862b898c9a0f692c0dee5cfe9484d33/src/main.js#L28) and the port at [`./src/main.js:29`](https://github.com/NCorp-group/cepto_web_app/blob/c3cfef438862b898c9a0f692c0dee5cfe9484d33/src/main.js#L29).*

# Usage
When the web application is up and running, you can log into the site with the mock account of `username: caregiver` and `password: caregiver`, which will give you access to all logs in the database if you are running the CEPTO server on your own machine. See how to set up and run the server through the main repository at [https://github.com/NCorp-group/CEPTO](https://github.com/NCorp-group/CEPTO).

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
