import { Type } from '@angular/core';

import { SpyOf } from '../types';

export function provideMockInstance<T>(spiedClass: Type<T>, mockInstance: SpyOf<T>) {
  return {
    provide: spiedClass,
    useValue: mockInstance
  };
}
