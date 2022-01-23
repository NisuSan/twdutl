const plugin = require('tailwindcss/plugin')

function replaceKeys(str, k, v) {
  if(!str && typeof str !== 'string') throw TypeError('Argument {str} should be of type <string>')
  if(!k && str.includes('{k}')) throw Error('Argument {k} should be defined, because argument {str} contains this key')
  if(!v && str.includes('{v}')) throw Error('Argument {v} should be defined, because argument {str} contains this key')

  const mapObj = { '{k}': k, '{v}': v }
  var re = new RegExp(Object.keys(mapObj).join('|'),'gi')
  return str.replace(re, matched => mapObj[matched.toLowerCase()])
}

function turnToObject(str) {
  if(!str && typeof str !== 'string') throw TypeError('Argument {str} should be of type <string>')
  if(str.split(':').length - 1 != 1) throw Error('Argument {str} should match the <key>:<value> schema')

  const [k, v] = str.split(':')
  return { [k.trim()]: v.trim() }
}

function trimForDynamic(str) {
  if(!str && typeof str !== 'string') throw TypeError('Argument {str} should be of type <string>')

  const regex = /((-)?{.}(-)?)/gm
  return str.replace(regex, '').trim()
}

function compileCss(opName, opVal, k, v) {
  if(!opName && typeof opName !== 'string') throw TypeError('Option {name} should be of type <string>')
  if(!opVal && (typeof opVal !== 'object' || typeof opVal !== 'string')) throw TypeError('Option {value} should be of type <string> or <object>')

  return { [`.${replaceKeys(opName, k, v)}`]: turnToObject(replaceKeys(opVal, k, v)) }
}

function compileCssInvoker(isArray, opName, opVal) {
  return isArray ? (v, k) => compileCss(opName, opVal, k, v) : ([k, v]) => compileCss(opName, opVal, k, v)
}

const twdutl = function (options) {   
  return plugin(function({ addUtilities, matchUtilities }) {
    const staticUtilities = []

    for (const op of options) {
      const isArray = Array.isArray(op.defaults)

      const localUtl = (isArray ? op.defaults : Object.entries(op.defaults)).map(compileCssInvoker(isArray, op.name, op.value))
      staticUtilities.push(localUtl)

      if(op.dynamic) matchUtilities({
        [trimForDynamic(op.name)]: v => turnToObject(replaceKeys(op.value, '', v))
      })
    }

    addUtilities(staticUtilities)
  })
}

module.exports = {
  twdutl,
  replaceKeys,
  turnToObject,
  trimForDynamic,
  compileCss
}
