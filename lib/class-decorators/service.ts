export function Service() {
  return function (constructor: Function) {
    console.log(`Service ${constructor.name}\n`);
  }
}