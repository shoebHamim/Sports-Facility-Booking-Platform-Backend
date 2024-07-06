export type TErrorMessages = {
  path: (string|number)[];
  message: string;
  error?: any;
}[];

export type TGenericErrorResponse={
  success:boolean;
  message:string;
  errorMessages:TErrorMessages;
  stack?:string
}
