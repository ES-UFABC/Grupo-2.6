import React, {Component} from 'react'
import { setLogin } from '../middleware/servicesCadastro'

export default class Navbar extends Component {

state = {
    login:{
    email: '',
    senha: ' ',
    }
}

handleBlur = (e) => {
    const {login} = this.state
    let newLogin = login

    newLogin[e.target.id] = e.target.value
    this.setState({login: newLogin});
    console.log(login)
}
handleSubmit = async (e) => {
    e.preventDefault()
    const login = this.state.login
    try {
        var response = await setLogin(login)
        console.log(response)
        this.loginRedirect(response)
    }
    catch (error){
        alert(error.response.data.detail)
    }
}

loginRedirect = (response) => {
    if(response.status === 200){
        if(response.data.tipo === "Produtor"){
            window.location.href = "/produtor"
        }
        else {
            window.location.href = "/consumidor"
        }
    }
    else {
        alert("Erro ao efetuar o login")
    }
}

render() {
    return (

        <>
        <header>
        <div>
            <h1><a href='/'>SMA Handshake</a></h1>
        </div>
        <div className='login-div'>
            <form onSubmit={this.handleSubmit}>
            <label>Usuário</label>
            <input id='email' onBlur={this.handleBlur}></input>
            <label>Senha</label>
            <input id='senha' type="password" onBlur={this.handleBlur}></input>
            <button >Entrar</button>
            </form>
            <a href='cadastro'>Cadastrar-se</a>
        </div>
        </header>
        </>

    )
}

}