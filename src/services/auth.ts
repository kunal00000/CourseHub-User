import axiosClient from "../api/axiosClient";
import { SuccessNotification } from "../utils/notification";

export const postSignup = async (email: string, password: string) => {
  const { data } = await axiosClient.post("users/signup", {
    username: email,
    password: password,
  });
  if (data.message === "User created successfully") {
    console.log("signup success");
    SuccessNotification(data.message);
    localStorage.setItem("token", data.token);
    axiosClient.defaults.headers.common["Authorization"] =
      "Bearer " + data.token;
  }
  return data;
};

export const postLogin = async (email: string, password: string) => {
  const { data } = await axiosClient.post(
    "users/login",
    {},
    {
      headers: {
        username: email,
        password: password,
      },
    },
  );
  if (data.message === "Logged in successfully") {
    console.log("login success");
    SuccessNotification(data.message);
    localStorage.setItem("token", data.token);
    axiosClient.defaults.headers.common["Authorization"] =
      "Bearer " + data.token;
  }
  return data;
};

export const getUsername = async () => {
  const response = await axiosClient.get("users/username");
  if (response.status === 200) {
    return response.data.username as string;
  }
};
