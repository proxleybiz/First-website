import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import right from "../imgs/right.png";

function MyNavbar({ auth = false }) {
  return (
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
          {!auth && (
            <Nav.Link
              className="text-light pb-0 fs-5"
              style={{ fontFamily: "regular" }}
            >
              Pricing
            </Nav.Link>
          )}
        </Nav>

        {!auth && (
          <Nav.Link
            className="btn py-2 px-4 br-2 fs-6 d-flex flex-row justify-content-center btn-hover"
            style={{ fontFamily: "regular" }}
            href="/auth"
          >
            Get Started <img src={right.src} />
          </Nav.Link>
        )}
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
