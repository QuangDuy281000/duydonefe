import axios from "axios";
import authHeader from "../auth-header"

const API_URL = "http://localhost:8080/congthongtin/";

// admin quan li tin tuc
const newListAdmin = (queryString) => {
  return axios.get(API_URL + `admin/news?${queryString}`, {
    headers: authHeader(),
  });
};

// admin them tin tuc
const insertNewsAdmin = (data) => {
  return axios.post(API_URL + "admin/news", data, {
    headers: authHeader(),
  });
};

//admin xem noi dung
const detailNewsById = (id) => {
  return axios.get(API_URL + `admin/news/${id}`, {
    headers: authHeader(),
  });
};

//admin xoas  bai viet
const deleteById = (id) => {
  return axios.delete(API_URL + `admin/news/${id}`, {
    headers: authHeader(),
  });
};

//admin update  bai viet
const updateNews = (data) => {
  return axios.put(API_URL + "admin/news", data, {
    headers: authHeader(),
  });
};

export default {
  newListAdmin,
  insertNewsAdmin,
  detailNewsById,
  deleteById,
  updateNews,
};
