import axios from "axios";
import storage from "./storage";

export const http = resource => meta => {
  const [params] = meta.args;
  axios({
    url: `http://localhost:3000${resource}`,
    params
  }).then(res => {
    meta.args = [params, res];
    meta.commit();
  });
}

export const memoize = {
  read: meta => {
    const [firstArg] = meta.args;
    meta._key = [
      meta.target.constructor.name,
      meta.key,
      JSON.stringify(firstArg)
    ].join(":");

    if (storage.get(meta._key)) {
      meta.args = storage.get(meta._key);
      meta.skip();
    }
  },
  write: meta => {
    if(!meta._key) return;
    storage.set(meta._key, meta.args);
  }
}
