export interface ParameterRecord {
  name: string;
  required: boolean;
  pattern: RegExp;
  minLength: number;
  email: boolean;
}