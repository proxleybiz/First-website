import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import right from "../imgs/right.png";
import { useRouter } from "next/router";

function MyNavbar({ mode = 0 }) {
  // 2:navbar on login screen
  // 1:navbar on dashboard
  // 0:navbar on home screen
  const router = useRouter();
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
        <Nav className="me-auto"></Nav>

        {mode === 0 && (
          <Nav.Link
            className="btn py-2 px-4 br-2 fs-6 d-flex flex-row justify-content-center btn-hover"
            style={{ fontFamily: "regular" }}
            href="/dashboard"
          >
            Get Started <img src={right.src} />
          </Nav.Link>
        )}
        {mode === 1 && (
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
        )}
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
