import axios from "axios";

export const SwypPartnerApi = axios.create({
  baseURL: "https://swyp-business-backend-service.herokuapp.com/api/v1/"
  // baseURL: "http://localhost:4000/api/v1/"
});
