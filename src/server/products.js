import https from "./config";

const products = {
  get: (params) => https.get("products/search", { params }),
  getCategory: () => https.get("/category/search"),
  getBrand: (id) => https.get(`/brand/category/${id}`),
  getBrandCategory: (id) => https.get(`/brand-category/brand/${id}`),
  post: (data) => https.post("/products/create", data),
  delete: (id) => https.delete(`/products/delete/${id}`),
  patch: (data, id) => https.patch(`/products/update/${id}`, data),
  getId: (id) => https.get(`/products/${id}`),
  deleteDetail: (id) => https.delete(`/product-detail/delete/${id}`),
  postDetail: (data) => https.post("/product-detail/create", data),
  patchDetail: (data, id) => https.patch(`/product-detail/update/${id}`, data),
};
export default products;
