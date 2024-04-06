import { useState, useEffect } from "react";
import { Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import { useNavigate  } from "react-router-dom"

function AddForm () {

    const [formData, setFormData] = useState({
      date: "",
      time: "",
      address: "",
      suburb:"",
      postcode:"",
      clothing:"",
      electricals: "",
      furniture: "",
      garden:"",
      kids:"",
      kitchenware: "",
      sports:"",
      otherItems: "",
      dateUpdated: "",
      timeUpdated: ""
    })
    const [today, setToday] = useState("")
    const navigate = useNavigate();

    useEffect (()=> {
      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const day = (date.getDate()).toString().padStart(2, '0');
      setToday(`${year}-${month}-${day}`)
      const hour = date.getHours()
      const minute = date.getMinutes()
      setFormData({...formData, date: `${year}-${month}-${day}`, time: `${hour}:${minute}:00`})
    },[])

    function handleCategory (event) {
      const clickedCategory = event.target.value.toLowerCase();
      const clickedCategorySC = `${clickedCategory}Items`;
      const isChecked = event.target.checked;
    
      if (isChecked) {
        formData[clickedCategory] = "";
        setFormData({...formData, clickedCategory: ""})
        document.getElementById(clickedCategorySC).classList.remove("hide");
      } else {
        formData[clickedCategory] = "";
        setFormData({...formData, clickedCategory: ""})
        document.getElementById(clickedCategorySC).classList.add("hide");
      }    
    }

      // function handleCategory (event) {
      //   let category = event.target.value.toLowerCase()
      //     let categoryName = category.toLowerCase() + "Items";
      //     let isCategory = eval("is" + category.charAt(0).toUpperCase() + category.slice(1));
      //     let focusId = category.toLowerCase() + "-input";
          
      //     // Show or hide the element based on category state
      //     if (!isCategory) {
      //       eval("setIs" + category.charAt(0).toUpperCase() + category.slice(1) + "(true)");
      //       formData[category.toLowerCase()] = "";
      //       document.getElementById(categoryName).classList.remove("hide");
      //       document.getElementById(focusId).focus();
      //     } else {
      //       eval("setIs" + category.charAt(0).toUpperCase() + category.slice(1) + "(false)");
      //       document.getElementById(categoryName).classList.add("hide");
      //       formData[category.toLowerCase()] = "";
      //     }     
      // }

    function handleSubmit (event) {
        event.preventDefault();
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
                  <Col sm={6} md={5} lg={4}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="date-input">Date found</InputGroup.Text>
                      <Form.Control
                        required
                        aria-describedby="date-input"
                        type="date"
                        onChange={(event)=>setFormData({...formData, date: event.target.value})}
                        value={formData.date}
                        max={today}
                      />
                    </InputGroup>
                  </Col>
                  <Col sm={6} md={5} lg={4}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="time-input">Time found</InputGroup.Text>
                      <Form.Control
                        required
                        aria-describedby="time-input"
                        type="time"
                        onChange={(event)=>setFormData({...formData, time: event.target.value})}
                        value={formData.time}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={10} lg={8}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="address-input">Address</InputGroup.Text>
                        <Form.Control
                          required
                          aria-describedby="address-input"
                          type="text"
                          onChange={(event)=>setFormData({...formData, address: event.target.value})}
                          value={formData.address}
                        />
                    </InputGroup>
                 </Col>
                </Row>                
                <Row>
                  <Col sm={6} md={5} lg={4}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="suburb-input">Suburb</InputGroup.Text>
                          <Form.Control
                            required
                            aria-describedby="suburb-input"
                            type="text"
                            onChange={(event)=>setFormData({...formData, suburb: event.target.value})}
                            value={formData.suburb}
                          />
                    </InputGroup>
                  </Col>
                  <Col sm={6} md={5} lg={4}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="postcode-input">Postcode</InputGroup.Text>
                          <Form.Control
                            required
                            aria-describedby="postcode-input"
                            type="text"
                            onChange={(event)=>setFormData({...formData, postcode: event.target.value})}
                            value={formData.postcode}
                          />
                    </InputGroup>
                  </Col>
                </Row> 
                <Row className="mt-2">
                  <Col sm={3} md={2} lg={1}>
                    <Form.Check label="Clothing" className="checkbox mt-1" id="clothing" value="Clothing" type="checkbox" onChange={handleCategory}/>
                  </Col>
                  <Col sm={9} md={7} lg={6}>
                  <div id="clothingItems" className="hide mx-3 mb-2">
                      <Form.Control 
                        placeholder="Please list all items e.g. 3 x womens T-shirt, jumper..." 
                        id="clothing-input" 
                        type="text" 
                        value={formData.clothing} 
                        onChange={(event)=>setFormData({...formData, clothing: event.target.value})}
                      />
                    
                  </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={3} md={2} lg={1}>
                    <Form.Check label="Electricals" className="checkbox mt-1" id="electricals" value="Electricals" type="checkbox" onChange={handleCategory}/>
                  </Col>
                  <Col sm={9} md={7} lg={6}>
                    <div id="electricalsItems" className="hide mx-3 mb-2">
                      <Form.Control 
                        placeholder="Please list all items e.g. blender, iPhone charger..." 
                        id="electricals-input" 
                        type="text" 
                        value={formData.electricals} 
                        onChange={(event)=>setFormData({...formData, electricals: event.target.value})}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={3} md={2} lg={1}>
                    <Form.Check label="Furniture" className="checkbox mt-1" id="furniture" value="Furniture" type="checkbox" onChange={handleCategory}/>
                  </Col>
                  <Col sm={9} md={7} lg={6}>
                    <div id="furnitureItems" className="hide mx-3 mb-2">
                      <Form.Control 
                        placeholder="Please list all items e.g. 2 x bedside table, sofa"
                        id="furniture-input" 
                        type="text" 
                        value={formData.furniture} 
                        onChange={(event)=>setFormData({...formData, furniture: event.target.value})}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={3} md={2} lg={1}>
                    <Form.Check label="Garden" className="checkbox mt-1" id="garden" value="Garden" type="checkbox" onChange={handleCategory}/>
                  </Col>
                  <Col sm={9} md={7} lg={6}>
                    <div id="gardenItems" className="hide mx-3 mb-2">
                      <Form.Control 
                        placeholder="Please list all items e.g. plant pots, spade..."
                        id="garden-input" 
                        type="text" 
                        value={formData.garden} 
                        onChange={(event)=>setFormData({...formData, garden: event.target.value})}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={3} md={2} lg={1}>
                    <Form.Check label="Kitchenware" className="checkbox mt-1" id="kitchenware" value="Kitchenware" type="checkbox" onChange={handleCategory}/>
                  </Col>
                  <Col sm={9} md={7} lg={6}>
                    <div id="kitchenwareItems" className="hide mx-3 mb-2">
                      <Form.Control 
                        placeholder="Please list all items e.g. wine glasses, cutlery"
                        id="kitchenware-input" 
                        type="text" 
                        value={formData.kitchenware} 
                        onChange={(event)=>setFormData({...formData, kitchenware: event.target.value})}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={3} md={2} lg={1}>
                    <Form.Check label="Kids" className="checkbox mt-1" id="kids" value="Kids" type="checkbox" onChange={handleCategory}/>
                  </Col>
                  <Col sm={9} md={7} lg={6}>
                    <div id="kidsItems" className="hide mx-3 mb-2">
                      <Form.Control 
                        placeholder="Please list all items e.g. high chair, abacus.."
                        id="kids-input" 
                        type="text" 
                        className="item-input"
                        value={formData.kids} 
                        onChange={(event)=>setFormData({...formData, kids: event.target.value})}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={3} md={2} lg={1}>
                    <Form.Check label="Sports" className="checkbox mt-1" id="sports" value="Sports" type="checkbox" onChange={handleCategory}/>
                  </Col>
                  <Col sm={9} md={7} lg={6}>
                    <div id="sportsItems" className="hide mx-3 mb-2">
                      <Form.Control 
                        placeholder="Please list all items e.g. football, golf clubs.."
                        id="sports-input" 
                        type="text"
                        className="item-input"
                        value={formData.sports} 
                        onChange={(event)=>setFormData({...formData, sports: event.target.value})}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-2 mb-2">
                  <Col sm={3} md={2} lg={1}>
                    <Form.Check label="Other" className="checkbox mt-1" id="others" value="Other" type="checkbox" onChange={handleCategory}/>
                  </Col>
                  <Col sm={9} md={7} lg={6}>
                    <div id="otherItems" className="hide mx-3 mb-2">
                        <Form.Control 
                          placeholder="Please add all miscallaneous items"
                          id="other-input" 
                          type="text" 
                          value={formData.otherItems} 
                          onChange={(event)=>setFormData({...formData, otherItems: event.target.value})}
                        />
                    </div>
                  </Col>
                </Row>
                {
                  formData.clothing ||
                  formData.electricals ||
                  formData.furniture ||
                  formData.garden ||
                  formData.kids ||
                  formData.kitchenware ||
                  formData.sports ||
                  formData.otherItems
                  ?
                  <Button type="submit">Submit</Button>
                  :
                  <Button disabled type="submit">Submit</Button>
                }
            </Form>
        </>
    )
}

export default AddForm
