import { useEffect } from "react";
import { Button, Form, InputGroup, Col, Row } from 'react-bootstrap';


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
                <Col sm={6} md={5} lg={4}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="date-update">Date</InputGroup.Text>
                    <Form.Control
                      required
                      aria-describedby="date-update"
                      type="date"
                      onChange={(event)=>setFormData({...formData, dateUpdated: event.target.value})}
                      value={formData.dateUpdated}
                    />
                  </InputGroup>
                </Col>
                <Col sm={6} md={5} lg={4}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Time</InputGroup.Text>
                    <Form.Control
                      required
                      type="time"
                      onChange={(event)=>setFormData({...formData, timeUpdated: event.target.value})}
                      value={formData.timeUpdated}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="my-1">
                <Col sm={10} md={9} lg={8}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Clothing</InputGroup.Text>
                    <Form.Control
                        type="text"
                        onChange={(event)=>setFormData({...formData, clothing: event.target.value})}
                        value={formData.clothing}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row className="my-1">
                <Col sm={10} md={9} lg={8}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Electricals</InputGroup.Text>
                      <Form.Control
                        type="text"
                        onChange={(event)=>setFormData({...formData, electricals: event.target.value})}
                        value={formData.electricals}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col sm={10} md={9} lg={8}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Furniture</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, furniture: event.target.value})}
                          value={formData.furniture}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col sm={10} md={9} lg={8}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Garden</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, garden: event.target.value})}
                          value={formData.garden}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col sm={10} md={9} lg={8}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Kids</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, kids: event.target.value})}
                          value={formData.kids}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col sm={10} md={9} lg={8}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Kitchenware</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, kitchenware: event.target.value})}
                          value={formData.kitchenware}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col sm={10} md={9} lg={8}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Sports</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, sports: event.target.value})}
                          value={formData.sports}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="my-1">
                  <Col sm={10} md={9} lg={8}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Other</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}
                          value={formData.otherItems}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              <br/>
              {
                  formData.clothing !== listing.clothing || 
                  formData.electricals !== listing.electricals || 
                  formData.furniture !== listing.furniture ||
                  formData.garden !== listing.garden ||
                  formData.kids !== listing.kids || 
                  formData.kitchenware !== listing.kitchenware ||
                  formData.sports !== listing.sports || 
                  formData.otherItems !== listing.otherItems 
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