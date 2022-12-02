type ModuleOption = {
  imports?: any[];
  controllers?: any[];
};

/**
 * Module decorator.
 * @author Sojeb Sikder <sojebsikder@gmail.com>
 */
export function Module(option?: ModuleOption): Function {
  return function (object: Object, methodName: string) {};
}
