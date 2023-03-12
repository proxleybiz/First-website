import React from "react";
import { Accordion, Card, Container, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function OrderItem({ order }) {
  return (
    <Card
      className="w-100 border-right-0 border-left-0 rounded bg-transparent"
      style={{
        borderTop: "3px solid #2160fd",
        borderBottom: "3px solid #2160fd",
        paddingLeft: "1.5px",
        paddingRight: "1.5px",
      }}
    >
      <Card.Body className="bg-white rounded">
        <Card.Title
          className="fs-3"
          style={{ fontFamily: "bold", color: "#2160fd" }}
        >
          Order Reciept
        </Card.Title>
        <Row className="w-100 align-items-start justify-content-between">
          <span style={{ width: "fit-content" }}>
            <p
              className="m-0 text-muted fs-6"
              style={{ fontFamily: "regular" }}
            >
              Date
            </p>
            <p className="m-0 fs-6" style={{ fontFamily: "regular" }}>
              10 April 2021
            </p>
          </span>
          <span style={{ width: "fit-content" }}>
            <p
              className="m-0 text-muted fs-6"
              style={{ fontFamily: "regular" }}
            >
              Order ID
            </p>
            <p className="m-0 fs-6" style={{ fontFamily: "regular" }}>
              Order ID goes here
            </p>
          </span>
        </Row>
        <Accordion style={{ fontFamily: "regular" }} className="mt-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Order Details</Accordion.Header>
            <Accordion.Body>
              <div
                className="w-100 py-4 px-3"
                style={{
                  background: "rgb(211, 211, 211, 0.4)",
                  fontFamily: "regular",
                }}
              >
                <span className="w-100 d-flex justify-content-between">
                  <p> Product Name </p>
                  <p> &#8377; Price </p>
                </span>
                <span className="w-100 d-flex justify-content-between">
                  <p> Shipping </p>
                  <p> &#8377; Price </p>
                </span>
                <span className="w-100 d-flex justify-content-between">
                  <p> Discount </p>
                  <p> - &#8377; Price </p>
                </span>
                <span className="w-100 d-flex justify-content-between">
                  <p className="fs-5"> Grand Total </p>
                  <p
                    className="fs-5"
                    style={{ fontFamily: "bold", color: "#2160fd" }}
                  >
                    &#8377; Price
                  </p>
                </span>
              </div>

              <Container
                fluid
                className="mt-4 d-flex justify-content-between"
                style={{ gap: "1rem" }}
              >
                <span>
                  <Card.Title
                    className="fs-3 mt-4"
                    style={{ fontFamily: "bold", color: "#2160fd" }}
                  >
                    Tracking Details
                  </Card.Title>
                  <span style={{ fontFamily: "regular" }}>
                    <p>
                      Order Status: <b>Ordered</b>
                    </p>
                  </span>
                </span>
                <CircularProgressbar
                  value={25}
                  strokeWidth={50}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                  })}
                  className="w-25 bg-white"
                />
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
}

export default OrderItem;
