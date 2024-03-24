import React from "react";
import { Form, Col, Row } from 'react-bootstrap';

function Filter ({ search, onSearchChange, onCategoryChange }) {

  function handleSearchChange(event) {
    onSearchChange(event.target.value)
  }

  return (
    <Form className="mx-2">
      <div className="Filter">
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="search"
              placeholder="Search by suburb..."
              value={search}
              onChange={handleSearchChange}
            />
          </Col>
          <Col>
            <Form.Select  name="filter" onChange={onCategoryChange}>
              <option value="">Filter by category</option>
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