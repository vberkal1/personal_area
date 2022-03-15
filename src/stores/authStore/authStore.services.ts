import axios from "axios";
import { User } from "./authStore.models";

class Service {
  auth(login: string, password: string): Promise<User> {
    return axios
      .get(`http://localhost:3001/users?login=${login}&password=${password}`)
      .then((response) => response.data[0])
      .catch((error) => error.response && error.response.data);
  }
  getUser(id: string): Promise<User> {
    return axios
      .get(`http://localhost:3001/users?id=${id}`)
      .then((response) => response.data[0])
      .catch((error) => error.response && error.response.data);
  }
}

export default new Service();
