import { useState } from "react";
import Button from 'react-bootstrap/Button';


function AddForm () {

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        items: [],
        otherItems: "",
    })
    const [areOtherItems, setAreOtherItems] = useState(false)

    function handleOthers () {
        //Show others text input field if other checkbox is ticked
        if (!areOtherItems) {
            setAreOtherItems(true)
            document.getElementById("otherItems").classList.remove("hide")
        } else {
            setAreOtherItems(false)
            document.getElementById("otherItems").classList.add("hide")
        }
    }

    function addItems(event) {
        const value = event.target.value;
        if (!formData.items.includes(value)) {
          setFormData(prevData => ({
            ...prevData,
            items: [...prevData.items, value],
          }));
        } else {
          setFormData(prevData => ({
            ...prevData,
            items: prevData.items.filter(item => item !== value),
          }));
        }
      }

    function handleSubmit (event) {
        event.preventDefault();
        fetch("http://localhost:4000/listings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
        .then(response => response.json())
        .then(json => console.log(json))
        
        }
    

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date-input">Date found:</label>
                <input id="date-input" type="date" value={formData.date} onChange={(event)=>setFormData({...formData, date: event.target.value})}/>
                <label htmlFor="time-input">Time found:</label>
                <input id="time-input" type="time" value={formData.time} onChange={(event)=>setFormData({...formData, time: event.target.value})}/>
                <div>
                    <label htmlFor="kitchenware">Kitchenware</label><input id="kitchenware" value="kitchenware" type="checkbox" onChange={addItems}/>
                    <label htmlFor="furniture">Furniture</label> <input id="furniture" value="furniture" type="checkbox" onChange={addItems}/>
                    <label htmlFor="electricals">Electricals</label> <input id="electricals" value="electricals" type="checkbox" onChange={addItems}/>
                    <label htmlFor="others">Other itmes</label> <input id="others" value="others" type="checkbox" onChange={handleOthers}/>
                </div>
                <div id="otherItems" className="hide">
                    <label htmlFor="other-input">Please add other items:</label>
                    <input id="other-input" type="text" value={formData.otherItems} onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}/>
                </div>
                {/* <label htmlFor="image">Upload an image:</label><input type="file" onChange={(event)=>console.log(event.target.value)}/> */}
                <br/>
                <Button type="submit">Submit</Button>
            </form>
        </>
    )
}

export default AddForm