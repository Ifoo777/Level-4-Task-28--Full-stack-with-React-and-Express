import './App.css';
import DisplayAllCars from './DisplayAllCars';
import CarsSearch from './CarsSearch';
import CarsAdd from './CarsAdd';
import CarsDelete from './CarsDelete';
import CarsPut from './CarsPut';
import logo from './images/logo.jpg';

// Display all the pages inside App
function App() {
  return (
    <div className="App">
      <h1><span>WELCOME TO CAR STORAGE  </span><span><img src={logo} alt="logo" id="logo"></img></span></h1>
      <br/><hr/>
      <DisplayAllCars/>
      <br/>
      <hr/>
      <CarsSearch/>
      <br/>
      <hr/>
      <CarsAdd/>
      <br/>
      <hr/>
      <CarsDelete/>
      <br/>
      <hr/>
      <CarsPut/>
      <br/>
    </div>
  );
}

export default App;
