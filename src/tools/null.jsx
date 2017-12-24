
import {register} from './factory';

class Null {
    *processDocument(doc, project, actvity) {

    }

    config(project) {

    }
}

register('null', Null);
