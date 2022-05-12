import React, { Component } from "react";
import { connect } from "react-redux";
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
} from "devextreme-react/data-grid";
import "devextreme-react/text-area";
import { Item } from "devextreme-react/form";
import {
  setProduto,
  getOfertas,
  getCommodities,
} from "../middleware/servicesProduto";
import Navbar from "./navbar";
import "./produtor.css";
import Button from "./button";

const data = [
  {
    id: 1,
    commodity: "soja",
    data_disponivel: new Date(),
    quantidade: 10,
    preco: 90,
  },
];

class Produtor extends Component {
  state = {
    cadastro_venda: {
      commodity: "",
      data_disponivel: "",
      quantidade: 0,
      preco: 0,
    },
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  dashboardRedirect = () => {
    window.location.href = "/dashboard";
  };

  onInsertHandler = async (ev) => {
    console.log(ev.data);
    const data = {
      preco: ev.data.preco,
      quantidade: ev.data.quantidade,
      data_disponivel: ev.data.data_disponivel,
      saldo: 0,
      usuario: this.props.id,
      commodity: ev.data.commodity,
    };
    console.log(data);
    var response = await setProduto(data);
    console.log(response);
  };

  getData = async () => {
    var commodities = await getCommodities();
    var ofertas = await getOfertas({ produtorId: this.props.id });
    console.log("commodities: ", commodities.data);
    this.setState({
      ofertas: ofertas.data,
      commodities: commodities.data,
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    console.log("produtorId(produtor.jsx): " + this.props.id);
    const { commodities } = this.state;
    return (
      <div className="producer-container">
        <Navbar />
        <h1 className="producer-title">Perfil do Produtor</h1>
        <div className="producer-search-container">
          <Button
            text="Dashboard"
            classType="dark"
            onClick={this.dashboardRedirect}
          />
          <DataGrid
            dataSource={this.state.ofertas}
            onRowInserting={this.onInsertHandler}
          >
            <Paging enabled={false} />
            {/* <Popup title='Registrar' showTitle={true} width={700} height={500} /> */}
            <Column dataField="commodity">
              <Lookup
                dataSource={commodities}
                displayExpr="commodity"
                valueExpr="commodity"
                allowClearing={true}
              ></Lookup>
            </Column>
            <Column dataField="quantidade" />
            <Column dataField="preco" />
            <Column dataField="data_disponivel" dataType="date"></Column>
            <Editing
              mode="popup"
              allowAdding={true}
              allowUpdating={true}
              allowDeleting={true}
            >
              <Form>
                <Item dataField="commodity" />
                <Item dataField="data_disponivel" dataType="date" />
                <Item dataField="quantidade" />
                <Item dataField="preco" />
              </Form>
            </Editing>
          </DataGrid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.AutenticationReducer.nome,
  email: state.AutenticationReducer.email,
  id: state.AutenticationReducer.id,
});

export default connect(mapStateToProps, {})(Produtor);
