export interface ParameterRecord {
  name: string;
  required: boolean;
  pattern: RegExp | null;
  minLength: number | null;
}