import Head from "next/head";
import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
const LoginCard = dynamic(() => import("../components/LoginCard"), {
  ssr: false,
});
import MyNavbar from "../components/MyNavbar";
import dynamic from "next/dynamic";
const RegsiterCard = dynamic(() => import("../components/RegsiterCard"), {
  ssr: false,
});

function Auth() {
  const [state, setState] = useState(0);
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
