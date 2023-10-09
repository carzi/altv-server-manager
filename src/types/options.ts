export interface IArgsInit {
  Nologo: true | undefined;
  Win: true | undefined;
  Linux: true | undefined;
  Release: true | undefined;
  Rc: true | undefined;
  Dev: true | undefined;
  Ts: true | undefined;
  Js: true | undefined;
  Csharp: true | undefined;
  Rust: true | undefined;
}

export interface IArgsUpdate {
  Win: true | undefined;
  Linux: true | undefined;
  Release: true | undefined;
  Rc: true | undefined;
  Dev: true | undefined;
  Ts: true | undefined;
  Js: true | undefined;
  Csharp: true | undefined;
  Rust: true | undefined;
  Server: true | undefined;
  Data: true | undefined;
  Module: true | undefined;
}
export interface IArgsDev {
  Ts: true | undefined;
  Js: true | undefined;
  Csharp: true | undefined;
  Rust: true | undefined;
}
export interface IArgsBuild {
  Minify: true | undefined;
  Ts: true | undefined;
  Csharp: true | undefined;
  Rust: true | undefined;
}
