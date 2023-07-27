import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './searchBox.css'

const SearchBox = (props) => {
  return (
    <div>
        {/* <input
            className="search-box"
            type="search"
            placeholder="Search"
            onChange = {props.onChildSearchChange}
        /> */}
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 mt-5 mb-5 d-inline-flex align-items-center"
              aria-label="Search"
              onChange = {props.onChildSearchChange}
            />
            <Button variant="outline-success mt-5 mb-5 d-inline-flex align-items-center">Search</Button>
          </Form>
    </div>
  )
}

export default SearchBox