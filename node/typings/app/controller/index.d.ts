// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDingApp from '../../../app/controller/dingApp';
import ExportDingRobot from '../../../app/controller/dingRobot';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    dingApp: ExportDingApp;
    dingRobot: ExportDingRobot;
    home: ExportHome;
  }
}
