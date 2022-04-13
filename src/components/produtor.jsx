import React, {Component} from 'react';

import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { setProduto } from '../middleware/servicesProduto';

const data = [{
    id: 1,
    commodity: 'soja',
    data_disponivel: new Date(),
    quantidade: 10,
    preco: 90,

}]

export default class Produtor extends Component {
    
    state = {
        cadastro_venda: {
        commodity: '',
        data_disponivel: '',
        quantidade: 0,
        preco: 0,
    }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
    }

    onInsertHandler = async (ev) => {
        console.log(ev.data)
        const data = {commodity: ev.data.commodity, preco: ev.data.preco, quantidade: ev.data.quantidade, data_disponivel: ev.data.data_disponivel}
        console.log(data)
        var response = await setProduto(data)
        console.log(response)
    }


    render() {

        return (

            <>
            <div className='std-div'>
            <h1>Perfil do Produtor</h1>
                <DataGrid
                    dataSource={data}
                    onRowInserting={this.onInsertHandler}>
                    <Paging enabled={false} />
                    <Editing
                        mode='popup'
                        allowAdding={true}
                        allowUpdating={true}
                        allowDeleting={true}>
                            <Popup title='Registrar' showTitle={true} width={700} height={500} />
                            <Column dataField="data_disponivel" dataType="date"></Column>
                            <Form>
                                <Item dataField = 'commodity'/>
                                <Item dataField = 'data_disponivel' dataType='date'/>
                                <Item dataField = 'quantidade' />
                                <Item dataField = 'preco' />

                            </Form>
                        </Editing>
                </DataGrid>
            </div>
            </>

        

        )
    }

}