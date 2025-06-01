import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateProduct from "./pages/CreateProduct";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/create" element={ <CreateProduct/> } />
      </Routes>
    </>
  )
}

export default App