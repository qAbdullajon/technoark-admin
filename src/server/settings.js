import https from "./config";

const settings = {
  get: (id) => https.get(`/admin/${id}`),
  patch: (data, id) => https.patch(`/admin/${id}`, data),
};

export default settings;
