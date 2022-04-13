import React, { Component } from 'react'
import { setCadastro } from '../middleware/servicesCadastro';
import '../components/cadastro.css';
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

            <>
                <div>
                </div>
                <div className='div-cadastro'>
                    <form className='cadastro' onSubmit={this.handleSubmit}>
                        <h1>Cadastro</h1>
                        <div className='div-global'>
                            <div className='div-form'>
                                <label>Tipo</label>
                                <input list="tipos" id='tipo' onBlur={this.handleBlur} />
                                <datalist id="tipos">
                                    <option value="Produtor" />
                                    <option value="Consumidor" />
                                </datalist>
                                <label>Nome</label>
                                <input id='nome' onBlur={this.handleBlur}></input>
                                <label>CPF/CNPJ</label>
                                <input id='cpf_cnpj' onBlur={this.handleBlur}></input>
                                <label>Telefone</label>
                                <input id='telefone' onBlur={this.handleBlur}></input>
                                <label>Estado</label>
                                <select onChange={this.handleStateDropdown} id='estado' onBlur={this.handleBlur}>
                                    {this.stateOptions()}
                                </select>
                                <label>Cidade</label>
                                <input id='cidade' onBlur={this.handleBlur}></input>
                            </div>
                            <div className='div-form'>
                                <label>CEP</label>
                                <input id='cep' onBlur={this.handleBlur}></input>
                                <label>Logradouro</label>
                                <input id='logradouro' onBlur={this.handleBlur}></input>
                                <label>Nº</label>
                                <input id='numero' onBlur={this.handleBlur}></input>
                                <label>Complemento</label>
                                <input id='complemento' onBlur={this.handleBlur}></input>
                                <label>E-mail</label>
                                <input id='email' type='email' onBlur={this.handleBlur}></input>
                                <label>Senha</label>
                                <input id='senha' type='password' onBlur={this.handleBlur}></input>
                                <label>Confirmar Senha</label>
                                <input id='checkSenha' type='password' onChange={this.handleCheckPassword} onBlur={this.handleBlur}></input>
                            </div>
                            <div className='button-container'>
                                <button disabled={this.state.disabledCreate} className='confirmar-cadastro'>Cadastrar-se</button>
                                {this.state.showMessage && <span className="text-error">Senha não confere</span>}
                            </div>
                        </div>
                    </form>
                </div>
            </>

        )
    }

}