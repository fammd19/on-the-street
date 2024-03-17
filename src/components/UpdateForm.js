import { useEffect } from "react";
import { Button, Form, Col, Row } from 'react-bootstrap';


function UpdateForm ( { listing, setListing, displayListingUpdateForm, displayPrompt,
    formData,setFormData
  } ) {

    useEffect ( () => {
      fetch("http://localhost:4000/listings/"+listing.id)
      .then(res => res.json())
      .then(json => setFormData(json))
  }, [])

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
          displayPrompt("success-prompt");
          displayListingUpdateForm();
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
                    <Col sm={8} md={7} lg={6}>
                      <Form.Label htmlFor="electricals-input">Please update electrical items:</Form.Label>
                      <Form.Control id="electricals-input" type="text" value={formData.electricals} onChange={(event)=>setFormData({...formData, electricals: event.target.value})}/>
                    </Col>
                </Row>
                <Row className="mx-1 my-1">
                    <Col sm={8} md={7} lg={6}>
                      <Form.Label htmlFor="furniture-input">Please update furniture:</Form.Label>
                      <Form.Control id="furniture-input" type="text" value={formData.furniture} onChange={(event)=>setFormData({...formData, furniture: event.target.value})}/>
                    </Col>
                </Row>
                <Row className="mx-1 my-1">
                    <Col sm={8} md={7} lg={6}>
                      <Form.Label htmlFor="kitchenware-input">Please update kitchenware:</Form.Label>
                      <Form.Control id="kitchenware-input" type="text" value={formData.kitchenware} onChange={(event)=>setFormData({...formData, kitchenware: event.target.value})}/>
                    </Col>
                </Row>
                <Row className="mx-1 my-1">
                    <Col sm={8} md={7} lg={6}>
                        <Form.Label htmlFor="other-input">Please update other items:</Form.Label>
                        <Form.Control id="other-input" type="text" value={formData.otherItems} onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}/>
                    </Col>
                </Row>
              <br/>
              {
                  formData.kitchenware !== listing.kitchenware || formData.otherItems !== listing.otherItems || formData.electricals !== listing.electricals || formData.furniture !== listing.furniture
                  ?
                  <Button type="submit">Submit</Button>
                  :
                  <Button disabled type="submit">Submit</Button>
                }
            </Form>
        </>
    )
}

export default UpdateForm