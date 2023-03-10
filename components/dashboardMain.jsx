import React, { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { Container, Tab, Tabs } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import Head from "next/head";
import userContext from "../context/user/userContext";
import dynamic from "next/dynamic";
import Loading from "./Loading";
const MobileVerification = dynamic(() => import("./mobileVerification"), {
  ssr: false,
});

function DashboardMain() {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("profile");
  const [selectedComponent, setSelectedComponent] = useState(null);
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

  useEffect(() => {
    switch (selectedTab) {
    }
  }, [selectedTab]);
  return (
    <Container fluid className="min-vh-100">
      <Head>
        <title> Dashboard | Proxley </title>
      </Head>
      <MyNavbar mode={1} />
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {userCtx.user && userCtx.user.phoneNumber.trim() !== "" ? (
            <>
              <Tabs
                style={{ fontFamily: "regular", width: "fit-content" }}
                className="border-0 mx-auto"
                onSelect={(e) => {
                  setSelectedTab(e);
                }}
              >
                <Tab eventKey="profile" title="Profile"></Tab>
                <Tab eventKey="orders" title="Orders"></Tab>
                <Tab eventKey="dashboard" title="Dashboard"></Tab>
              </Tabs>
            </>
          ) : (
            <MobileVerification />
          )}
        </Fragment>
      )}
    </Container>
  );
}

export default DashboardMain;
