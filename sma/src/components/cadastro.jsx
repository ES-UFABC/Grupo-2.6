import React, { Component } from 'react'
import { setCadastro } from '../middleware/servicesCadastro';
import '../components/cadastro.css';
import Button from './button';
import Navbar from './navbar';
export default class Cadastro extends Component {
    constructor() {
        super();
        this.state = {
            cadastro: {
                tipo: '',
                nome: '',
                cpf_cnpj: '',
                telefone: '',
                estado: '',
                cidade: '',
                complemento: '',
                cep: '',
                logradouro: '',
                numero: '',
                email: '',
                senha: '',
            },
            checkSenha: '',
            disabledCreate: true,
            showMessage: false,
        }
    }

    handleBlur = (e) => {
        const { cadastro } = this.state
        let newCadastro = cadastro
        console.log(cadastro)
        if (e.target.id !== "checkSenha") {
            newCadastro[e.target.id] = e.target.value
            this.setState({ cadastro: newCadastro });
        }
        else {
            this.setState({ checkSenha: e.target.value })
        }

    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { cadastro } = this.state

        console.log(cadastro)
        setCadastro(cadastro)

    }

    handleStateDropdown = (e) => {
        const cadastro = this.state.cadastro;
        cadastro.estado = e.target.value;
        this.setState({
            cadastro,
        });
    };

    handleCheckPassword = (e) => {
        const cadastro = this.state.cadastro;
        if (cadastro.senha === e.target.value) {
            this.setState({ checkSenha: e.target.value, disabledCreate: false, showMessage: false });
        }
        else {
            this.setState({ checkSenha: e.target.value, disabledCreate: true, showMessage: true });
        }
    }

    stateOptions = () => {
        let estados = [];
        const siglasEstados = ["-", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RR", "RO", "RJ", "RN", "RS", "SC", "SP", "SE", "TO"];

        for (let i = 0; i < siglasEstados.length; i++) {
            estados.push(<option key={i} value={siglasEstados[i]}>{siglasEstados[i]}</option>);
        }
        return estados;
    }

    render() {
        return (
            <div className="register-container">
            <Navbar isRegister={true}/>
                <div className='div-cadastro'>
                    <form className='cadastro' onSubmit={this.handleSubmit}>
                        <h4 className="title-text-register">Por favor, preencha os campos abaixo com seus dados:</h4>
                        <div className='div-register-content'>
                            <div className='div-form'>
                                <div className="input-field-container">
                                    <label className="label-register">Tipo</label>
                                    <input className="input-register" list="tipos" id='tipo' onBlur={this.handleBlur} />
                                    <datalist id="tipos">
                                        <option value="Produtor" />
                                        <option value="Consumidor" />
                                    </datalist>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Nome</label>
                                    <input className="input-register" id='nome' onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">CPF/CNPJ</label>
                                    <input className="input-register" id='cpf_cnpj' type="number" onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Telefone</label>
                                    <input className="input-register" id='telefone' type="number" onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Estado</label>
                                    <select className="input-register" onChange={this.handleStateDropdown} id='estado' onBlur={this.handleBlur}>
                                        {this.stateOptions()}
                                    </select>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Cidade</label>
                                    <input className="input-register" id='cidade' onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">CEP</label>
                                    <input className="input-register" id='cep' type="number" onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Logradouro</label>
                                    <input className="input-register" id='logradouro' onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Nº</label>
                                    <input className="input-register" id='numero' type="number" onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Complemento</label>
                                    <input className="input-register" id='complemento' onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">E-mail</label>
                                    <input className="input-register" id='email' type='email' onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Senha</label>
                                    <input className="input-register" id='senha' type='password' onBlur={this.handleBlur}></input>
                                </div>
                                <div className="input-field-container">
                                    <label className="label-register">Confirmar Senha</label>
                                    <input className="input-register" id='checkSenha' type='password' onChange={this.handleCheckPassword} onBlur={this.handleBlur}></input>
                                </div>
                            </div>
                            <div className='button-container'>
                                <Button text="Cadastrar-se" type="submit" disabled={this.state.disabledCreate}/>
                                {this.state.showMessage && <span className="text-error">Senha não confere</span>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}
