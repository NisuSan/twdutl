# twdutl [![CircleCI](https://circleci.com/gh/NisuSan/twdutl.svg?style=shield)](https://circleci.com/gh/NisuSan/twdutl)
Provide helper function for building tailwindcss utilities

 - Simple in use;
 - No dependency;
 - Has module & end-to-end tests;
 - Can create static utilities and dynamic utilities in one time;
 - Unpacked size only ~ 5kB;
 - New features in developing now.

## Install it
For now plugin is available only via **[npm](https://www.npmjs.com/package/twdutl)**

```
$ npm i twdutl -D
```

## Import it
You need to have ***tailwind.config.js*** file in your project. If you don't, follow the [tailwindcss documentation](https://tailwindcss.com/docs/configuration) and create it first.
Export ***twdutl*** function with destructuring

```javascript
const { twdutl } = require('twdutl')
```

Or just like object prop

```javascript
const twdutl = require('twdutl').twdutl
```
  
And then add it to plugins array

```javascript
plugins: [
  twdutl([]),
  ...
  ...
]
```

#### !!!Be aware!!!
***twdutl*** is **NOT** a module, so it **should not be used** with `import` statement

```javascript
import { twdutl } from 'twdutl' // will not work
```

It will cause `Cannot use import statement outside a module` error.


## Use it

Function accepts an array of objects with folowing model

```javascript
{ 
   name: <string>,
   value: <string>,
   defaults: <array<string|number>>,
   dynamic: Boolean,
}
```

where,
***Name and value*** - represents class name and it value as a common tailwindcss class. With using masks, you can provide dynamic values from `defaults` option.

```javascript
{ 
   name: 'white-op-{v}',
   value: 'background-color: rgba(255, 255, 255, {v}%)'
}
```

***Defaults*** - array of the all possible default values created for utility. 

```javascript
{ 
   defaults: [9, 18, 24]
}
```

***Dynamic*** - if set this flag to `true`, it let you use dynamic values inside your classes

```html
<div class="white-op-[15]"></div> <!-- converts to: background-color: rgba(255, 255, 255, 15%) -->
```
