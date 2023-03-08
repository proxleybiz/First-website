import React, { useState, useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import githubLogo from "../imgs/github.png";
import googleLogo from "../imgs/google.png";
import userContext from "../context/user/userContext";
import { useRouter } from "next/router";

function LoginCard({ switchFn }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(userContext);
  const router = useRouter();

  const login = () => {
    setLoading(true);
    userCtx.login(
      { ...credentials },
      () => {
        setLoading(false);
        router.replace("/dashboard");
      },
      (err) => {
        setLoading(false);
      }
    );
  };
  return (
    <Card className="w-100 bg-transparent p-2">
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title
          className="fs-1 gradient-text"
          style={{ fontFamily: "regular" }}
        >
          Welcome Back!
        </Card.Title>
        <Form.Group className="mb-3 w-100">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={credentials.email}
            onClick={(e) => {
              setCredentials({ ...credentials, email: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100">
          <Form.Control
            type="password"
            placeholder="Password"
            value={credentials.password}
            onClick={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
          />
        </Form.Group>
        <Button
          className="btn-hover w-100 mb-3"
          style={{ fontFamily: "regular" }}
        >
          LOGIN
        </Button>
        <p className="w-100 text-center fs-6 text-light"> OR </p>
        <Button
          onClick={(e) => {
            e.preventDefault();
            //githubLogin();
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
            //googleLogin();
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
          Don&apos;t have an account?
          <Button
            onClick={switchFn}
            className="p-0 m-0 bg-transparent border-0 text-primary"
          >
            Regsiter
          </Button>
        </span>
      </Card.Body>
    </Card>
  );
}

export default LoginCard;
