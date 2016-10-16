
class StorageService {

    get(key) {
        return window.localStorage.getItem(key);
    }

    set(key, value) {
        return window.localStorage.setItem(key, value);
    }

    remove(key) { window.localStorage.removeItem(key) }
}

export default StorageService;