export function createSpy<T>(
  prototypeOrMethods: T | Array<keyof T>,
  params?: { [prop in keyof T]?: T[prop] }
): jasmine.SpyObj<T> {
  const methodsSpy: jasmine.SpyObj<T> =
    prototypeOrMethods instanceof Array
      ? createSpyObj(prototypeOrMethods)
      : createSpyObj(
          Object.getOwnPropertyNames(prototypeOrMethods).filter(
            (propName: string) => propName !== "constructor"
          )
        );

  return Object.assign({}, methodsSpy, params);
}

function createSpyObj<T>(
  propNames: Array<keyof T> | string[]
): jasmine.SpyObj<T> {
  return propNames.length > 0
    ? jasmine.createSpyObj<T>(propNames)
    : <jasmine.SpyObj<T>>{};
}