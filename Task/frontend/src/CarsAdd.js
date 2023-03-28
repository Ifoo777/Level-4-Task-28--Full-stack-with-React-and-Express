import React,{useState} from 'react'
import { carsApiAmend } from './CarsApiAmend';

// Add Cars to the System
function CarsAdd() {

    // Declare state
    const[started, setStarter]= useState(false);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
        
    const[addMake,setAddMake] = useState("");
    const[addModel,setAddModel] = useState("");
    const[addSeats,setAddSeats] = useState("");
    const[addImg,setAddImg] = useState("");

    const[addCar,setAddCar] = useState([])
   

    // Fetch from and add data to the API
    function componentDidMount(addMake,addModel,addSeats,addImg) {
        

        //Method Post(Add)
        let method = "POST";
        // Data in Correct Format - slug
        addMake = addMake.replace(" ", "_");
        addModel = addModel.replace(" ", "_");
        addSeats = addSeats.replace(" ", "_");
        
        // Structure data correct format
        let data = {make:addMake,model:addModel,seats:addSeats,img:addImg}
        
        // Fetch data from API and update
        carsApiAmend(`/cars`,method,data )

        .then(result => {
            setIsLoaded(true);
            setAddCar(result);
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        })
    }
  

    // If started is false, display input fields
    if(started === false){
        return(<div>
                <h2>ADD CAR TO SYSTEM</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>MAKE:</td>
                            <td><input name="make" type="text" onChange={e => {setAddMake(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>MODEL:</td>
                            <td><input name="model" type="text" onChange={e => {setAddModel(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>SEATS:</td>
                            <td><input name="seats" type="number" onChange={e => {setAddSeats(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>IMAGE LINK ON INTERNET:</td>
                            <td><input name="seats" type="text" onChange={e => {setAddImg(e.target.value)}}/></td>
                        </tr>                
                    </tbody>
                </table>
                <button onClick={() =>{ componentDidMount(addMake,addModel,addSeats,addImg); setStarter(true)}}>ADD CAR</button>
            </div>)
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        // Return result of Car that was added successfully
        return(
        <div>
            <h2>CAR SUCCESSFULLY ADDED:</h2>   
            <table>
                <thead>
                    <tr>
                    <th>ID</th><th>MAKE</th><th>MODEL</th><th>SEATS</th><th>IMAGE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{addCar.id}</td>
                        <td>{addCar.make}</td>
                        <td>{addCar.model}</td>
                        <td>{addCar.seats}</td>
                        <td><img src={addCar.img} alt="car"></img></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() =>{ setStarter(false)}}>CLOSE INFORMATION</button>
        </div>
      )
    }
}

export default CarsAdd