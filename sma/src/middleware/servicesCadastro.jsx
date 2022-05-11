import http from "./httpService";
// import {api_url} from '../config.json'

let backPath = "http://localhost:8000/usuarios";

const isUnauthorizedOrForbidden = ({ status }) =>
  status === 401 || status === 403 || status === 429;

const handleHttpStatus = async (response) => {
  // mandar pra tela de erro
}

const postObjectAsync = async (url, body, callback) => {
  try {
    window
      .fetch(url, {
        crossDomain: true,
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      .then((response) => {
        if (isUnauthorizedOrForbidden(response)) {
          handleHttpStatus(response);
        } else {
          if (response.status === 204) {
            callback(response.status);
            return;
          }
          response
            .json()
            .then((data) => {
              callback(response.status, data);
            })
            .catch((error) => {
              console.error(error);
              callback(response.status);
            });
        }
      });
  } catch (error) {
    return false;
  }
  return false;
}
// let backPath = "https://sma-ufabc202201-backend.herokuapp.com/usuarios"
const setCadastro = async (cadastro, callback) => {
  //return http.post(backPath + "/cadastrar", cadastro);
  //return http.post(backPath + "/cadastrar", cadastro, callback);
  postObjectAsync(backPath + "/cadastrar", cadastro, callback);
} 

export async function setLogin(login) {
  return await http.post(backPath + "/login", login);
}

export { setCadastro };