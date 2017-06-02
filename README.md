# Mondongo

[![Greenkeeper badge](https://badges.greenkeeper.io/juliandavidmr/Mondongo.svg)](https://greenkeeper.io/)

A simple module for describe databases and collections of mongodb.

Feactures:

 * Describe databases
 * Connect to database
 * Get collections list

This is [on GitHub](https://github.com/juliandavidmr/Mondongo)

## Installation ##

```bash
$ [sudo] npm install mondongo --save

```

## Usage ##

```javascript
var mondongo = require('mondongo');

// Connection URL
var url = 'mongodb://localhost:27017/blog_db';

mondongo.describe(url).then((described) => {
  console.log("Output:\n", JSON.stringify(described, null, 4));
});
```

__Example output (json)__
```js
[
 {
   "collection": "entrada",  // collection name
   "keys": [
     "_id",
     "titulo",
     "cuerpo",
     "fondo",
     "resumen",
     "oculto",
     "eliminado",
     "categoria_entrada_ref",
     "entrada_usuario",
     "createdAt",
     "updatedAt"
    ],
    "count": 11,            // number of keys
    "describe": [{
       "key": "_id",
       "type": "object",    // type: object, string, number, boolean...
       "isID": true         // is an identifier? ==> true | false
       }, {
       "key": "titulo",
       "type": "string"
       }, {
       "key": "cuerpo",
       "type": "string"
       }, {
       "key": "fondo",
       "type": "string"
       }, {
       "key": "resumen",
       "type": "string"
       }, {
       "key": "oculto",
       "type": "boolean"
       }, {
       "key": "eliminado",
       "type": "boolean"
       }, {
       "key": "categoria_entrada_ref",
       "type": "object",
       "isID": true
       }, {
       "key": "entrada_usuario",
       "type": "object",
       "isID": true
       }, {
       "key": "createdAt",
       "type": "date"
       }, {
       "key": "updatedAt",
       "type": "date"
       }
     ]
   },
   ...   //others collections
]
```
