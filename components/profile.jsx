import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import userContext from "../context/user/userContext";
import Loading from "./Loading";
import UpdatePasswordModal from "./UpdatePasswordModal";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });

  const updatePassword = () => {
    setShow(false);
    setLoading(true);
    userCtx.updatePassword(
      password,
      () => {
        setLoading(false);
        setPassword({
          newPassword: "",
          oldPassword: "",
          confirmPassword: "",
        });
      },
      (err) => {
        setLoading(false);
        setPassword({
          newPassword: "",
          oldPassword: "",
          confirmPassword: "",
        });
        alert(err);
      }
    );
  };
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col sm={12} md={8} lg={4}>
          {!userCtx.user || loading ? (
            <Loading />
          ) : (
            <Card
              className="w-100 rounded p-3"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <Card.Body
                className="d-flex flex-column align-items-center"
                style={{ gap: "1rem" }}
              >
                <Row>
                  <h1
                    className="fs-2 text-white"
                    style={{ fontFamily: "bold", width: "fit-content" }}
                  >
                    Hi There!!
                  </h1>
                  <h1
                    className="fs-2 text-white gradient-text"
                    style={{ fontFamily: "bold", width: "fit-content" }}
                  >
                    {userCtx?.user?.name}
                  </h1>
                </Row>
                <Form.Control
                  disabled
                  value={userCtx.user?.email}
                  className="text-muted"
                  style={{ fontFamily: "regular" }}
                />
                <Form.Control
                  disabled
                  value={userCtx.user?.phoneNumber}
                  className="text-muted"
                  style={{ fontFamily: "regular" }}
                />
                <Form.Control
                  disabled
                  value={
                    "Joined On: " +
                    new Date(userCtx.user?.joinedOn).toLocaleDateString()
                  }
                  className="text-muted"
                  style={{ fontFamily: "regular" }}
                />
                <Button
                  variant="success"
                  style={{ fontFamily: "regular" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShow(true);
                  }}
                >
                  Update Password
                </Button>
                <Button
                  variant="danger"
                  style={{ fontFamily: "regular" }}
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("accessToken");
                    router.replace("/auth");
                  }}
                >
                  Logout
                </Button>
                <UpdatePasswordModal
                  show={show}
                  handleClose={(e) => {
                    e.preventDefault();
                    setShow(false);
                    setPassword({
                      newPassword: "",
                      oldPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  password={password}
                  setPassword={(e) => {
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  update={updatePassword}
                />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
