export class LocalStorage {
  static get(key) {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data);
  }

  static set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
