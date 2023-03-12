import React, { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";
import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import Head from "next/head";
import userContext from "../context/user/userContext";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import Orders from "./orders";
const Profile = dynamic(() => import("./profile"), { ssr: false });
const MobileVerification = dynamic(() => import("./mobileVerification"), {
  ssr: false,
});

function DashboardMain() {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [renderElement, setRenderElement] = useState(null);
  const tabs = ["Profile", "Dashboard", "Orders"];
  const getUser = () => {
    setLoading(true);
    userCtx.getUser(
      () => {
        setLoading(false);
        setSelectedTab("Orders");
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
      case "Profile":
        {
          setRenderElement(<Profile />);
        }
        break;
      case "Orders":
        {
          setRenderElement(<Orders />);
        }
        break;
      default: {
        setRenderElement(null);
      }
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
              <Row className="justify-content-center">
                <ButtonGroup
                  size="lg"
                  className="mt-2 mb-4 mx-auto"
                  style={{ width: "fit-content" }}
                >
                  {tabs.map((tab, key) => {
                    return (
                      <Button
                        key={key}
                        className="border-0 fs-5"
                        style={{
                          background:
                            tab === selectedTab
                              ? "#2160fd"
                              : "rgba(255,255,255,0.2)",
                          fontFamily: "regular",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTab(tab);
                        }}
                      >
                        {tab}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Row>
              {renderElement}
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
