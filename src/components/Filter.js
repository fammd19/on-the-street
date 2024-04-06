import React from "react";
import { Form, Col, Row } from "react-bootstrap";

function Filter ({ search, onSearchChange, onCategoryChange }) {

  function handleSearchChange(event) {
    onSearchChange(event.target.value)
  }

  return (
    <Form >
      <div className="Filter">
        <Row className="justify-content-md-center">
          <Col sm={5} md={4} lg={3} className="mb-2">
            <Form.Control
              type="text"
              name="search"
              placeholder="Search by suburb..."
              value={search}
              onChange={handleSearchChange}
            />
          </Col>
          <Col sm={5} md={4} lg={3} className="mb-2">
            <Form.Select  name="filter" onChange={onCategoryChange}>
              <option value="">View All</option>
              <option value="clothing">Clothing</option>
              <option value="electricals">Electricals</option>
              <option value="furniture">Furniture</option>
              <option value="garden">Garden tools & items</option>
              <option value="kids">Kids toys & accessories</option>
              <option value="kitchenware">Kitchenware</option>
              <option value="sports">Sports equipment & hobbies</option>
              <option value="otherItems">Other items</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default Filter;