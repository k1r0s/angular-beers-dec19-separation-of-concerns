import AxiosProvider from "./axios-provider";
import StorageProvider from "./storage-provider";
import { beforeMethod, beforeInstance, applyAspect } from "kaop-ts";
import { inject } from "kaop";

export const fetch = resource => applyAspect({
  "constructor": [beforeInstance(inject.assign({ axios: AxiosProvider }))],
  "getResource": [beforeMethod(http(resource))]
})

export const cachedFetch = resource => applyAspect({
  "constructor": [beforeInstance(inject.assign({ axios: AxiosProvider, storage: StorageProvider }))],
  "getResource": [beforeMethod(memoize.read, http(resource), memoize.write)]
})

export const http = url => meta => {
  const [params] = meta.args;
  meta.scope.axios({
    url,
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

    if (meta.scope.storage.get(meta._key)) {
      meta.args = meta.scope.storage.get(meta._key);
      meta.skip();
    }
  },
  write: meta => {
    if(!meta._key) return;
    meta.scope.storage.set(meta._key, meta.args);
  }
}
