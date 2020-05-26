# dom-to-model

[![build:?](https://travis-ci.org/node-work/dom-to-model.svg?branch=master)](https://travis-ci.org/node-work/dom-to-model) [![npm](https://img.shields.io/badge/node-%3E=%2010.0-blue.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/v/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/dm/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model)

allows reconstructing a data model from a web page by mapping its DOM elements to user-defined model maps. It supports mapping a single model or collection, as well as recursive mapping for props that represent other models or collections.

<img width="1000" alt="d" src="https://user-images.githubusercontent.com/6517308/82850211-1071ed80-9ec1-11ea-9ec6-a0803af5e856.png">

# Table of Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [Intro](#intro)
* [Prop Map](#prop-map)
  * [Value Prop Map](#value-prop-map)
  * [Model Prop Map](#model-prop-map)
  * [List Prop Map](#list-prop-map)
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
To use the library, you need to build your data model maps around an existing web page DOM. Each model has properties and each property holds a value which might be a primitive value (number, string, boolean), a list of values, an object (another model) or a list of models.

## Prop Map
Defines the model property map structure. It has 3 map types:

### Value Prop Map

To map prop to the content of an element

**Map**
```json
{
  "propType": "value",
  "map": {
    "dataType": "string|number|boolean",
    "path": "#some-id .some-class"
  }
}
```

#### Example

```html
<span id="test1234">test data</span>
```

```json
{
  "propType": "value",
  "map": {
    "dataType": "string",
    "path": "#test1234"
  }
}
```

To map prop to a data attribute

**Map**
```json
{
  "propType": "value",
  "map": {
    "dataType": "string|number|boolean",
    "path": "#some-id .some-class",
    "dataAttr": "some-name"
  }
}
```

#### Example

```html
<span id="test" data-id="1234">test data</span>
```

```json
{
  "propType": "value",
  "map": {
    "dataType": "number",
    "path": "#test",
    "dataAttr": "id"
  }
}
```

### Model Prop Map

To map a prop to another model

**Map**
```json
{
  "propType": "model",
  "map": {
    "props": {
      "prop1": {
        /* value, model or list map */
      },
      "prop2": {
        /* value, model or list map */
      }
    }
  }
}
```

#### Example


### List Prop Map

To map a prop to a list of values

**Map**
```json
{
  "propType": "list",
  "map": {
    "itemDataType": "string|number|boolean",
    "itemPath": "#someId .someClass"
  }
}
```

#### Example

```html
<ul id="test">
  <li>val 1</li>
  <li>val 2</li>
  <li>val 3</li>
</ul>
```

```json
{
  "propType": "list",
  "map": {
    "itemDataType": "string",
    "itemPath": "ul#test li"
  }
}
```

To map a prop to a list of models

```json
{
  "propType": "list",
  "map": {
    "itemDataType": "model",
    "itemPath": "#somePath",
    "itemMap": {
      "props": {
        "propName": {
          "propType": "value",
          "map": {
            "dataType": "string",
            "path": "#someId .someClass"
          }
        }
      }
    }
  }
}
```

#### Example

```html
<ul class="employees">
  <li>
    <span class="name">employee 1</span>
    <span class="age">33</span>
  </li>
  <li>
    <span class="name">employee 2</span>
    <span class="age">44</span>
  </li>
  <li>
    <span class="name">employee 3</span>
    <span class="age">55</span>
  </li>
</ul>
```

```json
{
  "propType": "list",
  "map": {
    "itemDataType": "model",
    "itemPath": "ul.employees li",
    "itemMap": {
      "props": {
        "name": {
          "propType": "value",
          "map": {
            "dataType": "string",
            "path": ".name"
          }
        },
        "age": {
          "propType": "value",
          "map": {
            "dataType": "number",
            "path": ".age"
          }
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

