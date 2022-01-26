// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDetail from '../../../app/model/detail';
import ExportList from '../../../app/model/list';

declare module 'egg' {
  interface IModel {
    Detail: ReturnType<typeof ExportDetail>;
    List: ReturnType<typeof ExportList>;
  }
}
