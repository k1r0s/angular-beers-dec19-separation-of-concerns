import { provider } from "kaop";

class Storage {
  set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

export default provider.singleton(Storage);
