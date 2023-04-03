import React, { Fragment, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { Button, Form, Row } from "react-bootstrap";
import { SketchPicker } from "react-color";
import { PRINTING } from "../utils/constants";

function Customizations({ filters, customization, setCustomization, discard }) {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const validateData = () => {
    if (
      filters.catOne === "" ||
      filters.catTwo === "" ||
      filters.catThree === ""
    ) {
      return alert("Please select packaging type and format");
    }

    for (let i = 0; i < customization.length; i++) {
      if (customization[i].selectedValue.toString().trim() === "") {
        alert(customization[i].name);
        return;
      }
    }
    setShow(true);
  };

  const render = (index) => {
    const item = customization[index];
    if (filters.catOne === PRINTING && item.name === "Select Color") {
      const temp = customization.find(
        (t) => t.name === "Select Multicolor/Singlecolor"
      );
      if (temp) {
        item.type =
          temp.selectedValue === "SINGLECOLOR"
            ? "COLOR"
            : temp.selectedValue === "MULTICOLOR"
            ? "DROP"
            : "";
      }
    }
    switch (item.type) {
      case "DROP": {
        return (
          <Form.Group className="mt-4">
            <Form.Label className="text-white">{item.name}</Form.Label>
            <Form.Select
              value={
                customization.find((c) => c.name === item.name)?.selectedValue
              }
              onChange={(e) => {
                setCustomization(
                  customization.map((c) => {
                    if (c.name === item.name) {
                      return { ...c, selectedValue: e.target.value };
                    }
                    return c;
                  })
                );
              }}
            >
              <option value=""> Select </option>
              {item.values.map((val, k) => (
                <option key={k}> {val} </option>
              ))}
            </Form.Select>
          </Form.Group>
        );
      }
      case "TEXT": {
        return (
          <div
            className="mt-4 d-flex align-items-center"
            style={{ gap: "10px" }}
          >
            <p className="text-white mb-0" style={{ width: "max-content" }}>
              {item.name}
            </p>
            <Form.Control
              placeholder={item.name}
              value={
                customization.find((c) => c.name === item.name)?.selectedValue
              }
              style={{ flex: "1" }}
              onChange={(e) => {
                setCustomization(
                  customization.map((c) => {
                    if (c.name === item.name) {
                      return { ...c, selectedValue: e.target.value };
                    }
                    return c;
                  })
                );
              }}
            />
          </div>
        );
      }
      case "COLOR": {
        return (
          <Form.Group className="mt-4">
            <Form.Label className="text-white">{item.name}</Form.Label>
            <SketchPicker
              color={
                customization.find((c) => c.name === item.name)?.selectedValue
              }
              onChangeComplete={(e) => {
                setCustomization(
                  customization.map((c) => {
                    if (c.name === item.name) {
                      return { ...c, selectedValue: e.hex };
                    }
                    return c;
                  })
                );
              }}
            />
          </Form.Group>
        );
      }
      case "FILE": {
        return (
          <Form.Group className="mt-4">
            <Form.Label className="text-white">{item.name}</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                setCustomization(
                  customization.map((c) => {
                    if (c.name === item.name) {
                      return {
                        ...c,
                        selectedValue: e.target.files[0],
                      };
                    }
                    return c;
                  })
                );
              }}
            />
          </Form.Group>
        );
      }
      default: {
        return null;
      }
    }
  };
  return (
    <Fragment>
      <h2 className="fs-3 text-center text-muted my-4">
        Customize your {filters.catOne}
      </h2>
      {render(index)}
      <Row style={{ gap: "1rem" }} className="justify-content-start">
        <Button
          style={{
            backgroundColor: "rgba(255,255,255,0.6)",
            width: "fit-content",
          }}
          className="text-white mt-4 border-0"
          onClick={(e) => {
            e.preventDefault();
            discard();
          }}
        >
          Discard
        </Button>
        <Button
          style={{ backgroundColor: "#2160fd", width: "fit-content" }}
          className="text-white mt-4"
          onClick={(e) => {
            e.preventDefault();
            setIndex(Math.max(index - 1, 0));
          }}
        >
          Previous
        </Button>
        {index < customization.length - 1 ? (
          <Button
            style={{ backgroundColor: "#2160fd", width: "fit-content" }}
            className="text-white mt-4"
            onClick={(e) => {
              e.preventDefault();
              if (customization[index].selectedValue.toString().trim() === "") {
                alert(customization[index].name);
                return;
              }
              setIndex(Math.min(index + 1, customization.length - 1));
            }}
          >
            Continue
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: "#2160fd", width: "fit-content" }}
            className="text-white mt-4"
            onClick={(e) => {
              e.preventDefault();
              validateData();
            }}
          >
            {"Let's Preview"}
          </Button>
        )}
      </Row>
      <OrderDetailsModal
        show={show}
        handleClose={() => {
          setShow(false);
        }}
        customization={customization}
        filters={filters}
      />
    </Fragment>
  );
}

export default Customizations;
