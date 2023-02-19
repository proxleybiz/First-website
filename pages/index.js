import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import bg from "../imgs/bg.png";
import right from "../imgs/right.png";

export default function Home() {
  return (
    <Container
      fluid
      style={{ background: `url(${bg.src})` }}
      className="min-vh-100"
    >
      <Navbar bg="transparent" sticky="top">
        <Container fluid className="justify-content-center">
          <Navbar.Brand
            href="/"
            className="fw-bold fs-1"
            style={{ color: "#2160fd" }}
          >
            Proxley
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              className="text-light pb-0 fs-5"
              style={{ fontFamily: "regular" }}
            >
              Pricing
            </Nav.Link>
          </Nav>
          <Nav.Link
            className="btn py-2 px-4 br-2 fs-6 d-flex flex-row justify-content-center btn-hover"
            style={{ fontFamily: "regular" }}
            href="/register"
          >
            Get Started <img src={right.src} />
          </Nav.Link>
        </Container>
      </Navbar>
    </Container>
  );
}
