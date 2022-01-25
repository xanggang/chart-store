// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportDingApp from '../../../app/service/dingApp';
import ExportDingRobot from '../../../app/service/dingRobot';
import ExportJuhe from '../../../app/service/juhe';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    dingApp: AutoInstanceType<typeof ExportDingApp>;
    dingRobot: AutoInstanceType<typeof ExportDingRobot>;
    juhe: AutoInstanceType<typeof ExportJuhe>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
