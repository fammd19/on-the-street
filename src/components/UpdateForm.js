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
                <Col sm={7} md={6} lg={6}>
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
                <Col sm={7} md={6} lg={5}>
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
              {
                formData.clothing 
                ?
                <Row className="my-1">
                  <Col sm={11} md={11} lg={11}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Clothing</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, clothing: event.target.value})}
                          value={formData.clothing}
                      />
                      <Button 
                        variant="danger"
                        onClick={()=>setFormData({...formData, clothing: ""})}
                        >X
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                :
                null
              }
              {
                formData.electricals
                ?
                <Row className="my-1">
                  <Col sm={11} md={11} lg={11}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Electricals</InputGroup.Text>
                        <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, electricals: event.target.value})}
                          value={formData.electricals}
                        />
                      <Button 
                        variant="danger"
                        onClick={()=>setFormData({...formData, electricals: ""})}
                        >X
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                :
                null
              }
              {
                formData.furniture
                ?
                <Row className="my-1">
                  <Col sm={11} md={11} lg={11}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Furniture</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, furniture: event.target.value})}
                          value={formData.furniture}
                      />
                      <Button 
                        variant="danger"
                        onClick={()=>setFormData({...formData, furniture: ""})}
                        >X
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                :
                null
              }
              {
                formData.garden
                ?
                <Row className="my-1">
                  <Col sm={11} md={11} lg={11}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Garden</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, garden: event.target.value})}
                          value={formData.garden}
                      />
                      <Button 
                        variant="danger"
                        onClick={()=>setFormData({...formData, garden: ""})}
                        >X
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                :
                null
              } 
              {
                formData.kids
                ?
                <Row className="my-1">
                  <Col sm={11} md={11} lg={11}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Kids</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, kids: event.target.value})}
                          value={formData.kids}
                      />
                      <Button 
                        variant="danger"
                        onClick={()=>setFormData({...formData, kids: ""})}
                        >X
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                :
                null
              }   
              {
                formData.kitchenware
                ?
                <Row className="my-1">
                  <Col sm={11} md={11} lg={11}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Kitchenware</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, kitchenware: event.target.value})}
                          value={formData.kitchenware}
                      />
                      <Button 
                        variant="danger"
                        onClick={()=>setFormData({...formData, kitchenware: ""})}
                        >X
                      </Button>
                    </InputGroup>
                    
                  </Col>
                </Row>
                :
                null
              } 
              {
                formData.sports
                ?
                <Row className="my-1">
                  <Col sm={11} md={11} lg={11}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Sports</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, sports: event.target.value})}
                          value={formData.sports}
                      />
                      <Button 
                        variant="danger"
                        onClick={()=>setFormData({...formData, sports: ""})}
                        >X
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                :
                null
              }     
              {
                formData.otherItems
                ?
                <Row className="my-1">
                  <Col sm={11} md={11} lg={11}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Other</InputGroup.Text>
                      <Form.Control
                          type="text"
                          onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}
                          value={formData.otherItems}
                      />
                      <Button 
                        variant="danger"
                        onClick={()=>setFormData({...formData, otherItems: ""})}
                        >X
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
                :
                null
              }    
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