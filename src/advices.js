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
