// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSysCors from '../../../app/middleware/sysCors';

declare module 'egg' {
  interface IMiddleware {
    sysCors: typeof ExportSysCors;
  }
}
