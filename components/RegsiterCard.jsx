import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import githubLogo from "../imgs/github.png";
import googleLogo from "../imgs/google.png";
import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";

function RegsiterCard({ switchFn }) {
  const router = useRouter();
  useEffect(() => {
    if (
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== undefined
    ) {
      router.replace("/dashboard");
    }
  }, []);

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      if (user.accessToken) {
        localStorage.setItem("accessToken", user.accessToken);
        router.replace("/dashboard");
      } else {
        localStorage.removeItem("accessToken");
      }
    } catch (err) {
      localStorage.removeItem("accessToken");
    }
  };
  return (
    <Card className="w-100 bg-transparent p-2">
      <Card.Body
        className="d-flex flex-column align-items-center"
        id="logindiv"
      >
        <Card.Title
          className="fs-1 gradient-text mb-4"
          style={{ fontFamily: "regular" }}
        >
          Get Started
        </Card.Title>
        <Button
          onClick={(e) => {
            e.preventDefault();
            googleLogin();
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
