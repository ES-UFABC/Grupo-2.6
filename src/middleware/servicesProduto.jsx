import http from './httpService'
// import {api_url} from '../config.json'

let backPath = "http://localhost:8000/produtos"
export async function setProduto(produto){
    return await http.post(backPath + '/cadastrar', produto)
}