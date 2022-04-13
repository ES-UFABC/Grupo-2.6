import { Component } from "react";
import styles from "./header.module.css";
import logo from "../assets/images/logo.png";
import { browserHistory } from "react-router";


class Header extends Component {
    constructor(props) {
      super(props);
    }

    handleClientPage = () => {
        browserHistory.push("/clients");
        }

        
  render() { return(
<div classname={styles.container}>
<img classname={styles.imgLogo} src={logo} alt="logo da empresa" style={{width: '64px'}}/>
<div className={styles.buttonContainer}>
      <button className={styles.buttonOption} onClick={this.handleClientPage} >
        <span classname={styles.textButtonOption}>Para Clientes</span>
      </button>
      <button className={styles.buttonOption}  >
        <span classname={styles.textButtonOption}>Para Agricultores</span>
      </button>
      <button className={styles.buttonOption}  >
        <span classname={styles.textButtonOption}>Quem Somos</span>
      </button>
      <button className={styles.buttonOption}  >
        <span classname={styles.textButtonOption}>Acesse/Crie sua conta</span>
      </button>
    </div>
</div>

  )}
  }
  export default Header;