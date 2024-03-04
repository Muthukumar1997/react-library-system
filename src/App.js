import Register from "./Register/Register";
import Login from "./Login/Login";
import Table from "./Table/Table";
import './assets/font-awesome/css/font-awesome.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="" element={<Register/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="table" element={<Table/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
