import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateProduct from "./pages/CreateProduct";
import HomePage from "./pages/homepage/index";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/create" element={ <CreateProduct/> } />
        <Route path="/" element={ <HomePage /> } />
      </Routes>
    </>
  )
}

export default App