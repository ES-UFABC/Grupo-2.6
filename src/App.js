
import './App.css';
import 'devextreme/dist/css/dx.greenmist.css';

import {
  BrowserRouter,
  Switch,
  Route,
  Routes,
 
} from "react-router-dom";

import Home from './components/home'
import Navbar from './components/navbar'
import Cadastro from './components/cadastro'
import Produtor from './components/produtor'
import Consumidor from './components/consumidor'
import Menu from './components/menu'


function App() {
  return (
    <BrowserRouter>
    {/* <Menu/> */}
    <Routes>
        <Route exact path='/' element={<><Navbar/> <Home/> </>} />
        <Route exact path='/cadastro' element={<><Navbar/><Cadastro/></>} />
        <Route exact path='/produtor' element={<Produtor/>} />
        <Route exact path='/consumidor' element={<Consumidor/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
