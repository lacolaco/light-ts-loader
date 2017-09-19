# light-ts-loader

[![npm version](https://badge.fury.io/js/light-ts-loader.svg)](https://badge.fury.io/js/light-ts-loader)
[![CircleCI](https://circleci.com/gh/lacolaco/light-ts-loader/tree/master.svg?style=svg)](https://circleci.com/gh/lacolaco/light-ts-loader/tree/master)

:zap: Light weight & Lightning fast TypeScript Loader :zap:

## Concepts

- **No Dependencies** => Light weight package
- **No Type-checking** => Lightning fast bundling
- **No Magic** => Easy to contribute :)

`light-ts-loader` does **NOT** run type-checking at bundling.
That can reduce bundling time much, but usually you must execute type-cheking as other task. 
`tsc --noEmit` command is recommended solution for that. 

## Installation

```
$ npm install -D light-ts-loader
```

## How to use

```js
module: {
    rules: [
        { test: /\.ts$/, loader: "light-ts-loader" },
    ],
},
```

## Configuration

```js
plugins: [
    new webpack.LoaderOptionsPlugin({
        // use `path.resolve("tsconfig.json")` by default.
        tsConfigPath: "path/to/your/tsconfig.json", 
    })
],
```

## Compatibilities (Tested versions)

- TypeScript 2.5
- webpack 3.6

## License

MIT
