import Head from "next/head";
import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import LoginCard from "../components/LoginCard";
import MyNavbar from "../components/MyNavbar";
import RegsiterCard from "../components/RegsiterCard";

function Auth() {
  const [state, setState] = useState(1);
  const switchFn = (e) => {
    e.preventDefault();
    setState(!state);
  };
  return (
    <Container fluid className="min-vh-100 pb-4">
      <Head>
        <title> Authentication | Proxley </title>
      </Head>
      <MyNavbar auth={true} />
      <Container className="my-auto">
        <Row className="justify-content-center">
          <Col lg={4} sm={12}>
            {state ? (
              <RegsiterCard switchFn={switchFn} />
            ) : (
              <LoginCard switchFn={switchFn} />
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Auth;
