export function logInConsole(val: string) {
  console.log(
    `%c ${val}`,
    'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
  );
}

export const observer = {
  next: (value: any) => {
    console.log(value);
  },
  error: (error: any) => {
    console.error(error);
  },
  complete: () => {
    logInConsole('completed');
  },
};