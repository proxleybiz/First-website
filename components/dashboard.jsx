import React, { Fragment, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import print from "../imgs/print.png";
import box from "../imgs/package.png";
import {
  CUSTOMIZATION,
  FILTER_ONE,
  FILTER_TWO,
  PACKAGING,
  PRINTING,
} from "../utils/constants";
import { SketchPicker } from "react-color";
import OrderDetailsModal from "./OrderDetailsModal";

function Dashboard() {
  const [filters, setFilters] = useState({
    catOne: "",
    catTwo: "",
    catThree: "",
  });
  const [customization, setCustomization] = useState([]);
  const [show, setShow] = useState(false);

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

  const getSecondFilters = (catOne) => {
    switch (catOne) {
      case PRINTING: {
        const result = FILTER_TWO.find((i) => i.category === catOne);
        if (!result) {
          return [];
        }
        return result.items;
      }
      case PACKAGING: {
        const result = FILTER_TWO.find((i) => i.category === catOne);
        if (!result) {
          return [];
        }
        return result.items;
      }
      default: {
        return [];
      }
    }
  };

  const getThirdFilter = (catTwo, catOne) => {
    const result = FILTER_TWO.find((i) => i.category === catOne);
    if (!result) {
      return [];
    }
    const temp = result.items.find((i) => i.name === catTwo);
    if (!temp) {
      return [];
    }
    return temp.options;
  };
  return (
    <Container className="container-lg" style={{ fontFamily: "regular" }}>
      <Row className="justify-content-around">
        {FILTER_ONE.map((item, key) => {
          return (
            <Col className="p-3" key={key} sm={6} lg={3}>
              <Card
                className={
                  "rounded w-100 p-2 d-flex flex-column align-items-center hover-select"
                }
                onClick={() => {
                  setFilters({ catOne: item.name, catTwo: "", catThree: "" });
                  const result = CUSTOMIZATION.find(
                    (i) => i.category === item.name
                  );

                  if (!result) {
                    setCustomization([]);
                  } else if (item.name === PRINTING) {
                    setCustomization([
                      ...result.options.map((i) => {
                        return { ...i, selectedValue: "" };
                      }),
                      {
                        name: "Select Multicolor/Singlecolor",
                        type: "DROP",
                        values: ["SINGLECOLOR", "MULTICOLOR"],
                        selectedValue: "",
                      },
                      {
                        name: "Select Color",
                        type: "DROP",
                        values: ["CYAN", "BLACK", "MAGENTA", "YELLOW"],
                        selectedValue: "",
                      },
                    ]);
                  } else {
                    setCustomization(
                      result.options.map((i) => {
                        return { ...i, selectedValue: "" };
                      })
                    );
                  }
                }}
                style={{
                  background:
                    filters.catOne === item.name
                      ? "rgb(167, 199, 231, 0.7)"
                      : "",
                }}
              >
                <img
                  src={item.img}
                  style={{ height: "8rem", width: "fit-content" }}
                />
                <h2> {item.name} </h2>
              </Card>
            </Col>
          );
        })}
        {filters.catOne !== "" && (
          <Fragment>
            <h2 className="fs-3 text-center text-muted my-4">
              Select your {filters.catOne} category
            </h2>
            <Row className="justify-content-center">
              {getSecondFilters(filters.catOne).map((item, key) => {
                return (
                  <Col key={key} sm={6} md={4} lg={3} className="mb-4">
                    <Card
                      className="w-100 p-2 rounded d-flex flex-column align-items-center hover-select"
                      onClick={() => {
                        setFilters({
                          ...filters,
                          catTwo: item.name,
                          catThree: "",
                        });
                      }}
                      style={{
                        background:
                          filters.catTwo === item.name
                            ? "rgb(167, 199, 231, 0.7)"
                            : "",
                      }}
                    >
                      <img
                        src={item.img}
                        style={{ height: "6rem", width: "fit-content" }}
                      />
                      <h5> {item.name} </h5>
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <Form.Group>
              <Form.Label className="text-white"> Select Type </Form.Label>
              <Form.Select
                value={filters.catThree}
                onChange={(e) => {
                  setFilters({ ...filters, catThree: e.target.value });
                }}
              >
                <option value=""> Select </option>
                {getThirdFilter(filters.catTwo, filters.catOne).map(
                  (i, key) => (
                    <option value={i.name} key={key}>
                      {i.name}
                    </option>
                  )
                )}
              </Form.Select>
            </Form.Group>
          </Fragment>
        )}
        {filters.catOne.trim() !== "" && (
          <Fragment>
            <h2 className="fs-3 text-center text-muted my-4">
              Customize your {filters.catOne}
            </h2>
            {customization.map((item, key) => {
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
                      <Form.Label className="text-white">
                        {item.name}
                      </Form.Label>
                      <Form.Select
                        value={
                          customization.find((c) => c.name === item.name)
                            ?.selectedValue
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
                      <p
                        className="text-white mb-0"
                        style={{ width: "max-content" }}
                      >
                        {item.name}
                      </p>
                      <Form.Control
                        placeholder={item.name}
                        value={
                          customization.find((c) => c.name === item.name)
                            ?.selectedValue
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
                      <Form.Label className="text-white">
                        {item.name}
                      </Form.Label>
                      <SketchPicker
                        color={
                          customization.find((c) => c.name === item.name)
                            ?.selectedValue
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
                      <Form.Label className="text-white">
                        {item.name}
                      </Form.Label>
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
            })}
            <Button
              style={{ backgroundColor: "#2160fd", width: "fit-content" }}
              className="text-white mx-auto mt-4"
              onClick={(e) => {
                e.preventDefault();
                validateData();
              }}
            >
              Continue
            </Button>
            <OrderDetailsModal
              show={show}
              handleClose={() => {
                setShow(false);
              }}
              customization={customization}
              filters={filters}
            />
          </Fragment>
        )}
      </Row>
    </Container>
  );
}

export default Dashboard;
