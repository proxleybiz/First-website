import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import MyNavbar from "../../../components/MyNavbar";
import { isJwtExpired } from "jwt-check-expiration";
import jwt_decode from "jwt-decode";
import Head from "next/head";
import userContext from "../../../context/user/userContext";

function DashboardMain() {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const getUser = () => {
    setLoading(true);
    userCtx.getUser(
      () => {
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        localStorage.removeItem("accessToken");
        router.replace("/auth");
      }
    );
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Container fluid className="min-vh-100">
      <Head>
        <title> Dashboard | Proxley </title>
      </Head>
      <MyNavbar />
    </Container>
  );
}

export default DashboardMain;
