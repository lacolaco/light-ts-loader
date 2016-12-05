# light-ts-loader

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

## Compatibilities (Tested Only)

- TypeScript 2.0
- webpack 2.1.0

## License

MIT
