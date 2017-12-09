import axios from "axios";

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
