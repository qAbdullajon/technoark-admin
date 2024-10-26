import https from "./config";

const brandCategory = {
  get: (params) => https.get("/brand-category/search", { params }),
  get2: () => https.get("/brand/search"),
  post: (data) => https.post("/brand-category/create", data),
  patch: (data, id) => https.patch(`/brand-category/update/${id}`, data),
  delete: (id) => https.delete(`/brand-category/delete/${id}`),
};

export default brandCategory;
