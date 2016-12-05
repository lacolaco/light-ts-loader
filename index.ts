import path = require("path");
import fs = require("fs");
import webpack = require("webpack");
import ts = require("typescript");

interface LoaderInstance {
    cacheable: () => void;
    async: () => (err: Error, source?: string, map?: string) => void;
    resourcePath: string;
}

let _config: any;

function loader(source: string) {
    const _loaderInstance: LoaderInstance = this;
    _loaderInstance.cacheable();
    const callback = _loaderInstance.async();
    const resourcePath = _loaderInstance.resourcePath;

    if (!_config) {
        _config = loadTsConfig(resourcePath);
        if (!_config) {
            callback(new Error("[light-ts-loader] tsconfig.json doesn't exist!"));
            return;
        }
    }

    try {
        const result = ts.transpileModule(source, _config);
        let sourceMap = result.sourceMapText;
        if (sourceMap) {
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

function loadTsConfig(path: string) {
    const configPath = ts.findConfigFile(path, ts.sys.fileExists);
    if (!configPath) {
        return undefined;
    }
    return ts.readConfigFile(configPath, ts.sys.readFile).config;
}

export = loader;
