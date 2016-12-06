/**
 * Created by apple on 27.11.16.
 */

export class toastService {
    constructor() {
        this.DURATION = 5000
    }

    toast(message, duration = this.DURATION, className, cb) {
        Materialize.toast(message, duration, className, cb);
    }

    error(message, cb) {
        Materialize.toast(message, this.DURATION, 'error', cb);
    }

    success(message, cb) {
        Materialize.toast(message, this.DURATION, 'success', cb);
    }
}