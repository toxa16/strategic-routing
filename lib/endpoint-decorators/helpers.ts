/**
 * Transforms camelCasedStrings into dash-cased-ones
 * @param myStr
 * @returns {string}
 */
export function camelCaseToDash(myStr: string): string {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Obtains parameter names of a function
 * @param fn
 * @returns {string[]}
 */
export function getMethodParamNames(fn: Function): string[] {
  const fstr = fn.toString();
  const result = fstr.match(/\(.*?\)/)[0].replace(/[()]/gi,'')
    .replace(/\s/gi,'').split(',');
  if (result.length == 1 && result[0] === '') {
    return []
  } else {
    return result;
  }
}