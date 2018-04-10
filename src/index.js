import {
  is,
  map,
  reduce,
  pipe,
  curry,
  mergeDeepRight,
  anyPass,
  addIndex,
  of,
  flip,
  objOf,
  filter,
  complement,
  both,
  isNil,
  isEmpty,
  either,
  gt,
  equals,
  unless,
  append,
  reverse,
  props,
  ifElse,
  contains,
  __,
  split,
  path,
  curryN,
  compose,
  over,
  lensIndex,
  useWith,
  fromPairs,
  identity,
  toPairs,
  replace,
  toUpper,
  sort,
  converge,
  unapply
} from 'ramda'
export const sortAlphabetical = sort((a, b) => a.localeCompare(b))
/// pass a list of single arity functions and get results of each in array
export const doAllFns = (...fns) => p =>
  converge(unapply(identity), [...fns])(p)

export const sortNumerical = sort((a, b) => a - b)
export const toNumber = _ => parseInt(_, 10)
export const mapIfObj = fn => ifElse(is(Object), map(fn), fn)
export const myPath = obj =>
  mapIfObj(
    ifElse(contains('.'), pipe(split('.'), path(__, obj)), path(__, obj))
  )

export const pickWithFallback = curryN(3, function pick(
  fallbackObj,
  names,
  obj
) {
  var result = {}
  var idx = 0
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]]
    } else if (names[idx] in fallbackObj) {
      result[names[idx]] = fallbackObj[names[idx]]
    }
    idx += 1
  }
  return result
})
/// ///////////////////////////RAMDA HELPERS
/// Is Logics
export const isBool = is(Boolean)
export const isNotBool = complement(isBool)
export const isTruthy = either(Boolean, equals(0))
export const isFalsy = complement(isTruthy)
export const isTrueBool = both(isBool, isTruthy)
export const isFalseBool = both(isBool, isFalsy)
export const notEqual = complement(equals)
export const isString = is(String)
export const isFunction = is(Function)
export const isNotFunction = complement(isFunction)

// Is Nulls
// only Null. not undefined
export const isNull = equals(null)
export const isNotNull = complement(isNull)
export const isNilOrEmpty = either(isNil, isEmpty)
export const isNotNil = complement(isNil)
export const isNotNilOrEmpty = complement(isNilOrEmpty)
// Is Object/Array

export const isArray = is(Array)
export const isNotArray = complement(isArray)
export const isObject = is(Object)
export const isActualObject = both(isNotArray, isObject)
export const isNotActualObject = complement(isActualObject)
export const isNotObj = complement(isObject)
export const isOfTypeObject = val => typeof val === 'object'
export const isObjLike = both(isNotNull, isOfTypeObject)
export const isNotObjLike = complement(isObjLike)
// Is Numerics
export const isNumber = is(Number)
export const isNotNumber = complement(isNumber)
export const isArrayOrString = either(isArray, isString)
export const isNegative = gt(0)

export const isNumberOrString = either(isNumber, isString)
export const isNumberAndNotZero = both(is(Number), notEqual(0))

export const toArray = unless(anyPass([isArray, isNilOrEmpty]), of)
export const mapIndexed = addIndex(map)
export const overHead = over(lensIndex(0))
export const mapKeysAndValues = useWith(compose(fromPairs, map), [
  identity,
  toPairs
])
export const mapKeys = useWith(mapKeysAndValues, [overHead, identity])

export const objOfMap = curry((keys, values) =>
  map(fObjOf(values), toArray(keys))
)
const fObjOf = flip(objOf)
export const filterNilAndEmpty = filter(isNotNilOrEmpty)
const filterNilAndEmptyChildren = val =>
  isObject(val) ? filterNilAndEmpty(val) : val

export const filterNilAndEmptyL2 = pipe(
  map(filterNilAndEmptyChildren),
  filterNilAndEmpty
)

export const reduceMerge = reduce(mergeDeepRight, {})
export const reduceMergeClean = pipe(
  reduce(mergeDeepRight, {}),
  filterNilAndEmptyL2
)

export const appendReverse = pipe(append, reverse)
export const fprops = flip(props)

export { pascalCase, camelCase, kebabCase, snakeCase } from './strings'
