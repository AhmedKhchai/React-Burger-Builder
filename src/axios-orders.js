import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-d09b4-default-rtdb.firebaseio.com/",
});

export default instance;
