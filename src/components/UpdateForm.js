import { useState } from "react";
import { Button, Form, Col, Row, Alert } from 'react-bootstrap';


function UpdateForm ( {listing} ) {

    const [updateFormData, setUpdateFormData] = useState({
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
            updateFormData.otherItems=""
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
          setUpdateFormData({
            dateUpdated: listing.dateUpdated,
            timeUpdated: listing.timeUpdated,
            items: [],
            otherItems: listing.otherItems,
        })
    }

    function displayPrompt () {
      let prompt = document.getElementById("success-prompt");
      prompt.classList.remove("hide");
      setTimeout(() => prompt.classList.add("hide"), 5000);
    }
  
    return (
        <>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Row>
                <Col sm={5} md={4} lg={4}>
                  <Form.Label className="mb-1" htmlFor="date-update">Date updated:</Form.Label>
                  <Form.Control required id="date-update" type="date" onChange={(event)=>setUpdateFormData({...updateFormData, dateUpdated: event.target.value})}/>
                </Col>
                <Col sm={5} md={4} lg={4}>
                  <Form.Label className="mb-1" htmlFor="time-update">Time updated:</Form.Label>
                  <Form.Control required id="time-updatet" type="time" onChange={(event)=>setUpdateFormData({...updateFormData, timeUpdated: event.target.value})}/>
                </Col>
              </Row>
              <Row id="checkboxes" className="mb-1 mx-1 my-3">
                <Form.Check label="Kitchenware" id="kitchenware" value="Kitchenware" type="checkbox" onChange={addItems}/>
                <Form.Check label="Furniture" id="furniture" value="Furniture" type="checkbox" onChange={addItems}/>
                <Form.Check label="Electricals" id="electricals" value="Electricals" type="checkbox" onChange={addItems}/>
                <Form.Check label="Other items" id="others" value="Others" type="checkbox" onChange={handleOthers}/>
              </Row>
              <div id="otherItems" className="hide">
                <Col sm={8} md={7} lg={6}>
                  <Form.Label htmlFor="other-input">Please add other items:</Form.Label>
                  <Form.Control id="other-input" type="text" value={updateFormData.otherItems} onChange={(event)=>setUpdateFormData({...updateFormData, otherItems: event.target.value})}/>
                </Col>
              </div>
              {/* <label htmlFor="image">Upload an image:</label><input type="file" onChange={(event)=>console.log(event.target.value)}/> */}
              <br/>
              {
                  updateFormData.items.length > 0 || areOtherItems === true
                  ?
                  <Button type="submit">Submit</Button>
                  :
                  <Button disabled type="submit">Submit</Button>
                }
              <Alert variant="success" id="success-prompt" className="hide">Form submitted successfully</Alert>
            </Form>
        </>
    )
}

export default UpdateForm