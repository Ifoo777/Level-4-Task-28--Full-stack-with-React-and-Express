import React,{useState} from 'react'
import { carsApiAmend } from './CarsApiAmend';

// Function to update data on the system
function CarsPut() {

    // Declare state
    const[started, setStarter]= useState(false);
    const[error,setError] = useState(null);
    const[isLoaded,setIsLoaded] = useState(false);
    
    const[amendId,setAmendId] = useState(-1);
    const[amendMake,setAmendMake] = useState("");
    const[amendModel,setAmendModel] = useState("");
    const[amendSeats,setAmendSeats] = useState("");
    const[amendImg,setAmendImg] = useState("");

    const[amendedCar,setAmendedCar] = useState([])
   

    // Fetch the data from the API and Update
    function componentDidMount(amendId,amendMake,amendModel,amendSeats,amendImg) {

        // If a negative number or empty - return showing not updated
        if(amendId ==="" || amendId<0 ){
            setIsLoaded(true);
            setAmendedCar({id:`${amendId}`,make:"Not Updated",model:"N/A",seats:"N/A",img:"https://toppng.com/uploads/preview/cross-wrong-cross-transparent-background-11562851969ihtu0kgnjy.png"});
        }
        // Get data from Api and update
        else{
            //Method
            let method = "PUT";
            // Data in Correct Format
            amendMake = amendMake.replace(" ", "_");
            amendModel = amendModel.replace(" ", "_");
            amendSeats = amendSeats.replace(" ", "_");
        
            let data = {id:`${amendId}`,make:`${amendMake}`,model:`${amendModel}`,seats:`${amendSeats}`, img:`${amendImg}`}
            
            // Fetch data from API and update
            carsApiAmend(`cars/`,method,data )
            .then(result => {
                setIsLoaded(true);
                setAmendedCar(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
        }
    }

    //If not started yet , show fields to complete and submit
    if(started === false){
        return(<div>
                <h2>UPDATE CAR BY ID</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>ID:</td>
                            <td><input name="id" type="number" onChange={e => {setAmendId(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>MAKE:</td>
                            <td><input name="make" type="text" onChange={e => {setAmendMake(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>MODEL:</td>
                            <td><input name="model" type="text" onChange={e => {setAmendModel(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>SEATS:</td>
                            <td><input name="seats" type="number" onChange={e => {setAmendSeats(e.target.value)}}/></td>
                        </tr>
                        <tr>
                            <td>IMAGE LINK ON INTERNET:</td>
                            <td><input name="seats" type="text" onChange={e => {setAmendImg(e.target.value)}}/></td>
                        </tr>               
                    </tbody>
                </table>
                <button onClick={() =>{ componentDidMount(amendId,amendMake,amendModel,amendSeats,amendImg); setStarter(true)}}>UPDATE CAR</button>
            </div>)
    }
    else if (error) { return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) { return <div>Loading...</div>;
    } 
    else {
        // Show results, information before and after update
        return(
        <div> 
            <h2>UPDATED CAR:</h2>
            <table>
                <thead>
                    <tr>
                    <th>ID</th><th>MAKE</th><th>MODEL</th><th>SEATS</th><th>IMAGE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td colSpan={5}>AMENDED FROM</td>
                    </tr>
                    <tr>
                        <td>{amendedCar.id}</td>
                        <td>{amendedCar.make}</td>
                        <td>{amendedCar.model}</td>
                        <td>{amendedCar.seats}</td>
                        <td><td><img src={amendedCar.img} alt="car"></img></td></td>
                    </tr>
                    <tr>
                      <td colSpan={5}>AMENDED TO</td>
                    </tr>
                    <tr>
                        <td>{amendId}</td>
                        <td>{amendMake}</td>
                        <td>{amendModel}</td>
                        <td>{amendSeats}</td>
                        <td><td><img src={amendImg} alt="car"></img></td></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() =>{ setStarter(false)}}>CLOSE INFORMATION</button>
        </div>
      )
    }
}

export default CarsPut