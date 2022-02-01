# twdutl
Provide helper function for building tailwindcss utilities

 - Simple in use;
 - No dependency;
 - Has module & end-to-end tests;
 - Can create static utilities and dynamic utilities in one time;
 - Unpacked size only <packege_size>;
 - New features in developing now.

## Install it
For now plugin is available only via **[npm](https://www.npmjs.com/package/twdutl)**

    npm i twdutl -D

## Import it
You need to have ***tailwind.config.js*** file in your project. If you don't, follow the [tailwindcss documentation](https://tailwindcss.com/docs/configuration) and create it first.
Export ***twdutl*** function with destructuring

    const { twdutl } = require('twdutl')
Or just like object prop

    const twdutl = require('twdutl').twdutl
  
  And then add it to plugin array

    plugins: [
      twdutl([]),
      ...
      ...
    ]
#### !!!Be aware!!!
***twdutl*** is **NOT** a module, so you **can't** use `import` statement like this one

    import { twdutl } from 'twdutl'
It will cause `Cannot use import statement outside a module` error.

## How it works (theory)
Function accepts an array of objects with folowing model

    { 
       name: <string>,
       value: <string>,
       defaults: <array<string|number>|object<string|number,string|number>>,
       dynamic: Boolean,
    }
  where,
***Name and value*** - represents class name and it value as a common tailwindcss class. With using masks, you can provide dynamic values from `defaults` option.

    { 
       name: 'white-op-{v}',
       value: 'background-color: rgba(255, 255, 255, {v}%)'
    }

 ***Defaults*** - all possible default values created for utility. 
 Simple way is just create array of values

    { 
       defaults: [9, 18, 24]
    }
Or create object for more complex solutions

    {
      defaults: {
        255: 9,
        250: 18,
        245: 24
      }
    }
And change name and value props

    { 
       name: 'white-op-{k}',
       value: 'background-color: rgba(255, 255, {k}, {v}%)'
    }
***Dynamic*** - if set this flag to `true`, it let you use dynamic values inside your classes

    <div class="white-op-[15]"></div> <!-- background-color: rgba(255, 255, 255, 15%) -->
**Note!!!** For now you can use this feature only when ***defaults*** prop is array.

## Examples
