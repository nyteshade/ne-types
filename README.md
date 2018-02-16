# ne-types

## Introduction

`ne-types` is a small library of functions that can be used in various projects
to test the underlying JavaScript class of a type. It uses the technique of
calling `Object.prototype.toString.call/apply` in order to get at this value.

Custom ES6/7 classes that define a `Symbol.toStringTag` can also be validated/
tested with this suite of tools. For most intents and purposes, this library of
functions is ideal if you want more granular and extensible type testing at
runtime than `typeof` can offer by itself.

### Functions

  * **extendsFrom** checks to see if an object supplied extends from a parent
    class or type. `extendsFrom({}, Object)` for example
  * **isArray** checks to see if an object is of type Array
  * **isClass** checks to see if an object is either a class or function
  * **isDate** checks to see if an object is a Date object
  * **isFunction** checks to see if an object is a Function
  * **isNativeClassByProps** checks to see if a function is a class
  * **isNativeClassByString** checks to see if an obj is either a function or
    class
  * **isNull** checks to see if an object is explicitly null
  * **isNumber** checks to see if an object is a number or number constant
  * **isObject** checks to see if an object is truly an object
  * **isOfType** checks to see if an object is of another type; i.e.
    `isOfType('asd', String) === true`
  * **isPrimitive** checks to see if an object is a primitive; i.e. not a
    function, object, class, or any other advanced type
  * **isRegExp** checks to see if an object is a regular expression instance
  * **isString** checks to see if an object is truly a string
  * **isUndefined** checks to see if an object is explicitly undefined
  * **isValue** checks to see if a value is neither object nor array
  * **typeOf** checks and returns the class string value of a given object