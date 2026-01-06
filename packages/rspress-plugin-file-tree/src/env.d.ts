declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
