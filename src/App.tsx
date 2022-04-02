import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import AddPeople from "./pages/add people/AddPeople";
import Home from "./pages/home/Home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-people' element={<AddPeople />} />
      </Routes>
    </div>
  );
}

export default App;
