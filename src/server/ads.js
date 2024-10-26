import https from "./config";
const ads = {
  get: () => https.get("/ads"),
  delete: (id) => https.delete(`/ads/delete/${id}`),
  post: (data) => https.post("/ads/create", data),
};

export default ads;
