import { useState } from "react";
import Button from 'react-bootstrap/Button';


function UpdateForm ( {listing} ) {

    const [updateFormData, setUpdateFormData] = useState({
        // dateUpdated: listing.dateUpdated,
        // timeUpdated: listing.timeUpdated,
        // items: listing.items,
        // otherItems: listing.otherItems,
        dateUpdated: listing.dateUpdated,
        timeUpdated: listing.timeUpdated,
        items: [],
        otherItems: listing.otherItems,
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
        if (!updateFormData.items.includes(value)) {
          setUpdateFormData(prevData => ({
            ...prevData,
            items: [...prevData.items, value],
          }));
          console.log("if " + updateFormData.items)
        } else {
            setUpdateFormData(prevData => ({
            ...prevData,
            items: prevData.items.filter(item => item !== value),
          }));
          console.log("else " + updateFormData.items)
        }
      }

    function handleSubmit (event) {
        event.preventDefault();
        fetch(`http://localhost:4000/listings/${listing.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateFormData),
          })
          .then(response => response.json())
          .then(json => console.log(json))
          displayPrompt();
    }

    function displayPrompt () {
      let prompt = document.getElementById("success-prompt");
      prompt.classList.remove("hide");
      setTimeout(() => prompt.classList.add("hide"), 5000);
    }
  
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date-update">Date updated:</label>
                <input id="date-update" type="date" onChange={(event)=>setUpdateFormData({...updateFormData, dateUpdated: event.target.value})}/>
                <label htmlFor="time-update">Time updated:</label>
                <input id="time-updatet" type="time" onChange={(event)=>setUpdateFormData({...updateFormData, timeUpdated: event.target.value})}/>
                <br/>
                <div id="checkboxes">
                    <label htmlFor="kitchenware">Kitchenware</label><input id="kitchenware" value="kitchenware" type="checkbox" onChange={addItems}/>
                    <label htmlFor="furniture">Furniture</label> <input id="furniture" value="furniture" type="checkbox" onChange={addItems}/>
                    <label htmlFor="electricals">Electricals</label> <input id="electricals" value="electricals" type="checkbox" onChange={addItems}/>
                    <label htmlFor="others">Other itmes</label> <input id="others" value="others" type="checkbox" onChange={handleOthers}/>
                </div>
                <div id="otherItems" className="hide">
                    <label htmlFor="other-input">Please add other items:</label>
                    <input id="other-input" type="text" value={updateFormData.otherItems} onChange={(event)=>setUpdateFormData({...updateFormData, otherItems: event.target.value})}/>
                </div>
                {/* <label htmlFor="image">Upload an image:</label><input type="file" onChange={(event)=>console.log(event.target.value)}/> */}
                <br/>
                <Button type="submit">Submit</Button>
                <p id="success-prompt" className="hide">Form submitted successfully</p>
            </form>
        </>
    )
}

export default UpdateForm