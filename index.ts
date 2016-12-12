export {Service} from './lib/class-decorators/service';

export {Get} from './lib/endpoint-decorators/get';
export {Post} from './lib/endpoint-decorators/post';

export {required} from './lib/parameter-decorators/required';
export {pattern} from './lib/parameter-decorators/pattern';
export {minLength} from './lib/parameter-decorators/min-length';
export * from './lib/errors';
export {launch} from './lib/http-server';