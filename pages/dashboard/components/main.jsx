import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Container } from "react-bootstrap";
import MyNavbar from "../../../components/MyNavbar";

function DashboardMain() {
  const router = useRouter();
  const getUserData = async () => {
    const res = await axios.get("/api/getUserData", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    if (res.data.status) {
    } else {
      localStorage.removeItem("accessToken");
      router.replace("/auth");
    }
  };
  useEffect(() => {
    if (
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== undefined
    ) {
      getUserData();
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
