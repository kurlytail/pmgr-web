
import {register} from './factory';

class Ignore {
    *processDocument(doc, project, actvity) {

    }

    config(project) {

    }
}

register('ignore', Ignore);
