import BookNavBar from "./components/BookNavBar/BookNavBar";
import LandingPage from "./screens/LandingPage/LandingPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductPage from "./screens/ProductPage/ProductPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import CartPage from "./screens/CartPage/CartPage";
import OrderPage from "./screens/OrderPage/OrderPage";
import 'react-toastify/dist/ReactToastify.css';
 
const App = ()=>{

  window.onunload = ()=>{
    localStorage.clear()
  }

  return(
    <BrowserRouter>
      <BookNavBar/>
      <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/book/:id" element={<ProductPage/>}/>
          <Route path="/user/login" element={<LoginPage/>}/>
          <Route path="/user/register" element={<RegisterPage/>}/>
          <Route path="/user/cart" element={<CartPage/>}/>
          <Route path="/user/orders" element={<OrderPage/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App