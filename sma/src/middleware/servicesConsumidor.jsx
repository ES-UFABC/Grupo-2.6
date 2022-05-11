import http from "./httpService";
// import {api_url} from '../config.json'

let backPath = "http://localhost:8000/produtos";
// let backPath = "https://sma-ufabc202201-backend.herokuapp.com/produtos"
export async function setOrdem(ordem) {
  console.log("=> ORDEM", ordem);
  return await http.post(backPath + "/ordem", ordem);
}

export async function getOfertas(params) {
  return await http.get(backPath + "/ofertas", { params: params });
}

export async function getCommodities() {
  return await http.get(backPath + "/commodities");
}
