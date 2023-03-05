import React from "react";
import { Button, Card } from "react-bootstrap";

function RegsiterCard({switchFn}) {
  return (
    <Card className="w-100 bg-transparent p-2">
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title
          className="fs-1 gradient-text"
          style={{ fontFamily: "regular" }}
        >
          Get Started
        </Card.Title>
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
