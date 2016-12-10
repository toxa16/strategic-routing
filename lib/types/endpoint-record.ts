import {ParameterRecord} from './parameter-record';

export interface EndpointRecord {
  name: string;
  route: string;
  parameters: ParameterRecord[];
}
