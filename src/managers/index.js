import NullManager from './null.jsx';
import OracleManager from './oracle.jsx';
import Controller from './controller.js';
import Factory from './factory';

Factory.register('null', NullManager);
Factory.register('oracle', OracleManager);
Factory.controller = new Controller();
Factory.controller.init();

export default Factory;
