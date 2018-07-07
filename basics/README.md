# Javascript Basics

A collection of examples for the Javascript language, from basic things like comparison to advanced ES7 features like decorators.

## First step
In the `basics` folder, run the following command for retrieving dependencies:

```
yarn
```

## How to run one example file
```
yarn execute <name of the script (e.g., 1-arithmetic.js)>
```

## How to transpile all files to "common" Javascript
```
yarn transpile
```

All transpiled files goes to a folder called `generated`. Run a diff between two files to understand what kind of transformations the `babel` transpiler did:
```
diff <name of the script (e.g., 1-arithmetic.js)> generated/<name of the script (e.g., 1-arithmetic.js)>
```
