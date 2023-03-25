import React, { useContext } from "react";
import { Card, Col, Modal, Row } from "react-bootstrap";
import userContext from "../context/user/userContext";

function OrderDetailsModal({ show, handleClose, customization, filters }) {
  const userCtx = useContext(userContext);
  return (
    <Modal show={show} onHide={handleClose} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>View your order summary</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "regular" }}>
        <h1 className="fs-5">
          <b> Product Category: </b> {filters.catOne}
          {filters.catTwo.trim() !== "" && `/${filters.catTwo}`}
          {filters.catThree.trim() !== "" && `/${filters.catThree}`}
        </h1>
        {customization.map((item, key) => {
          if (item.type === "FILE") {
            return (
              <h1 key={key} className="fs-6">
                <b> {item.name}: </b> Uploaded
              </h1>
            );
          }
          return (
            <h1 key={key} className="fs-6">
              <b> {item.name}: </b> {item.selectedValue}
            </h1>
          );
        })}
        <p className="fs-5 mt-4">
          <b> Select Delivery Address </b>
        </p>
        <Row className="w-100 px-10">
          {userCtx.user?.address?.map((item, key) => {
            return (
              <Col sm={12} md={6} lg={3} className="p-2" key={key}>
                <Card className="w-100 bg-transparent rounded">
                  <Card.Title> {item?.addressTitle} </Card.Title>
                  <Card.Body>
                    <p className="fs-6"> {item?.lineOne} </p>
                    <p className="fs-6"> {item?.lineTwo} </p>
                    <p className="fs-6"> {item?.landmark} </p>
                    <p className="fs-6"> {item?.pincode} </p>
                    <p className="fs-6">
                      {item?.city}/{item?.state}/{item?.country}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default OrderDetailsModal;
