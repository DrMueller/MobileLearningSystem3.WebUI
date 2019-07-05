import { Type } from '@angular/core';

import { SpyOf } from '../types';

export function spyOnClass<T>(spiedClass: Type<T>): SpyOf<T> {
  const functionNames = getFunctionNames(spiedClass).map(f => f.propName);
  const spyWithFunctions = jasmine.createSpyObj('spy', [...functionNames]);

  return spyWithFunctions;
}

function getFunctionNames<T>(spiedClass: Type<T>): { propName: string, propDescr: PropertyDescriptor }[] {
  return getObjects(spiedClass)
    .filter(prop => prop.propDescr.value instanceof Function);
}

function getObjects<T>(spiedClass: Type<T>): { propName: string, propDescr: PropertyDescriptor }[] {
  const prototype = spiedClass.prototype;
  const result = Object.getOwnPropertyNames(prototype)
    .filter(name => !!Object.getOwnPropertyDescriptor(prototype, name))
    .map(name => {
      return {
        propName: name,
        propDescr: Object.getOwnPropertyDescriptor(prototype, name)!
      };
    });

  return result;
}
