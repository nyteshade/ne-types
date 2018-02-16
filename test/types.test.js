import {
  extendsFrom,
  isArray,
  isClass,
  isDate,
  isFunction,
  isNativeClassByProps,
  isNativeClassByString,
  isNull,
  isNumber,
  isObject,
  isOfType,
  isPrimitive,
  isRegExp,
  isString,
  isUndefined,
  isValue,
  typeOf,

  NULL,
  UNDEFINED
} from '../src/types'

describe('test extendsFrom capability', () => {
  class A { };
  class B extends A { };
  class C extends B { };
  class D extends A { };

  function E() { };
  E.prototype = C.prototype;

  let a = new A();
  let b = new B();
  let c = new C();
  let d = new D();
  let e = new E();
  let f = Object.create(null);
  let g = {};

  it('test that A extends itself', () => {
    expect(extendsFrom(A, A)).toBe(true)
    expect(extendsFrom(a, A)).toBe(true)
  })

  it('test that B extends A', () => {
    expect(extendsFrom(B, A)).toBe(true)
    expect(extendsFrom(b, A)).toBe(true)
  })

  it('test that C extends B and A', () => {
    expect(extendsFrom(C, B)).toBe(true)
    expect(extendsFrom(c, B)).toBe(true)
    expect(extendsFrom(C, A)).toBe(true)
    expect(extendsFrom(c, A)).toBe(true)
  })

  it('test that D extends A and not B', () => {
    expect(extendsFrom(D, B)).toBe(false)
    expect(extendsFrom(d, B)).toBe(false)
    expect(extendsFrom(D, A)).toBe(true)
    expect(extendsFrom(d, A)).toBe(true)
  })

  it('test that e extends C, B and A but that E does not', () => {
    expect(extendsFrom(e, C)).toBe(true)
    expect(extendsFrom(e, B)).toBe(true)
    expect(extendsFrom(e, A)).toBe(true)
    expect(extendsFrom(E, C)).toBe(false)
    expect(extendsFrom(E, B)).toBe(false)
    expect(extendsFrom(E, A)).toBe(false)
  })

  it('test that {} extends Object but Object.create(null) does not', () => {
    expect(extendsFrom(g, Object)).toBe(true)
    expect(extendsFrom(f, Object)).toBe(false)
  })

})

describe('test array functionality', () => {
  it('should be able to detect an array literal as an array', () => {
    let array = []

    expect(isArray(array)).toBe(true)
    expect(typeOf(array)).toEqual(Array.name)
    expect(extendsFrom(array, Array)).toBe(true)
  })

  it('should be able to detect an array instance as an array', () => {
    let array = new Array()

    expect(isArray(array)).toBe(true)
    expect(typeOf(array)).toEqual(Array.name)
    expect(extendsFrom(array, Array)).toBe(true)
  })

  it('should be able to detect a string is not an array', () => {
    let array = 'abc'

    expect(isArray(array)).not.toBe(true)
    expect(typeOf(array)).not.toEqual(Array.name)
    expect(extendsFrom(array, Array)).not.toBe(true)
    expect(typeOf(array)).toBe(String.name)
  })
})

describe('test class functionality', () => {
  it('isClass() should be able to detect class and functions', () => {
    class A { }
    function B() { }
    const s = String.name

    expect(isClass(A)).toBe(true)
    expect(isClass(B)).toBe(true)
    expect(isClass(s)).toBe(false)
  })

  // Note this test tests a class type by checking the string of its
  // definition if the native typeof returns 'function'. In such a case
  // 'class' must be the initial text of the toString() output
  it('isNativeClassByString should detect diff between func and class', () => {
    class A { }
    function B() { }
    const s = String.name

    expect(isNativeClassByString(A)).toBe(true)
    expect(isNativeClassByString(B)).toBe(false)
    expect(isNativeClassByString(s)).toBe(false)
  })

  it('isNativeClassByProps should NOT be able to tell them apart', () => {
    class A { }
    function B() { }

    expect(isNativeClassByProps(A)).toBe(true)
    expect(isNativeClassByProps(B)).toBe(true)
  })
})

describe('test date functionality', () => {
  it('isDate() should only be able to check if it is a date instance', () => {
    let dateInstance = new Date()
    let dateString = dateInstance.toString()

    expect(isDate(dateInstance)).toBe(true)
    expect(isDate(dateString)).toBe(false)
  })
})

describe('test function typing functionality', () => {
  it('should be able to test both classes and functions', () => {
    class A { }
    function B() { }

    expect(isFunction(A)).toBe(true)
    expect(isFunction(B)).toBe(true)
  })

  it('should work on native functions identically', () => {
    expect(isFunction(Object.prototype.toString)).toBe(true)
  })
})

describe('test isNull capability', () => {
  it('should detect null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should detect difference between undefined and null', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
    expect(isNull()).toBe(false)
  })
})

describe('test isNumber capability', () => {
  it('should work with raw numbers, number instances and constants', () => {
    expect(isNumber(5)).toBe(true)
    expect(isNumber(Number('5'))).toBe(true)
    expect(isNumber(new Number(3))).toBe(true)
    expect(isNumber(NaN)).toBe(/* oxymoron */true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(Number.MIN_VALUE)).toBe(true)
    expect(isNumber(Number.MAX_VALUE)).toBe(true)
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true)
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(true)
  })

  it('should detect difference between string numbers and real numbers', () => {
    expect(isNumber('5')).toBe(false)
  })
})

describe('test isObject capability', () => {
  it('should work on all basic object types', () => {
    let object = {}
    let objectInstance = new Object()
    let objectCreation = Object.create({})

    expect(isObject(object)).toBe(true)
    expect(isObject(objectInstance)).toBe(true)
    expect(isObject(objectCreation)).toBe(true)
  })

  it('should NOT work on Object wrapped types', () => {
    expect(isObject(Object(5))).toBe(false)
    expect(isObject(Object(/re/))).toBe(false)
  })
})

describe('test isOfType helper', () => {
  it('should work on builtin .name values', () => {
    expect(isOfType("Asdfa", String.name)).toBe(true)
    expect(isOfType(6, Number.name)).toBe(true)
    expect(isOfType(function () {}, Function.name)).toBe(true)
  })

  it('should work on custom class instances with defined symbols', () => {
    class A {
      get [Symbol.toStringTag]() { return this.constructor.name }
    }

    let a = new A()

    expect(isOfType(a, A.name)).toBe(true)
  })
})

describe('test isPrimitive functionality', () => {
  it('should support all values in PRIMITIVES constant', () => {
    expect(isPrimitive(NULL)).toBe(true)
    expect(isPrimitive(UNDEFINED)).toBe(true)
    expect(isPrimitive(Boolean.name)).toBe(true)
    expect(isPrimitive(Number.name)).toBe(true)
    expect(isPrimitive(String.name)).toBe(true)
    expect(isPrimitive(Symbol.name)).toBe(true)
  })

  it('should not support custom types outside of PRIMITIVES', () => {
    class A {}

    let a = new A()

    expect(isPrimitive(a)).toBe(false)
  })

  it('should not support builtin non-primitives', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(function() {})).toBe(false)
    expect(isPrimitive(/regex/)).toBe(false)
    expect(isPrimitive(new Date())).toBe(false)
  })
})

describe('test isRegExp functionality', () => {
  it('should support RegExp instances', () => {
    expect(isRegExp(new RegExp("heya", "i"))).toBe(true)
    expect(isRegExp(/heya/i)).toBe(true)
  })

  it('should not support RegExp strings', () => {
    expect(isRegExp("\s*[1-9]")).toBe(false)
  })
})

describe('test isString functionality', () => {
  it('should detect strings as such', () => {
    let string = "Hello world"

    expect(isString(string)).toBe(true)
  })

  it('should detect some builtin string values as strings', () => {
    function A() { }
    class B { }

    expect(isString(A.toString())).toBe(true)
    expect(isString(B.toString())).toBe(true)
    expect(isString(Object.name)).toBe(true)
  })
})

describe('test isUndefined capability', () => {
  it('should detect undefined', () => {
    expect(isUndefined()).toBe(true)
    expect(isUndefined(undefined)).toBe(true)
  })

  it('should detect difference between undefined and null', () => {
    expect(isUndefined(null)).toBe(false)
  })
})

describe('test isValue (i.e. not String nor Array)', () => {
  // This function in hindsight should be deprecated due to obscure name
  // and purpose. It should be either removed or a renamed/replaced with
  // new and properly named function

  it('should not allow either arrays or objects', () => {
    expect(isValue(5)).toBe(true)
    expect(isValue(function() {})).toBe(true)
    expect(isValue({})).toBe(false)
    expect(isValue([])).toBe(false)
  })
})

describe('test typeOf; redundant since all others rely on it', () => {
  it('should pass a few simple tests', () => {
    expect(typeOf(6)).toBe(Number.name)
    expect(typeOf('')).toBe(String.name)
  })

  it('should work on custom class instances with Symbol.toStringTag', () => {
    class A { get [Symbol.toStringTag]() { return this.constructor.name } }

    expect(typeOf(new A())).toBe(A.name)
  })
})
