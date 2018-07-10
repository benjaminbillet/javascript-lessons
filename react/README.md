# Typescript

A collection of examples for the React library.

## First step
In the `react` folder, run the following command for retrieving dependencies:

```
yarn
```

## How to run an example project
Go into a lesson folder and run webpack for transpiling the source code:
```
cd <lesson folder (e.g., 1-helloworld)>
yarn transpile
```
Then open `index.html` into your favorite web browser.

Note: webpack has a [dev-server module](https://github.com/webpack/webpack-dev-server) that can watch your code and reload it automatically while you are editing it. It also have a [HTML packager](https://github.com/jantimon/html-webpack-plugin) that can manage your HTML entry point.  
I did not include these modules in the lessons, in order to illustrate (i) the manual transpilation mechanism and (ii) the use of Javascript transpiled bundles into an actual HTML page. Adding these modules to the existing webpack configuration is left as an exercise to the reader ;)


## How to check types for an example project
```
cd <lesson folder (e.g., 1-helloworld)>
yarn typecheck
```
