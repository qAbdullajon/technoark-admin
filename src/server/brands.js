import https from "./config";
const brands = {
  get: (params) => https.get("/brand/search", { params }),
  get_category: () => https.get("/category/search"),
  post: (data) => https.post("/brand/create", data),
  patch: (data, id) => https.patch(`/brand/update/${id}`, data),
  delete: (id) => https.delete(`/brand/delete/${id}`),
};

export default brands;
