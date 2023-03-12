import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import OrderItem from "./OrderItem";
import filterimg from "../imgs/filter.png";

function Orders() {
  const [filter, setFilter] = useState("");
  return (
    <Container className="container-md">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <img src={filterimg.src} style={{ height: "20px" }} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Filter by Date/Product Name/Order ID"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </InputGroup>
      <Row className="justify-content-center">
        <Col sm={12} md={8}>
          <OrderItem />
        </Col>
      </Row>
    </Container>
  );
}

export default Orders;
