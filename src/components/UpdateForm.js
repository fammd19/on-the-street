import { useEffect } from "react";
import { Button, Form, Col, Row, Alert } from 'react-bootstrap';


function UpdateForm ( { listing, setListing,
    formData,setFormData,
    areOtherItems,setAreOtherItems,
    isKitchenware,setIsKitchenware,
    isFurniture,setIsFurniture,
    isElectricals,setIsElectricals
  } ) {

    useEffect ( () => {
      fetch("http://localhost:4000/listings/"+listing.id)
      .then(res => res.json())
      .then(json => setFormData(json))
  }, [])

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
        fetch(`http://localhost:4000/listings/${listing.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
          .then(response => response.json())
          .catch(error => console.log(error.message))
          setListing(formData)
          displayPrompt();
          setFormData({
            id:listing.id,
            dateUpdated: "",
            timeUpdated: "",
            address: listing.address,
            suburb:listing.suburb,
            postcode:listing.postcode,
            kitchenware: listing.kitchenware,
            furniture: listing.furniture,
            electricals: listing.electricals,
            otherItems: listing.otherItems,
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
                  <Form.Control required id="date-update" type="date" value={formData.dateUpdated} onChange={(event)=>setFormData({...formData, dateUpdated: event.target.value})}/>
                </Col>
                <Col sm={5} md={4} lg={4}>
                  <Form.Label className="mb-1" htmlFor="time-update">Time updated:</Form.Label>
                  <Form.Control required id="time-updatet" type="time" value={formData.timeUpdated} onChange={(event)=>setFormData({...formData, timeUpdated: event.target.value})}/>
                </Col>
              </Row>
              <Row className="mx-1 my-1">
                  <Form.Check label="Electricals" id="electricals" value="Electricals" type="checkbox" onChange={handleElectricals}/>
                  <div id="electricalsItems" className="hide">
                    <Col sm={8} md={7} lg={6}>
                      <Form.Label htmlFor="electricals-input">Please add electrical items:</Form.Label>
                      <Form.Control id="electricals-input" type="text" value={formData.electricals} onChange={(event)=>setFormData({...formData, electricals: event.target.value})}/>
                    </Col>
                  </div>
                </Row>
                <Row className="mx-1 my-1">
                  <Form.Check label="Furniture" id="furniture" value="Furniture" type="checkbox" onChange={handleFurniture}/>
                  <div id="furnitureItems" className="hide">
                    <Col sm={8} md={7} lg={6}>
                      <Form.Label htmlFor="furniture-input">Please add furniture:</Form.Label>
                      <Form.Control id="furniture-input" type="text" value={formData.furniture} onChange={(event)=>setFormData({...formData, furniture: event.target.value})}/>
                    </Col>
                  </div>
                </Row>
                <Row className="mx-1 my-1">
                  <Form.Check label="Kitchenware" id="kitchenware" value="Kitchenware" type="checkbox" onChange={handleKitchenware}/>
                  <div id="kitchenwareItems" className="hide">
                    <Col sm={8} md={7} lg={6}>
                      <Form.Label htmlFor="kitchenware-input">Please add kitchenware:</Form.Label>
                      <Form.Control id="kitchenware-input" type="text" value={formData.kitchenware} onChange={(event)=>setFormData({...formData, kitchenware: event.target.value})}/>
                    </Col>
                  </div>
                </Row>
                <Row className="mx-1 my-1">
                  <Form.Check label="Other items" id="others" value="Others" type="checkbox" onChange={handleOthers}/>
                  <div id="otherItems" className="hide">
                    <Col sm={8} md={7} lg={6}>
                        <Form.Label htmlFor="other-input">Please add other items:</Form.Label>
                        <Form.Control id="other-input" type="text" value={formData.otherItems} onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}/>
                    </Col>
                  </div>
                </Row>
              {/* <Row id="checkboxes" className="mb-1 mx-1 my-3">
                <Form.Check label="Kitchenware" id="kitchenware" value="Kitchenware" type="checkbox" onChange={addItems}/>
                <Form.Check label="Furniture" id="furniture" value="Furniture" type="checkbox" onChange={addItems}/>
                <Form.Check label="Electricals" id="electricals" value="Electricals" type="checkbox" onChange={addItems}/>
                
              </Row> */}
              {/* <Form.Check label="Other items" id="others" value="Others" type="checkbox" onChange={handleOthers}/>
              <div id="kitchenwareItems" className="hide">
                <Col sm={8} md={7} lg={6}>
                  <Form.Label htmlFor="kitchenware-input">Please add kitchenware:</Form.Label>
                  <Form.Control id="kitchenware-input" type="text" value={formData.kitchenware} onChange={(event)=>setFormData({...formData, kitchenware: event.target.value})}/>
                </Col>
              </div>
              <div id="otherItems" className="hide">
                <Col sm={8} md={7} lg={6}>
                  <Form.Label htmlFor="other-input">Please add other items:</Form.Label>
                  <Form.Control id="other-input" type="text" value={formData.otherItems} onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}/>
                </Col>
              </div> */}
              {/* <label htmlFor="image">Upload an image:</label><input type="file" onChange={(event)=>console.log(event.target.value)}/> */}
              <br/>
              {
                  formData.kitchenware !== "" || formData.otherItems !== ""
                  ?
                  <Button type="submit">Submit</Button>
                  :
                  <Button disabled type="submit">Submit</Button>
                }
              <Alert variant="success" id="success-prompt" className="hide my-2">Form submitted successfully</Alert>
            </Form>
        </>
    )
}

export default UpdateForm