import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Filter ({ search, onSearchChange, onCategoryChange }) {
  function handleSearchChange(event) {
    onSearchChange(event.target.value);
  }

  return (
    <Form>
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
              <option value="kitchenware">Kitchenware</option>
              <option value="clothing">Clothing</option>
              <option value="electricals">Electricals</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default Filter;