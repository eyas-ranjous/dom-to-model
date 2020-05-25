# dom-to-model

[![build:?](https://travis-ci.org/node-work/dom-to-model.svg?branch=master)](https://travis-ci.org/node-work/dom-to-model) [![npm](https://img.shields.io/badge/node-%3E=%2010.0-blue.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/v/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/dm/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model)

allows reconstructing the data model of a web page by mapping its DOM elements to user-defined model maps. It supports mapping a single model or collection, as well as recursive mapping for props that represent other models or collections.

<img width="996" alt="diagram" src="https://user-images.githubusercontent.com/6517308/82834887-041d6e80-9e88-11ea-9c05-6f9564a40b65.png">

# Table of Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [API](#api)
  * [Prop Map](#construction)
    * [Value Prop Map](#valuemap)
    * [List Prop Map](#valuemap)
    * [Model Prop Map](#valuemap)
  * [Model Map](#start)
  * [ModelCollection Map](#stop)
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

## API

### PropMap

#### Value Prop Map

#### List Prop Map

#### Model Prop Map

### ModelMap

### ModelCollectionMap
