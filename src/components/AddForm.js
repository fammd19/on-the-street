import { useState } from "react";
import { Button, Form, Col, Row, Alert } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom"


function AddForm (
  { formData,setFormData }
) {

    const [areOtherItems, setAreOtherItems] = useState(false)
    const [isKitchenware, setIsKitchenware] = useState(false)
    const [isFurniture, setIsFurniture] = useState(false)
    const [isElectricals, setIsElectricals] = useState(false)

    const navigate = useNavigate();

    function handleOthers () {
        //Show others text input field if other checkbox is ticked
        if (!areOtherItems) {
            setAreOtherItems(true)
            document.getElementById("otherItems").classList.remove("hide")
        } else {
            setAreOtherItems(false)
            document.getElementById("otherItems").classList.add("hide")
            formData.otherItems=""
        }
    }

    function handleKitchenware () {
      //Show others text input field if other checkbox is ticked
      if (!isKitchenware) {
          setIsKitchenware(true)
          document.getElementById("kitchenwareItems").classList.remove("hide")
      } else {
          setIsKitchenware(false)
          document.getElementById("kitchenwareItems").classList.add("hide")
          formData.kitchenware=""
      }
    }

    function handleFurniture () {
      //Show others text input field if other checkbox is ticked
      if (!isFurniture) {
          setIsFurniture(true)
          document.getElementById("furnitureItems").classList.remove("hide")
      } else {
          setIsFurniture(false)
          document.getElementById("furnitureItems").classList.add("hide")
          formData.furniture=""
      }
    }

    function handleElectricals () {
      //Show others text input field if other checkbox is ticked
      if (!isElectricals) {
          setIsElectricals(true)
          document.getElementById("electricalsItems").classList.remove("hide")
      } else {
          setIsElectricals(false)
          document.getElementById("electricalsItems").classList.add("hide")
          formData.electricals=""
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
          .then(json => navigate(`/listings/${json.id}`))
          .catch(error => console.log(error.message))
    }

    return (
        <>
            <Form className="mt-3" onSubmit={handleSubmit}>
                <Row>
                  <Col sm={5} md={4} lg={3}>
                   <Form.Label className="my-3 mb-0" htmlFor="date-input">Date found:</Form.Label>
                   <Form.Control required id="date-input" type="date" value={formData.date} onChange={(event)=>setFormData({...formData, date: event.target.value})}/>
                  </Col>
                  <Col sm={5} md={4} lg={3}>
                    <Form.Label className="my-3 mb-0" htmlFor="time-input">Time found:</Form.Label>
                    <Form.Control required id="time-input" type="time" value={formData.time} onChange={(event)=>setFormData({...formData, time: event.target.value})}/>
                  </Col>
                </Row>
                <Row>
                  <Col sm={8} md={7} lg={6}>
                    <Form.Label className="my-3 mb-0" htmlFor="address-input">Address:</Form.Label>
                    <Form.Control required id="address-input" type="text" value={formData.address} onChange={(event)=>setFormData({...formData, address: event.target.value})}/>
                  </Col>
                </Row>                
                <Row>
                  <Col sm={5} md={4} lg={3}>
                    <Form.Label className="my-3 mb-0" htmlFor="suburb-input">Suburb:</Form.Label>
                    <Form.Control required id="suburb-input" type="text" value={formData.suburb} onChange={(event)=>setFormData({...formData, suburb: event.target.value})}/>
                  </Col>
                  <Col sm={5} md={4} lg={3}>
                    <Form.Label className="my-3 mb-0" htmlFor="postcode-input">Postcode:</Form.Label>
                    <Form.Control required id="postcode-input" type="text" value={formData.postcode} onChange={(event)=>setFormData({...formData, postcode: event.target.value})}/>
                  </Col>
                </Row> 
                <Row className="mx-1 mt-2">
                  <Form.Check label="Electricals" className="checkbox"id="electricals" value="Electricals" type="checkbox" onChange={handleElectricals}/>
                  <div id="electricalsItems" className="hide mx-3">
                    <Col sm={7} md={6} lg={5}>
                      <Form.Label className="mb-0 text-muted" htmlFor="electricals-input">Please list electrical items:</Form.Label>
                      <Form.Control id="electricals-input" type="text" value={formData.electricals} onChange={(event)=>setFormData({...formData, electricals: event.target.value})}/>
                    </Col>
                  </div>
                </Row>
                <Row className="mx-1 mt-2">
                  <Form.Check label="Furniture" className="checkbox" id="furniture" value="Furniture" type="checkbox" onChange={handleFurniture}/>
                  <div id="furnitureItems" className="hide mx-3">
                    <Col sm={7} md={6} lg={5}>
                      <Form.Label className="mb-0 text-muted" htmlFor="furniture-input">Please list furniture:</Form.Label>
                      <Form.Control id="furniture-input" type="text" value={formData.furniture} onChange={(event)=>setFormData({...formData, furniture: event.target.value})}/>
                    </Col>
                  </div>
                </Row>
                <Row className="mx-1 mt-2">
                  <Form.Check label="Kitchenware" className="checkbox" id="kitchenware" value="Kitchenware" type="checkbox" onChange={handleKitchenware}/>
                  <div id="kitchenwareItems" className="hide mx-3">
                    <Col sm={7} md={6} lg={5}>
                      <Form.Label className="mb-0 text-muted" htmlFor="kitchenware-input">Please list kitchenware:</Form.Label>
                      <Form.Control id="kitchenware-input" type="text" value={formData.kitchenware} onChange={(event)=>setFormData({...formData, kitchenware: event.target.value})}/>
                    </Col>
                  </div>
                </Row>
                <Row className="mx-1 mt-2 mb-2">
                  <Form.Check label="Other items" className="checkbox" id="others" value="Others" type="checkbox" onChange={handleOthers}/>
                  <div id="otherItems" className="hide mx-3">
                    <Col sm={7} md={6} lg={5}>
                        <Form.Label className="mb-0 text-muted" htmlFor="other-input">Please list other items:</Form.Label>
                        <Form.Control id="other-input" type="text" value={formData.otherItems} onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}/>
                    </Col>
                  </div>
                </Row>
                {
                  formData.kitchenware !== "" || formData.otherItems !== "" || formData.electricals !== "" || formData.furniture !== ""
                  ?
                  <Button type="submit">Submit</Button>
                  :
                  <Button disabled type="submit">Submit</Button>
                }
                <Alert id="success-prompt" variant="success" className="hide my-2">Form submitted successfully</Alert>
            </Form>
        </>
    )
}

export default AddForm