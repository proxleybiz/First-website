import React from "react";
import { Container } from "react-bootstrap";
import ExploreProducts from "../components/ExploreProducts";
import MyHero from "../components/MyHero";
import MyNavbar from "../components/MyNavbar";
import bg from "../imgs/bg.png";

export default function Home() {
  return (
    <Container
      fluid
      style={{ background: `url(${bg.src})` }}
      className="min-vh-100 pb-4"
    >
      <MyNavbar />
      <MyHero />
      <ExploreProducts />
    </Container>
  );
}
