# dom-to-model

[![build:?](https://travis-ci.org/node-work/dom-to-model.svg?branch=master)](https://travis-ci.org/node-work/dom-to-model) [![npm](https://img.shields.io/badge/node-%3E=%2010.0-blue.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/v/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/dm/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model)

allows reconstructing a data model from a web page by mapping its DOM elements to user-defined models. It supports mapping a single model or collection, as well as recursive mapping for props that represent other models or collections.

<img width="860" alt="d" src="https://user-images.githubusercontent.com/6517308/82919798-1a850200-9f3c-11ea-874a-50ef723b23b2.png">

# Table of Contents
* [Install](#install)
* [require](#require)
* [import](#import)
* [Intro](#intro)
* [Prop Map](#prop-map)
  * [Value Prop Map](#value-prop-map)
  * [List Prop Map](#list-prop-map)
  * [Nested Model Prop Map](#nested-model-prop-map)
  * [Nested Model Collection Prop Map](#nested-model-collection-prop-map)
* [Model Map](#model-map)
* [Model Collection Map](#model-collection-map)
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
To use the library, you need to build your data model maps around an existing web page DOM. Each model has properties and each property holds a value that might be a primitive value (number, string, boolean), a list of values, an object (another model) or a list of models.

## Prop Map
Defines the model property map schema. It has 4 map types:

### Value Prop Map

map prop to the content of an element

##### Schema
```json
{
  "propType": "value",
  "map": {
    "dataType": "string|number|boolean",
    "path": "#some-id .some-class"
  }
}
```

##### Example

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

map prop to a data attribute

##### Schema
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

##### Example

```html
<span id="test" data-content="1234">test data</span>
```

```json
{
  "propType": "value",
  "map": {
    "dataType": "number",
    "path": "#test",
    "dataAttr": "content"
  }
}
```

### List Prop Map

map a prop to a list of values

##### Schema
```json
{
  "propType": "list",
  "map": {
    "itemDataType": "string|number|boolean",
    "itemPath": "#someId .someClass"
  }
}
```

##### Example

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

### Nested Model Prop Map

a model prop can be another model

##### Schema
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

##### Example

```html
<div class="employee">
  <span class="name">some name</span>
  <span class="age">33</span>
</div>
```

```json
{
  "propType": "model",
  "map": {
    "props": {
      "name": {
        "propType": "value",
        "map": {
          "dataType": "string",
          "path": ".employee .name"
        }
      },
      "age": {
        "propType": "value",
        "map": {
          "dataType": "number",
          "path": ".employee .age"
        }
      }
    }
  }
}
```

### Nested Model Collection Prop Map

a model prop can be a collection of other models.

##### Schema
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

##### Example

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

## Model Map
defines the whole model map that composes model props maps.

##### Schema
```json
{
  "url": "http://optiona-url-for-web-page",
  "modelType": "single",
  "props": {
    "propName1": {
      "propType": "value",
      "map": {
        /* value prop map */
      }
    },
    "propName2": {
      "propType": "list",
      "map": {
        /* list prop map */
      }
    }
  }
}
```

##### Example

```html
<ul class="employee">
  <span class="name">employee name</span>
  <span class="age">33</span>
  <ul class="promotions">
    <li>promotion 1</li>
    <li>promotion 2</li>
    <li>promotion 3</li>
  </ul>
</ul>
```

```json
{
  "url": "http://optional-url-for-web-page",
  "modelType": "single",
  "props": {
    "name": {
      "propType": "value",
      "map": {
        "dataType": "string",
        "path": ".employee .name"
      }
    },
    "age": {
      "propType": "value",
      "map": {
        "dataType": "number",
        "path": ".employee .age"
      }
    },
    "promotions": {
      "propType": "list",
      "map": {
        "itemDataType": "string",
        "itemPath": ".employee ul.promotions li"
      }
    }  
  }
}
```

## Model Collection Map
defines a model collection map by using the same schema of a list prop combined with the model map schema.

##### Schema
```json
{
  "url": "http://optiona-url-for-web-page",
  "modelType": "collection",
  "itemPath": "#path-to-collection-model-item",
  "itemMap": {
    "props": {
      "propName1": {
        "propType": "value",
        "map": {
          /* value prop map */
        }
      },
      "propName2": {
        "propType": "list",
        "map": {
          /* list prop map */
        }
      }
    }
  }
}
```

##### Example

```html
<ul class="employees">
  <li class="employee">
    <span class="name">employee 1</span>
    <span class="age">33</span>
  </li>
  <li class="employee">
    <span class="name">employee 2</span>
    <span class="age">44</span>
  </li>
  <li class="employee">
    <span class="name">employee 3</span>
    <span class="age">55</span>
  </li>
</ul>
```

```json
{
  "url": "http://optional-url-for-web-page",
  "modelType": "collection",
  "itemPath": "ul.employees li.employee",
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
```

## domToModel(modelMap[, url])

## Build

## License

