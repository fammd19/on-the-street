import { useState } from "react";
import Button from 'react-bootstrap/Button';


function AddForm () {

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        address: "",
        suburb:"",
        postcode:"",
        items: [],
        otherItems: "",
        dateUpdated: "",
        timeUpdated: ""
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
        console.log("Submit")
        fetch("http://localhost:4000/listings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
          .then(response => response.json())
          .then(json => console.log(json))
          .catch(error => console.log(error.message))
          console.log("Submit")
          displayPrompt();
          // window.location.reload()
    }

    function displayPrompt () {
      let prompt = document.getElementById("success-prompt");
      prompt.classList.remove("hide");
      setTimeout(() => prompt.classList.add("hide"), 5000);
    }
  
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date-input">Date found:</label>
                <input id="date-input" type="date" value={formData.date} onChange={(event)=>setFormData({...formData, date: event.target.value})}/>
                <label htmlFor="time-input">Time found:</label>
                <input id="time-input" type="time" value={formData.time} onChange={(event)=>setFormData({...formData, time: event.target.value})}/>
                <br/>
                <label htmlFor="address-input">Address:</label>
                <input id="address-input" type="text" value={formData.address} onChange={(event)=>setFormData({...formData, address: event.target.value})}/>
                <label htmlFor="suburb-input">Suburb:</label>
                <input id="suburb-input" type="text" value={formData.suburb} onChange={(event)=>setFormData({...formData, suburb: event.target.value})}/>
                <label htmlFor="postcode-input">Postcode:</label>
                <input id="postcode-input" type="text" value={formData.postcode} onChange={(event)=>setFormData({...formData, postcode: event.target.value})}/>
                <div id="checkboxes">
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
                <p id="success-prompt" className="hide">Form submitted successfully</p>
            </form>
        </>
    )
}

export default AddForm