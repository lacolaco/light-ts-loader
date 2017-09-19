import path = require("path");
import fs = require("fs");
import webpack = require("webpack");
import ts = require("typescript");

interface LoaderInstance {
  cacheable: () => void;
  async: () => (err: Error, source?: string, map?: string) => void;
  resourcePath: string;
  // from LoaderOptionsPlugin
  tsConfigPath?: string;
}

console.warn(`[light-ts-loader] Using typescript@${ts.version}`);

function loader(source: string) {
  const _loaderInstance: LoaderInstance = this;
  _loaderInstance.cacheable();
  const callback = _loaderInstance.async();
  const resourcePath = _loaderInstance.resourcePath;

  let tsConfig: ts.TranspileOptions;
  tsConfig = loadTsConfig(_loaderInstance.tsConfigPath);
  if (!tsConfig) {
    callback(new Error("[light-ts-loader] tsconfig.json doesn't exist!"));
    return;
  }

  try {
    const result = ts.transpileModule(source, {
      compilerOptions: tsConfig.compilerOptions
    });
    let sourceMap = result.sourceMapText;
    if (sourceMap) {
      result.outputText = result.outputText.replace(
        /^\/\/# sourceMappingURL=[^\r\n]*/gm,
        ""
      );
      sourceMap = fixSourceMapForWebpack(sourceMap, resourcePath);
      callback(null, result.outputText, sourceMap);
    } else {
      callback(null, result.outputText);
    }
  } catch (error) {
    callback(error);
  }
}

function fixSourceMapForWebpack(baseSourceMap: string, filePath: string) {
  const sourceMapObj: any = JSON.parse(baseSourceMap);
  sourceMapObj.sources = [filePath];
  sourceMapObj.file = filePath;
  return sourceMapObj;
}

const _tsConfigFileMap: { [key: string]: any } = {};

function loadTsConfig(tsConfigPath: string) {
  const defaultTsConfigPath = path.resolve("tsconfig.json");
  tsConfigPath = tsConfigPath || defaultTsConfigPath;

  if (_tsConfigFileMap[tsConfigPath]) {
    return _tsConfigFileMap[tsConfigPath];
  }

  if (ts.sys.fileExists(tsConfigPath)) {
    const config = ts.readConfigFile(tsConfigPath, ts.sys.readFile).config;
    _tsConfigFileMap[tsConfigPath] = config;
    return config;
  } else if (ts.sys.fileExists(defaultTsConfigPath)) {
    const config = ts.readConfigFile(defaultTsConfigPath, ts.sys.readFile)
      .config;
    _tsConfigFileMap[defaultTsConfigPath] = config;
    return config;
  } else {
    return undefined;
  }
}

export = loader;
