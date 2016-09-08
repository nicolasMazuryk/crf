
export default class CookieService {
    constructor() {}

    get(key) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    set(key, value, exp) {
        let date = new Date();
            date = new Date(date.getTime() + 3600000 * exp);
        document.cookie = `${key}=${value}; path=/; expires=${date.toGMTString()};`
    }

    remove(key) { this.set(key, null, -1) }
}