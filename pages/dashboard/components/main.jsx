import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import MyNavbar from "../../../components/MyNavbar";
import { isJwtExpired } from "jwt-check-expiration";
import jwt_decode from "jwt-decode";

function DashboardMain() {
  const router = useRouter();
  useEffect(() => {
    if (
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== undefined
    ) {
      if (isJwtExpired(localStorage.getItem("accessToken"))) {
        localStorage.removeItem("accessToken");
      } else {
        const user = jwt_decode(localStorage.getItem("accessToken"));
        console.log(user);
      }
    } else {
      localStorage.removeItem("accessToken");
      router.replace("/auth");
    }
  }, []);
  return (
    <Container fluid className="min-vh-100">
      <MyNavbar />
    </Container>
  );
}

export default DashboardMain;
