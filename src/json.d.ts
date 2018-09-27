// Allow to import json from file
declare module '*.json' {
  const value: any;
  export default value;
}

// Allow to import json from url
declare module 'json!*' {
  const value: any;
  export default value;
}
