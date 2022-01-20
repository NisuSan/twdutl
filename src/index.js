const plugin = require('tailwindcss/plugin')

function replaceAll(str, k, v) {
  const mapObj = { '{k}': k, '{v}': v }
  var re = new RegExp(Object.keys(mapObj).join("|"),"gi")
  return str.replace(re, (matched) => mapObj[matched.toLowerCase()])
}

function turnToObject(val) {
  try {
    const [k, v] = val.split(':')
    return {[k.trim()]: v.trim()}
  } catch (error) {
    return ''
  }
}

function trimChars(str, c) {
  var re = new RegExp("^[" + c + "]+|[" + c + "]+$", "g")
  return str.replace(re,"")
}

function trimForDynamic(str) {
  const regex = /((-)?{.}(-)?)/gm
  return trimChars(str.replace(regex, '-'), '-')
}

const p = function (options) {   
  return plugin(function({ addUtilities, matchUtilities, e }) {
    const staticUtilities = []
    const dynamicUtilities = []

    for (const op of options) {
      const isArray = Array.isArray(op.defaults)

      const fn = (e) => isArray 
        ? (v, k) => ({ [`.${e(replaceAll(op.name, k, v))}`]: turnToObject(replaceAll(op.value, k, v)) }) 
        : ([k, v]) => ({ [`.${e(replaceAll(op.name, k, v))}`]: turnToObject(replaceAll(op.value, k, v)) })

      const localUtl = (isArray ? op.defaults : Object.entries(op.defaults)).map(fn(e))
      staticUtilities.push(localUtl)

      if(op.dynamic) matchUtilities({
        [trimForDynamic(op.name)]: v => turnToObject(replaceAll(op.value, '', v))
      })
    }

    addUtilities(staticUtilities)

    // const values = theme('lighting')
    // var utilities = values.map(x => {
    //   return {
    //     [`.${e(`bg-light-${x}`)}`]: { 'background-color': `rgba(255, 255, 255, ${x}%)` },
    //   }
    // })
    
    // matchUtilities(
    //   {
    //     'bg-light': (value) => ({
    //       'background-color': `rgba(255, 255, 255, ${value}%)`
    //     })
    //   },
    //   { values: {lighting: [ 9, 18, 24 ]} }
    // )
  })
}

module.exports = p
