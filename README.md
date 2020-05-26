# dom-to-model

[![build:?](https://travis-ci.org/node-work/dom-to-model.svg?branch=master)](https://travis-ci.org/node-work/dom-to-model) [![npm](https://img.shields.io/badge/node-%3E=%2010.0-blue.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/v/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/dm/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model)

allows reconstructing a data model from a web page by mapping its DOM elements to user-defined model maps. It supports mapping a single model or collection, as well as recursive mapping for props that represent other models or collections.

<table><tr><td>
  <img width="1205" alt="d" src="https://user-images.githubusercontent.com/6517308/82850211-1071ed80-9ec1-11ea-9ec6-a0803af5e856.png">
</td></tr></table>

# Table of Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [Intro](#intro)
* [Prop Map](#prop-map)
  * [Value Prop Map](#value-prop-map)
  * [List Prop Map](#list-prop-map)
  * [Model Prop Map](#model-prop-map)
* [Model Map](#model-map)
* [ModelCollection Map](#modelcollection-map)
* [domToModel(modelMap[, url])](#domtomodelmodelmap-url)
* [Build](#build)
* [License](#license)

## Install
```sh
npm install --save dom-to-model
```

## require
```js
const domToModel = require('dom-to-model');
```

## import
```js
import domToModel from 'dom-to-model';
```

## Intro
To use the library, you need to build your data model maps to an existing web page dom elements. Each model has properties and each property holds a value that might be a primitive value (number, string, boolean), a list of values, an object (another model) or a list of models.

## Prop Map
Defines the model property map structure. It has 3 map types:

### Value Prop Map

```json
{
  "propType": "value",
  "map": {
    "dataType": "string|number|boolea",
    "path": "#someId .someClass",
    "dataAttr": "someName"
  }
}
```

### List Prop Map

A list of values

```json
{
  "propType": "list",
  "map": {
    "itemDataType": "string|number|boolean",
    "itemPath": "#someId .someClass",
    "dataAttr": "someName"
  }
}
```

A list of models

```json
{
  "propType": "list",
  "map": {
    "itemDataType": "model",
    "props": {
      "prop1": {
        "propType": "value",
        "map": {
          "dataType": "string",
          "path": "#someId .someClass"
        }
      }
    }
  }
}
```

### Model Prop Map
```json

```

## Model Map

## ModelCollection Map

## domToModel(modelMap[, url])

## Build

## License

