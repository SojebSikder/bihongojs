import { ORMStorage } from "./ORMStorage";

/**
 * Entity decorator
 * @param options
 * @returns
 */
export function Entity(options?): Function {
  return function (object: Function) {
    ORMStorage.entities.push({
      target: object,
      options,
    });
  };
}

/**
 * Column decorator
 * @param options
 * @returns
 */
export function Column(options?): Function {
  return function (object: Object, methodName: string) {
    ORMStorage.properties.push({
      target: object.constructor,
      method: methodName,
      options,
    });
  };
}

export function belongsTo({
  relationTable,
  foreignKey, // defaults to userId
  localKey,
}): Function {
  return function (object: Object, methodName: string) {};
}
