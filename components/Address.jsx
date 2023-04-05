import React, { useState, useContext } from "react";
import userContext from "../context/user/userContext";
import { Fragment } from "react";
import Loading from "./Loading";
import { Button, Card, Col, Row } from "react-bootstrap";
import NewAddressModal from "./NewAddressModal";

function Address() {
  const userCtx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="d-flex flex-column mt-4"
          style={{ fontFamily: "regular" }}
        >
          <h1 className="text-white"> Addresses </h1>
          <div className="d-flex flex-row-reverse">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setShow(true);
              }}
              variant="success"
            >
              Add New
            </Button>
          </div>
          <Row style={{ gap: "10px" }} className="mt-4">
            {userCtx.user?.address.map((item, key) => {
              return (
                <Col key={key} sm={4}>
                  <Card className="w-100">
                    <Card.Header as="h5"> {item.addressTitle} </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {`${item.lineOne}, ${item.lineTwo}, ${item.landmark}, ${item.city}, ${item.state}, ${item.country}, ${item.pincode}`}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <NewAddressModal
            show={show}
            handleClose={() => {
              setShow(false);
            }}
            add={(data) => {
              const keys = Object.keys(data);
              for (let i = 0; i < keys.length; i++) {
                if (data[keys[i]].trim() === "") {
                  alert(`Please enter ${keys[i]}`);
                  return;
                }
              }
              setLoading(true);
              userCtx.addAddress(
                data,
                () => {
                  setShow(false);
                  setLoading(false);
                },
                (err) => {
                  setShow(false);
                  setLoading(false);
                  alert(err);
                }
              );
            }}
          />
        </div>
      )}
    </Fragment>
  );
}

export default Address;
