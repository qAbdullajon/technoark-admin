import https from "./config";
const categories = {
  get: (params) => https.get("/category/search", { params }),
  post: (data) => https.post("/category/create", data),
  delete: (id) => https.delete(`/category/delete/${id}`),
  patch: (data, id) => https.patch(`/category/update/${id}`, data),
};

export default categories;
