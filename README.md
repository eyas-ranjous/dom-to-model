# dom-to-model

[![build:?](https://travis-ci.org/eyas-ranjous/dom-to-model.svg?branch=master)](https://travis-ci.org/eyas-ranjous/dom-to-model) [![npm](https://img.shields.io/badge/node-%3E=%2010.0-blue.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/v/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model) [![npm](https://img.shields.io/npm/dm/dom-to-model.svg)](https://www.npmjs.com/package/dom-to-model)

It acts like an API adapter for an existing website and allows reconstructing a data model from its page content by mapping DOM elements to user-defined models. It supports mapping a single model or collection, as well as recursive mapping for props that represent other models or collections.

<img width="860" alt="d" src="https://user-images.githubusercontent.com/6517308/101259731-3b4ec100-36f0-11eb-96b5-7662ea74b95c.png">

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
* [domToModel(url, modelMap)](#domtomodelurl-modelmap)
* [Build](#build)
* [License](#license)

## Install
```sh
npm install --save dom-to-model
```

## require
```js
const { domToModel } = require('dom-to-model');
```

## import
```js
import { domToModel } from 'dom-to-model';
```

## Intro
To use the library, you need to build your data model maps around an existing web page DOM. Each model has properties and each property holds a value that might be a primitive value (number, string, boolean), a list of values, an object (another model) or a list of models.

## Prop Map
Defines the model property map schema. It has 4 types:

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
defines the whole model map that composes model prop maps.

##### Schema
```json
{
  "mapType": "model",
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
  "mapType": "model",
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
defines a model collection map by using the same schema of a list prop combined with the model map.

##### Schema
```json
{
  "mapType": "collection",
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
  "mapType": "collection",
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

## domToModel(url, modelMap)
After building your model maps, you can use the library main function to load dom into models. It accepts the page url that contains the dom and a model json map.

#### Mapping a model
```js
const { domToModel } = require('dom-to-model');

const modelMap = require('./path_to_model_map.json');

const url = 'http://url_to_dom';

const model = await domToModel(url, modelMap);
```

#### Mapping a collection
```js
const { domToModel } = require('dom-to-model');

const collectionMap = require('./path_to_collection_map.json');

const url = 'http://url_to_dom';

const models = await domToModel(url, collectionMap);
```

#### Demo: Mapping imdb movies
I built a small demo for the project in <a target="_blank" href="https://github.com/eyas-ranjous/dom-to-model/blob/master/demo/index.js">here</a> you can use like below:

##### IMDB Movie Model

```js
const { demo: { imdbMovie } } = require('dom-to-model');

imdbMovie('https://www.imdb.com/title/tt0232500/');
```

will log

```sh
{
  id: 'tt0232500',
  title: 'The Fast and the Furious',
  originalTitle: null,
  year: 2001,
  description: "Los Angeles police officer Brian O'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.",
  duration: '1h 46min',
  releaseDate: '22 June 2001 (USA)',
  storyLine: "Los Angeles street racer Dominic Toretto falls under the suspicion of the LAPD as a string of high-speed electronics truck robberies rocks the area. Brian O'Connor, an officer of the LAPD, joins the ranks of Toretto's highly skilled racing crew undercover to convict Toretto. However, O'Connor finds himself both enamored with this new world and in love with Toretto's sister, Mia. As a rival racing crew gains strength, O'Connor must decide where his loyalty really lies.",
  boxOffice: {
    budget: '$38,000,000',
    oppeningWeekendUsa: '$40,089,015,',
    grossUsa: '$144,533,925'
  },
  cast: [
    { actor: 'Paul Walker', role: "Brian O'Conner" },
    { actor: 'Vin Diesel', role: 'Dominic Toretto' },
    { actor: 'Michelle Rodriguez', role: 'Letty' },
    { actor: 'Jordana Brewster', role: 'Mia Toretto' },
    { actor: 'Rick Yune', role: 'Johnny Tran' },
    { actor: 'Chad Lindberg', role: 'Jesse' },
    { actor: 'Johnny Strong', role: 'Leon' },
    { actor: 'Matt Schulze', role: 'Vince' },
    { actor: 'Ted Levine', role: 'Sgt. Tanner' },
    { actor: 'Ja Rule', role: 'Edwin' },
    { actor: 'Vyto Ruginis', role: 'Harry' },
    { actor: 'Thom Barry', role: 'Agent Bilkins' },
    { actor: 'Stanton Rutledge', role: 'Muse' },
    { actor: 'Noel Gugliemi', role: 'Hector' },
    { actor: 'R.J. de Vera', role: 'Danny Yamato' }
  ]
}
```

##### IMDB Movie Titles Collection

```js
const { demo: { imdbMovieTitles } } = require('dom-to-model');

imdbMovieTitles('https://www.imdb.com/search/title/?year=2019');
```

will log

```sh
 [
  {
    title: 'The Mandalorian',
    runtime: '40 min',
    description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.'
  },
  {
    title: 'The Boys',
    runtime: '60 min',
    description: 'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.'
  },
  {
    title: 'His Dark Materials',
    runtime: '60 min',
    description: "A young girl is destined to liberate her world from the grip of the Magisterium which represses people's ties to magic and their animal spirits known as daemons."
  },
  {
    title: 'Virgin River',
    runtime: '44 min',
    description: 'After seeing an ad for a midwife, a recently widowed big-city nurse moves to the redwood forests of northern California, where she meets an intriguing man.'
  },
  {
    title: 'Mosul',
    runtime: '101 min',
    description: 'A police unit from Mosul fight to liberate the Iraqi city from thousands of ISIS militants.'
  },
  {
    title: 'Knives Out',
    runtime: '130 min',
    description: 'A detective investigates the death of a patriarch of an eccentric, combative family.'
  },
  {
    title: 'The Witcher',
    runtime: '60 min',
    description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.'
  },
  // ...
```

## Build

```sh
grunt build
```

```sh
Running "eslint:src" (eslint) task

Running "nyc_mocha:target" (nyc_mocha) task


  domToModel(modelMap[, url])
    ✓ map dom to a model object (7508ms)
    ✓ map dom to a model collection (4761ms)
    ✓ throw an error if url is missing
    ✓ throw an error model map is missing
    ✓ throw an error model type is unknown

  .fetchDom(url)
    ✓ fetch dom of a page and resolve with jQuery (1247ms)

  mapCollection($, modelMap)
    ✓ throw an error if prop data map is not a valid scheme (85ms)
    ✓ map dom to a model object (97ms)

  mapProp/mapElementToValue(element, dataType, dataAttr)
    ✓ return null when element does not exist
    ✓ map an input element
    ✓ map a text element
    ✓ map an element with number value
    ✓ map an element with boolean value (157ms)
    ✓ map a prop from a data attribute

  mapModel($, modelMap[, element])
    ✓ throw an error if prop data map is not a valid scheme (44ms)
    ✓ map dom to a model object (311ms)

  mapPropToElement($, propMap)
    ✓ throw an error if prop data map is not a valid scheme (65ms)
    ✓ map a prop from a text element (44ms)
    ✓ map a prop from an input element (38ms)
    ✓ map a prop from a data attribute (80ms)
    ✓ map a prop from a list of elements to an array (48ms)
    ✓ return a prop to an empty array if list does not exist (47ms)
    ✓ maps a prop from an element


  23 passing (15s)

----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |      97 |    91.49 |     100 |    97.7 |                   
 domToModel.js        |   94.44 |    91.67 |     100 |   93.75 | 37                
 fetchDom.js          |     100 |      100 |     100 |     100 |                   
 mapCollection.js     |   92.86 |       75 |     100 |     100 | 24                
 mapElementToValue.js |     100 |      100 |     100 |     100 |                   
 mapModel.js          |     100 |      100 |     100 |     100 |                   
 mapPropToElement.js  |    97.3 |    88.24 |     100 |   96.88 | 79                
----------------------|---------|----------|---------|---------|-------------------

Done.
```

## License
The ISC License. Full License is [here](https://github.com/eyas-ranjous/dom-to-model/blob/master/LICENSE)
