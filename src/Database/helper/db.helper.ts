export class DBHelper {
  /**
   * Parse row data packet
   * @param data
   * @returns
   */
  static parseResult = function (data) {
    return JSON.parse(JSON.stringify(data));
  };
}
