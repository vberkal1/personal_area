import { action, makeObservable, observable, runInAction } from "mobx";
import { User } from "./authStore.models";
import service from "./authStore.services";

const initialStoreValues = {
  isAuth: false,
  login: "",
  errorMessage: "",
};

class AuthStore {
  isAuth: boolean = initialStoreValues.isAuth;

  login: string = initialStoreValues.login;

  errorMessage: string = initialStoreValues.errorMessage;

  constructor() {
    makeObservable(this, {
      login: observable,
      errorMessage: observable,
      isAuth: observable,
      auth: action.bound,
    });
  }

  async auth(login: string, password: string): Promise<void> {
    try {
      const user: User = await service.auth(login, password);
      runInAction(() => {
        if (user) {
          this.login = user.login;
          this.isAuth = true;
        } else {
            this.errorMessage = "Такого пользователя не существует"
            setTimeout(() => {this.errorMessage = initialStoreValues.errorMessage}, 2000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthStore();
