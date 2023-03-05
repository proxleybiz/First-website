import React from "react";
import { Container } from "react-bootstrap";
import ExploreProducts from "../components/ExploreProducts";
import MyHero from "../components/MyHero";
import MyNavbar from "../components/MyNavbar";

export default function Home() {
  return (
    <Container fluid className="min-vh-100 pb-4">
      <MyNavbar />
      <MyHero />
      <ExploreProducts />
    </Container>
  );
}
