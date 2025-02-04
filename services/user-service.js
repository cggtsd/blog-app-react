
import { myAxios, privateAxios } from "./helper";
// import axios from "axios";

export const signUp = (user) => {
    // console.log(myAxios)
  return  myAxios.post('/auth/register', user)
    .then(response=>response.data)
}

export const logIn = (data) => {
  return myAxios.post('/auth/login', data)
    .then(response => response.data)
}

export const getUser = (userId) => {
  console.log(userId)
  return myAxios.get(`/users/${userId}`).then(response=>response.data)
}