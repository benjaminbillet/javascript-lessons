# Typescript

A collection of examples for the Typescript language (a statically-typed superset of Javascript).

## First step
In the `typescript` folder, run the following command for retrieving dependencies:

```
yarn
```

## How to run one example file
```
yarn execute <name of the script (e.g., 1-arithmetic.js)>
```

## How to check types for all example files
```
yarn typecheck
```

## How to transpile all files to "common" Javascript
```
yarn transpile
```

All transpiled files goes to a folder called `generated`. Run a diff between two files to understand what kind of transformations the `tsc` transpiler did:
```
diff <name of the script (e.g., 1-arithmetic.js)> generated/<name of the script (e.g., 1-arithmetic.js)>
```

You will see that all typescript-specific code is gone; typescript is used only for type-checking at compile-time.
