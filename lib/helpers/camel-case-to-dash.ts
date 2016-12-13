/**
 * Transforms camelCasedStrings into dash-cased-ones.
 * @param myStr
 * @returns {string}
 */
export function camelCaseToDash(myStr: string): string {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}