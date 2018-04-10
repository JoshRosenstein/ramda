import {
  pipe,
  map,
  split,
  toLower,
  __,
  gt,
  isEmpty,
  join,
  propSatisfies,
  reject,
  toUpper,
  when,
  replace
} from 'ramda'

export const capitalize = replace(/^[a-z]/, toUpper)
const camscalRegex = new RegExp(/[\s_-]/, 'g')
export const decapitalize = replace(/^[A-Z]/, toLower)

const cleanCamscal = pipe(
  split(camscalRegex),
  reject(isEmpty),
  when(propSatisfies(gt(__, 1), 'length'), map(pipe(toLower, capitalize))),
  join(''),
  decapitalize
)

const capitalsRegex = new RegExp(/(?=[A-Z])/, 'g')

export const pascalCase = pipe(cleanCamscal, capitalize)
export const camelCase = pipe(cleanCamscal, decapitalize)

export const cleanKebab = pipe(pascalCase, split(capitalsRegex), map(toLower))
export const kebabCase = pipe(cleanKebab, join('-'))
export const snakeCase = pipe(cleanKebab, join('_'))
