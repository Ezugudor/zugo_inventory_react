import axios from "axios";

export const SwypPartnerApi = axios.create({
  baseURL: "https://business-backend-service.herokuapp.com/"
  // baseURL: "http://localhost:4000/api/v1/"
});
