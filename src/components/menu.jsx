import React, {Component} from 'react'
import TabPanel from 'devextreme-react/tab-panel';


export default class Menu extends Component {

    render(){
        return (
            <>
            <TabPanel
                itemTitleRender='Menu'
                dataSource={[{teste: 1, i: 2}]}>

            </TabPanel>
            </>
        )
    }

}