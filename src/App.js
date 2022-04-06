
import './App.css';

import Register from './components/register';
import Signin from './components/signin';
import {BrowserRouter,Route,Routes,Switch} from "react-router-dom";
import HeaderOne from './components/common components/HeaderOne';
import HeaderTwo from './components/common components/HeaderTwo';
import HomePage from './components/HomePage/HomePage';
import Product from './components/Sub-Home/SubHome';
import UserProducts from "./components/userProducts/UserProducts"

function App() {
  return (
    <div className="App">
      
      
       <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Signin} />
        <Route path='/register' exact component={Register} />
        <Route path='/products' exact component={HomePage}/>
        <Route path='/product' exact component={Product}/>
        <Route path='/userproducts' exact component={UserProducts}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
