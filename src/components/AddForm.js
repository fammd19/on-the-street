import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';


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
          setFormData({
            date: "",
            time: "",
            address: "",
            suburb:"",
            postcode:"",
            items: [],
            otherItems: "",
            dateUpdated: "",
            timeUpdated: ""
          });
    }

    function displayPrompt () {
      let prompt = document.getElementById("success-prompt");
      prompt.classList.remove("hide");
      setTimeout(() => prompt.classList.add("hide"), 5000);
    }
  
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={5} md={4} lg={3}>
                   <Form.Label className="my-3 mb-0" htmlFor="date-input">Date found:</Form.Label>
                   <Form.Control id="date-input" type="date" value={formData.date} onChange={(event)=>setFormData({...formData, date: event.target.value})}/>
                  </Col>
                  <Col sm={5} md={4} lg={3}>
                    <Form.Label className="my-3 mb-0" htmlFor="time-input">Time found:</Form.Label>
                    <Form.Control id="time-input" type="time" value={formData.time} onChange={(event)=>setFormData({...formData, time: event.target.value})}/>
                  </Col>
                </Row>
                <Row>
                  <Col sm={8} md={7} lg={6}>
                    <Form.Label className="my-3 mb-0" htmlFor="address-input">Address:</Form.Label>
                    <Form.Control id="address-input" type="text" value={formData.address} onChange={(event)=>setFormData({...formData, address: event.target.value})}/>
                  </Col>
                </Row>                
                <Row>
                  <Col sm={5} md={4} lg={3}>
                    <Form.Label className="my-3 mb-0" htmlFor="suburb-input">Suburb:</Form.Label>
                    <Form.Control id="suburb-input" type="text" value={formData.suburb} onChange={(event)=>setFormData({...formData, suburb: event.target.value})}/>
                  </Col>
                  <Col sm={5} md={4} lg={3}>
                    <Form.Label className="my-3 mb-0" htmlFor="postcode-input">Postcode:</Form.Label>
                    <Form.Control id="postcode-input" type="text" value={formData.postcode} onChange={(event)=>setFormData({...formData, postcode: event.target.value})}/>
                  </Col>
                </Row> 
                <Row id="checkboxes" className="mb-1 mx-1 my-3">
                    <Form.Check label="Kicthenware" id="kitchenware" value="Kitchenware" type="checkbox" onChange={addItems}/>
                    <Form.Check label="Furniture" id="furniture" value="Furniture" type="checkbox" onChange={addItems}/>
                    <Form.Check label="Electricals" id="electricals" value="Electricals" type="checkbox" onChange={addItems}/>
                    <Form.Check label="Other items" id="others" value="Others" type="checkbox" onChange={handleOthers}/>
                </Row>
                <div id="otherItems" className="hide">
                  <Col sm={8} md={7} lg={6}>
                      <Form.Label htmlFor="other-input">Please add other items:</Form.Label>
                      <Form.Control id="other-input" type="text" value={formData.otherItems} onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}/>
                    </Col>
                </div>
                {/* <label htmlFor="image">Upload an image:</label><input type="file" onChange={(event)=>console.log(event.target.value)}/> */}
                <br/>
                <Button type="submit">Submit</Button>
                <Alert id="success-prompt" variant="success" className="hide my-2">Form submitted successfully</Alert>
            </Form>
        </>
    )
}

export default AddForm