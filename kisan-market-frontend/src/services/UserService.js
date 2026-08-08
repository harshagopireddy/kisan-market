import api from "./api";

class UserService {
  register(user) {
    return api.post("/users/register", user);
  }

  login(loginData) {
    return api.post("/users/login", loginData);
  }

  getMe() {
    return api.get("/users/me");
  }

  updateProfile(profile) {
    return api.put("/users/me", profile);
  }
}

export default new UserService();
