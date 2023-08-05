import axios from "axios";

const NewRequest = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

export default NewRequest;
