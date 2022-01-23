/// <reference types="jest" />

const { replaceKeys, turnToObject, trimForDynamic, compileCss } = require('../src/index')

describe('replaceKeys function:', () => {
  it('should return key-1-smth', () => {
    expect(replaceKeys('key-{k}-smth', 1)).toBe('key-1-smth')
  })

  it('should return smth-value-1', () => {
    expect(replaceKeys('smth-value-{v}', null, 1)).toBe('smth-value-1')
  })

  it('should return key-1-value-2', () => {
    expect(replaceKeys('key-{k}-value-{v}', 1, 2)).toBe('key-1-value-2')
  })

  it('should throw not defined or type error for {str} argument', () => {
    expect(() => replaceKeys(null, 1, 2)).toThrow(/{str}/s)
  })

  it('should throw key not defined error for {k} argument', () => {
    expect(() => replaceKeys('key-{k}-value-{v}', null, 2)).toThrow(/{k}/s)
  })

  it('should throw key not defined error for {v} argument', () => {
    expect(() => replaceKeys('key-{k}-value-{v}', 1, null)).toThrow(/{v}/s)
  })
})

describe('turnToObject function:', () => {
  it('should return object {key:value}', () => {
    expect(turnToObject('key:value')).toEqual({key: 'value'})
  })

  it('should throw not defined or type error for {str} argument', () => {
    expect(() => turnToObject(null)).toThrow(/{str}/s)
  })

  it('should throw not matching schema error when input without <:>', () => {
    expect(() => turnToObject('key_value')).toThrow(/<key>:<value> schema/s)
  })
  
  it('should throw not matching schema error when input has a few <:>', () => {
    expect(() => turnToObject('key:value:smth')).toThrow(/<key>:<value> schema/s)
  })
})

describe('trimForDynamic function:', () => {
  it('should return string key-smth', () => {
    expect(trimForDynamic('key-smth-{k}')).toBe('key-smth')
  })

  it('should throw not defined or type error for {str} argument', () => {
    expect(() => trimForDynamic(null)).toThrow(/{str}/s)
  })

  it('should throw not matching schema error when input without <:>', () => {
    expect(() => trimForDynamic(null)).toThrow(/{str}/s)
  })
})

describe('compileCss function:', () => {
  it('should return compiled tailwind object for utilities', () => {
    expect(compileCss('test-key', 'test-prop: test-value-{v}', null, 9)).toEqual({'.test-key': {'test-prop': 'test-value-9'}})
  })

  it('should throw not defined or type error for {opName} argument', () => {
    expect(() => compileCss(null, 'value-{v}', 1, 2)).toThrow(/{name}/s)
  })
  
  it('should throw not defined or type error for {opValue} argument', () => {
    expect(() => compileCss('key-{k}', null, 1, 2)).toThrow(/{value}/s)
  })
})