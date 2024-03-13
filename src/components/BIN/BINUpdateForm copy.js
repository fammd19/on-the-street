import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function UpdateForm ({listingDetails}) {
    const [updateFormData, setUpdateFormData] = useState({
        id:listingDetails.id,
        dateUpdated: listingDetails.dateUpdated,
        timeUpdated: listingDetails.timeUpdated,
        items: listingDetails.items,
        otherItems: listingDetails.otherItems,
    })

    console.log(updateFormData.otherItems)

    // function removeItem (event) {
    //     event.preventDefault();
    //     event.target.parentNode.classList.add("strike")
    //     event.target.nextSibling.classList.remove("hide")
    //     event.target.classList.add("hide")
    // }

    // function addItem (event) {
    //     event.preventDefault();
    //     event.target.parentNode.classList.remove("strike")
    //     event.target.previousSibling.classList.remove("hide")
    //     event.target.classList.add("hide")
    // }

    function addItems(event) {
        const value = event.target.value;
        if (!updateFormData.items.includes(value)) {
          setUpdateFormData(prevData => ({
            ...prevData,
            items: [...prevData.items, value],
          }));
        } else {
            setUpdateFormData(prevData => ({
            ...prevData,
            items: prevData.items.filter(item => item !== value),
          }));
        }
      }
    
    function handleOthers () {
        //Show others text input field if other checkbox is ticked
        if (!updateFormData.otherItems) {
            document.getElementById("updateOtherItems").classList.remove("hide")
        } else {
            document.getElementById("updateOtherItems").classList.add("hide")
        }
    }

    function handleSubmit (event) {
        event.preventDefault();
        fetch(`http://localhost:4000/listings/${listingDetails.id}`, {
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
    <form onSubmit={handleSubmit}>
        <label htmlFor="date-input">Update date:</label>
        <input id="date-input" type="date" value={updateFormData.dateUpdated} onChange={(event)=>setUpdateFormData({...updateFormData, dateUpdated: event.target.value})}/>
        <label htmlFor="time-input">Update time:</label>
        <input id="time-input" type="time" value={updateFormData.timeUpdated} onChange={(event)=>setUpdateFormData({...updateFormData, timeUpdated: event.target.value})}/>
        <div>
            {/* {updateFormData.items.map(item => <> </>*/}
            <label htmlFor="kitchenware">Kitchenware</label><input id="kitchenware" value="kitchenware" type="checkbox" onChange={addItems}/>
            <label htmlFor="furniture">Furniture</label> <input id="furniture" value="furniture" type="checkbox" onChange={addItems}/>
            <label htmlFor="electricals">Electricals</label> <input id="electricals" value="electricals" type="checkbox" onChange={addItems}/>
        </div>
        <div id="updateOtherItems">
            <label htmlFor="other-input">Other items:</label>
            <input id="other-input" type="text" placeholder={!updateFormData.otherItems ? "N/A ": updateFormData.otherItems } value={updateFormData.otherItems} onChange={(event)=>setUpdateFormData({...updateFormData, otherItems: event.target.value})}/>
        </div>
        <Button type="submit">Submit updates</Button>
        <p id="success-prompt" className="hide">Form submitted successfully</p>
    </form>
    )
}

export default UpdateForm

