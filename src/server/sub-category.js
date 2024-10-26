import https from "./config";

const subCategory = {
  get: (params, id) => https.get(`/sub-category/search/${id}`, { params }),
  post: (data) => https.post("/sub-category/create", data),
  delete: (id) => https.delete(`/sub-category/delete/${id}`),
  patch: (data, id) => https.patch(`/sub-category/update/${id}`, data),
};

export default subCategory;
