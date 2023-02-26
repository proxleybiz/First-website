import React from "react";
import { Button, Col, Container, Nav, Navbar } from "react-bootstrap";
import MyNavbar from "../components/MyNavbar";
import bg from "../imgs/bg.png";
import right from "../imgs/right.png";

export default function Home() {
  return (
    <Container
      fluid
      style={{ background: `url(${bg.src})` }}
      className="min-vh-100"
    >
      <MyNavbar />
      <Container
        fluid
        style={{ height: "60vh", gap: "1rem" }}
        className="d-flex flex-column justify-content-center d-flex w-100 align-items-center"
      >
        <h1
          style={{ fontFamily: "bold", fontSize: "4rem" }}
          className="text-light m-0 text-center w-75"
        >
          Highest quality Customisable Printing and Packaging
        </h1>
        <h3
          style={{ fontFamily: "regular" }}
          className="text-muted w-50 text-center"
        >
          We design , print and manufacture boxes all under one roof.
        </h3>
        <Nav.Link
          className="btn py-2 px-4 br-2 fs-6 d-flex flex-row justify-content-center btn-hover"
          style={{ fontFamily: "regular" }}
          href="/register"
        >
          Get Started <img src={right.src} />
        </Nav.Link>
      </Container>
    </Container>
  );
}
