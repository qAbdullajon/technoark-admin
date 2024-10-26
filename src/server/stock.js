import https from "./config";

const stock = {
  get: (params) => https.get("/stock", { params }),
  getCategory: () => https.get("/category/search"),
  getBrand: (id) => https.get(`/brand/category/${id}`),
  getProducts: () => https.get("/products/search"),
  post: (data) => https.post("/stock/create", data),
  patch: (data, id) => https.patch(`/stock/update/${id}`, data),
  delete: (id) => https.delete(`/stock/delete/${id}`),
};
export default stock;
