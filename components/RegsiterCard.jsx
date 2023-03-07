import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import githubLogo from "../imgs/github.png";
import googleLogo from "../imgs/google.png";

function RegsiterCard({ switchFn }) {
  const router = useRouter();
  const [state, setState] = useState(false);
  const githubLogin = () => {
    let client_id = "";
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    ) {
      client_id = "cee6f3a04095d48f4644";
    } else {
      client_id = "1af427681a99198952e7";
    }
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
    );
  };
  const getAccessToken = async (code) => {
    const res = await axios.get("/api/getAccessToken?code=" + code);
    if (res.data.data.access_token) {
      localStorage.setItem("accessToken", res.data.data.access_token);
      router.replace("/dashboard");
    } else {
    }
  };
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");
    if (code && localStorage.getItem("accessToken") === null) {
      getAccessToken(code);
      setState(!state);
    } else if (localStorage.getItem("accessToken") !== null) {
      router.replace("/dashboard");
    }
  }, []);
  return (
    <Card className="w-100 bg-transparent p-2">
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title
          className="fs-1 gradient-text mb-4"
          style={{ fontFamily: "regular" }}
        >
          Get Started
        </Card.Title>
        <Button
          onClick={(e) => {
            e.preventDefault();
            githubLogin();
          }}
          className="d-flex flex-row align-items-center mb-4"
          style={{ gap: "10px", fontFamily: "regular" }}
          variant="dark"
        >
          <img
            src={githubLogo.src}
            style={{ height: "30px", width: "30px" }}
            className="bg-light rounded-circle p-0"
          />
          Continue with Github
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="d-flex flex-row align-items-center"
          style={{ gap: "10px", fontFamily: "regular" }}
          variant="dark"
        >
          <img
            src={googleLogo.src}
            style={{ height: "30px", width: "30px" }}
            className="bg-light rounded-circle p-0"
          />
          Continue with Google
        </Button>
        <span
          className="d-flex flex-row align-items-center text-white mt-5"
          style={{ gap: "10px", fontFamily: "regular" }}
        >
          Already have an account?
          <Button
            onClick={switchFn}
            className="p-0 m-0 bg-transparent border-0 text-primary"
          >
            Login
          </Button>
        </span>
      </Card.Body>
    </Card>
  );
}

export default RegsiterCard;
