import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import userContext from "../context/user/userContext";
import loadScript from "../utils/loadScript";
import uploadImage from "../utils/uploadImage";
import { useRouter } from "next/router";
import { CUSTOMIZATION, FILTER_ONE, FILTER_TWO } from "../utils/constants";

function OrderDetailsModal({ show, handleClose, customization, filters }) {
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  const userCtx = useContext(userContext);
  const [newAddress, setNewAddress] = useState({
    addressTitle: "",
    lineOne: "",
    lineTwo: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const [cost, setCost] = useState(0);
  useEffect(() => {
    let cost = 0;
    const t1 = FILTER_ONE.find((i) => i.name === filters.catOne);
    cost += t1 ? t1.cost : 0;
    let t2 = FILTER_TWO.find((i) => i.category === filters.catOne);
    if (t2) {
      t2 = t2.items.find((i) => i.name === filters.catTwo);
      cost += t2 ? t2.cost : 0;
    }
    t2 = t2.options.find((i) => i.name === filters.catThree);
    if (t2) {
      cost += t2.cost;
    }
    const cust = CUSTOMIZATION.find((i) => i.category === filters.catOne);
    if (cust) {
      for (let i = 0; i < customization.length; i++) {
        let q = customization[i];
        let t = cust.options.find((i) => i.name === q.name);
        if (t) {
          cost += t.cost;
        }
      }
    }
    setCost(cost);
    setLoading(false);
  }, []);
  const handler = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const pay = async () => {
    try {
      let s = true;
      Object.keys(newAddress).map((i) => {
        if (newAddress[i].trim() === "") {
          s = false;
        }
        return null;
      });
      if (!s) {
        alert("Please Enter a proper address");
        return;
      }
      setLoading(true);
      let finalCustomizations = [];
      for (let i = 0; i < customization.length; i++) {
        let item = customization[i];
        if (item.type === "FILE") {
          const res = await uploadImage(
            item.selectedValue,
            `${userCtx.user?._id}_${Date.now()}`
          );
          item.selectedValue = res;
        }
        finalCustomizations.push({
          name: item.name,
          value: item.selectedValue,
        });
      }
      const res = await axios.post(
        "/api/createOrder",
        {
          amount: cost,
          subTotal: cost,
          product: { filters, customization: finalCustomizations },
          address: newAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!res.data.status) {
        return alert(res.data.msg);
      }
      const order = res.data.data.order;
      const ord_object = res.data.data.ord_object;
      const ord_options = {
        amount: cost * 100,
        currency: "INR",
        payment_capture: 1,
      };

      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      const options = {
        key: "rzp_test_PJfxwmlLINbRMG",
        amount: ord_options.amount.toString(),
        currency: "INR",
        name: "Proxley",
        description: "Place Order",
        order_id: order.id,
        handler: async function (response) {
          console.log(response);
          userCtx.validateOrder(
            { id: ord_object._id, payment: response },
            () => {
              navigate.push(
                {
                  pathname: "/success",
                  query: { id: ord_object._id },
                },
                "/success"
              );
            },
            (err) => {
              navigate.push(
                {
                  pathname: "/cancel",
                  query: {
                    pid: response.razorpay_payment_id,
                    oid: ord_object._id,
                  },
                },
                "/cancel"
              );
            }
          );
        },
        prefill: {
          name: userCtx.user?.name,
          email: userCtx.user?.email,
          contact: userCtx.user?.phoneNumber,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert(err.toString());
    }
  };
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
          <b>Cost: </b>
          {cost}
        </p>
        <p className="fs-5 mt-4">
          <b>Delivery Details </b>
        </p>
        <Card className="w-50 p-2 rounded">
          <Card.Title className="fs-6"> Enter a new address </Card.Title>
          <Card.Body>
            <Form.Group>
              <Form.Label> Address Title </Form.Label>
              <Form.Control
                name="addressTitle"
                value={newAddress.addressTitle}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Address Line 1 </Form.Label>
              <Form.Control
                name="lineOne"
                value={newAddress.lineOne}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Address Line 2 </Form.Label>
              <Form.Control
                name="lineTwo"
                value={newAddress.lineTwo}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Landmark </Form.Label>
              <Form.Control
                name="landmark"
                value={newAddress.landmark}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Pincode </Form.Label>
              <Form.Control
                name="pincode"
                value={newAddress.pincode}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> City </Form.Label>
              <Form.Control
                name="city"
                value={newAddress.city}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> State </Form.Label>
              <Form.Control
                name="state"
                value={newAddress.state}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Country </Form.Label>
              <Form.Control
                name="country"
                value={newAddress.country}
                onChange={handler}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <p className="fs-5 mt-4">
          <b> Or Select Delivery Address </b>
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
        <div className="d-flex flex-row mt-4" style={{ gap: "10px" }}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              pay();
            }}
            disabled={loading}
          >
            {loading ? (
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            ) : (
              "Pay Now"
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default OrderDetailsModal;
