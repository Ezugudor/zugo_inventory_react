import axios from "axios";

export const SwypPartnerApi = axios.create({
  // baseURL: "http://api.zugostock.com/api/"
  baseURL: "http://inventory-api/api/"
});
