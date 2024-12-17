
import { myAxios } from "./helper";
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