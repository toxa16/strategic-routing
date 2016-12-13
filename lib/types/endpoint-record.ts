import {ParameterRecord} from './parameter-record';

export interface EndpointRecord {
  name: string;
  routes: string[];
  parameters: ParameterRecord[];
}
