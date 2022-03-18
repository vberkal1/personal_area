import { action, makeObservable, observable, runInAction } from "mobx";
import { User } from "./authStore.models";
import service from "./authStore.services";
import storageUtil from "../../utils/storageUtil";

const initialStoreValues = {
  isAuth: !!storageUtil.getAccessToken(),
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
      updateIsAuth: action.bound,
      logout: action.bound,
      resetStoreValues: action.bound,
    });
  }


  resetStoreValues(): void{
    this.errorMessage = initialStoreValues.errorMessage;
  }


  logout(): void {
    storageUtil.clearToken();
    this.isAuth = false;
    this.login = initialStoreValues.login;
  }

  async auth(login: string, password: string): Promise<void> {
    try {
      const user: User = await service.auth(login, password);
      runInAction(() => {
        if (user) {
          this.login = user.login;
          storageUtil.setToken(user.id);
          this.isAuth = true;
        } else {
          this.errorMessage = "некорректные данные";
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  async updateIsAuth(): Promise<void> {
    try {
      this.isAuth = !!storageUtil.getAccessToken();
      const token = storageUtil.getAccessToken();
      if (token) {
        const user: User = await service.getUser(token);
        runInAction(() => {
          if (user) {
            this.login = user.login;
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthStore();
