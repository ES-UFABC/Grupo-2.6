import React, { Component } from "react";
import { setLogin } from "../middleware/servicesCadastro";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import "./navbar.css";

// export function getUser() {
//   const login = Navbar.getUser();
//   return login;
// }

import {
  modificaEmail,
  modificaId,
  modificaNome,
  modificaAuth,
} from "../../src/redux/actions/AutenticationActions";
import Button from "./button";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: "",
        senha: "",
        auth: false,
      },
      redirect: false,
      url: "",
      isRegister: false,
    };
  }

  SetUser = (user) => {
    this.props.modificaNome(user.nome);
    this.props.modificaEmail(user.email);
    this.props.modificaId(user.id_usuario);
    localStorage.setItem("email", user.email);
    localStorage.setItem("id", user.id_usuario);
  };

  setEmail = (email, id) => {
    console.log("ATUALIZANDO PROPS");
    this.props.modificaEmail(email);
    this.props.modificaId(id);
  };

  handleBlur = (e) => {
    const { login } = this.state;
    let newLogin = login;

    newLogin[e.target.id] = e.target.value;
    // console.log(e.target.value);
    this.setState({ login: newLogin });
    // console.log(login);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { login } = this.state;
    try {
      var response = await setLogin(login);
      //   console.log(response);
      this.loginRedirect(response);
    } catch (error) {
      alert("Erro ao logar: " + error.message);
    }
  };

  handleLogout = () => {
    console.log("handle logout");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    this.setState({ isRegister: false, logout: true });
  };

  loginRedirect = (response) => {
    if (response.status === 200) {
      const { login } = this.state;
      this.setState({
        login: {
          email: login.email,
          senha: login.senha,
        },
      });
      this.props.modificaAuth(true);
      this.SetUser(response.data);
      if (response.data.tipo === "Produtor") {
        console.log("redirecionando produtor...");
        this.redirect = true;
        this.setState({
          redirect: true,
          url: "/produtor",
        });
      } else {
        console.log("redirecionando consumidor...");
        this.redirect = true;
        this.setState({
          redirect: true,
          url: "/consumidor",
        });
      }
    } else {
      alert("Erro ao efetuar o login");
    }
  };

  handleRegister = () => {
    window.location.href = "/cadastro";
  };

  componentDidMount() {
    try {
      console.log("localStorage email: " + localStorage.getItem("email"));

      if (localStorage.getItem("email") !== null) {
        this.props.modificaAuth(true);

        this.setEmail(
          localStorage.getItem("email"),
          localStorage.getItem("id")
        );
      }

      if (this.props.isRegister) {
        this.setState({
          isRegister: true,
        });
      }
      this.mounted = true;
    } catch (e) {
      console.log("ERROR" + e.message);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    // const auth = this.state.login.auth;
    // const { user } = useSelector((state) => console.log(state));
    const { login } = this.state;
    const { nome, email, id } = this.props;

    if (this.state.logout) {
      console.log("deslogando...");
      window.location.href = "/";
    }

    if (this.redirect && window.location.href !== "/produtor") {
      this.redirect = false;
      return <Navigate to={this.state.url} />;
    }

    return (
      <>
        <header>
          <div>
            <h1
              className="title-geral"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <span className="navbar-title">SMA Handshake</span>
            </h1>
          </div>
          {!this.props.auth && !this.state.isRegister && (
            <div className="login-div">
              <form className="form-container" onSubmit={this.handleSubmit}>
                <div className="field-container user-container">
                  <label className="form-text">Usuário</label>
                  <input id="email" onBlur={this.handleBlur}></input>
                </div>
                <div className="field-container password-container">
                  <label className="form-text">Senha</label>
                  <input
                    id="senha"
                    type="password"
                    onBlur={this.handleBlur}
                  ></input>
                </div>
                <Button text="Entrar" type="submit" classType="secondary" />
              </form>
              <span> | </span>
              <Button
                text="Cadastrar-se"
                classType="dark"
                onClick={this.handleRegister}
              />
            </div>
          )}
          {this.props.auth && (
            <div>
              <p>{email}</p>
              <Button text="Logout" onClick={this.handleLogout}></Button>
            </div>
          )}
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.AutenticationReducer.nome,
  email: state.AutenticationReducer.email,
  id: state.AutenticationReducer.id,
  auth: state.AutenticationReducer.auth,
});

export default connect(mapStateToProps, {
  modificaEmail,
  modificaId,
  modificaNome,
  modificaAuth,
})(Navbar);
