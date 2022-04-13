import React, { Component } from 'react';

import DataGrid, {
    Column,
    Editing,
    Popup,
    Paging,
    Lookup,
    Form,
    Item,
    Button,
} from 'devextreme-react/data-grid';
import { Form as FormStd, SimpleItem, ButtonItem, GroupItem } from 'devextreme-react/form';
import { Popup as StdPopup, Position, ToolbarItem, } from 'devextreme-react/popup';

const data = [{
    id: 1,
    commodity: 'soja',
    disponibilidade: '2022/05/01',
    quantidade: 10,
    preco: 90,

}]

const commoditiesOptions = { items: ['Milho', 'Soja', 'Trigo'], searchEnabled: true, value: '' };
const statesOptions = { items: ['São Paulo', 'Bahia', 'Rio de Janeiro'], searchEnabled: true, value: '' };
const popupButtonOptions = { text: 'Comprar', width: 100 }

const buttonOptions = {
    text: 'Buscar',
    type: 'success',
    useSubmitBehavior: true,
    width: 200
}

export default class Consumidor extends Component {

    state = {
        busca_dados: {
            commodity: '',
            estado: '',
        },
        visiblePopup: false,
    }



    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        console.log(this.state.busca_dados)
    }

    handleChange = (e) => {

        const { busca_dados } = this.state
        let newDados = busca_dados

        console.log(e.value)

        newDados[e.dataField] = e.value
        this.setState({ busca_dados: newDados });

    }

    handlePurchase = (e) => {
        console.log('Compra!')

        this.setState({ visiblePopup: true })

        console.log(this.state.visiblePopup)
    }

    handleHide = (e) => {
        console.log('Close!')

        this.setState({ visiblePopup: false })

        console.log(this.state.visiblePopup)
    }

    render() {

        const busca_dados = this.state.busca_dados;

        return (

            <>
                <div>
                    <div className='std-div'>
                        <h1>Perfil do Consumidor</h1>
                        <form onSubmit={this.handleSubmit}>
                            <FormStd
                                width={800}
                                colCount={1}
                                formData={busca_dados}
                                onFieldDataChanged={this.handleChange}>
                                <GroupItem caption='Busca' colCount={3} >

                                    <SimpleItem dataField='commodity'
                                        editorType='dxSelectBox'
                                        editorOptions={commoditiesOptions} />
                                    <SimpleItem dataField='estado' editorType='dxSelectBox' editorOptions={statesOptions}></SimpleItem>
                                    <ButtonItem
                                        buttonOptions={buttonOptions}
                                    >

                                    </ButtonItem>

                                </GroupItem>
                            </FormStd>
                        </form>
                    </div>
                </div>
                <div className='std-div'>

                    <DataGrid
                        dataSource={data}
                    >

                        <Paging enabled={false} />
                        <Column dataField='commodity' />
                        <Column dataField='disponibilidade' />
                        <Column dataField='quantidade' />
                        <Column dataField='preco' />
                        <Column type='buttons'>
                            <Button
                                text='Comprar'
                                icon='money'
                                onClick={this.handlePurchase}
                            />
                        </Column>

                        <Form>

                            <Item dataField='commodity' />
                            <Item dataField='disponibilidade' />
                            <Item dataField='quantidade' />
                            <Item dataField='preco' />
                        </Form>
                    </DataGrid>
                </div>

                <StdPopup
                    visible={this.state.visiblePopup}
                    onHiding={this.handleHide}
                    showCloseButton={true}
                    // closeOnOutsideClick={this.handleHide}
                    showTitle={true}
                    title='Compra'
                    width={420}
                    height={250}
                >

                    <ToolbarItem text='Quantidade'
                        toolbar="bottom"
                        location="center" />
                    <ToolbarItem widget='dxTextBox'
                        toolbar="bottom"
                        location="center" />
                    <ToolbarItem widget='dxButton'
                        options={popupButtonOptions}
                        toolbar="bottom"
                        location="center" />

                    <p>Preço: <span>{data[0].preco}</span></p>
                    <p>Valor: <span>{data[0].preco}</span></p>


                </StdPopup>
            </>
        )
    }
}