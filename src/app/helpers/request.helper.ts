import { Observable } from 'rxjs';

export class RequestHelper {
    static async waitUntilPreviousRequestIsDone() {
        let isRequesting = false;

        return function (fn: ()<T> => Observable<T>) {};
    }
}
