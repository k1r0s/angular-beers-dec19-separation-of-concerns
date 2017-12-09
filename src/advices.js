import axios from "axios";
import storage from "./storage";
import { beforeMethod } from "kaop-ts";

export const memoizeFetch = resource => [memoizeRead, http(resource), memoizeWrite];

export const http = resource => meta => {
  const [params] = meta.args;
  axios({
    method: "get",
    url: `http://jsonplaceholder.typicode.com${resource}`,
    params,
  }).then(res => {
    meta.args = [params, res];
    meta.commit();
  });
}

export const memoizeRead = meta => {
  const [firstArg] = meta.args;
  meta._memoizeKey = [
    meta.target.constructor.name,
    meta.key,
    JSON.stringify(firstArg)
  ].join(":");

  if (storage.get(meta._memoizeKey)) {
    meta.args = storage.get(meta._memoizeKey);
    meta.break();
  }
}

export const memoizeWrite = function(meta) {
  if(!meta._memoizeKey) return;
  storage.set(meta._memoizeKey, meta.args);
}
