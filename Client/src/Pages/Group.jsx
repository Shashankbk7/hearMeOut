import { padding } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Group() {
  const [data, setData] = useState([]);
  const history = useHistory();

  const fetchGroupData = async () => {
    const response = await fetch("http://localhost:6969/api/yourgroups", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const rData = await response.json();
    if (rData.status == "ok") {
      console.log(rData.data.groups);
      setData(rData.data.groups);
    } else {
      alert("Couldn't fetch Groups");
    }
  };

  const eventsTrigger = (e) => {
    e.preventDefault();
    history.push("/events");
  };
  useEffect(() => {
    fetchGroupData();
  }, []);

  return (
    <div>
      <h1>Your Created Groups will show here.</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {data.map((i) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "1rem",
              }}>
              <div
                onClick={eventsTrigger}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                  margin: "5px",
                  width: "500px",
                  borderRadius: "20px",
                  "box-shadow": "0 3px 10px rgb(0 0 0 / 0.2)",
                  "border-radius": "20px",
                  cursor: "pointer",
                }}>
                <div style={{ marginTop: "20px" }}>
                  <img
                    src="logo1.png"
                    alt="img"
                    style={{
                      width: "100px",
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "padding-right": "2rem",
                    }}
                  />
                </div>
                <div style={{ textAlign: "left" }}>
                  <h3>Event Name : {i.gName}</h3>
                  <p>
                    <strong>Event Location : </strong>
                    {i.gLocation}
                  </p>
                  <p>
                    {" "}
                    <strong> Event Description :</strong> Warm welcome from
                    Nepal Cloud Professional's community! In Azure Saturday, we
                    are planning to come up with following topics of
                    discussions:
                  </p>
                  <p>----------------------------------</p>
                  <p>
                    {" "}
                    <strong> SESSION DETAILS </strong>
                  </p>
                  <p>----------------------------------</p>
                  <p>
                    11:00am – 11:30am - Getting started with Azure Cognitive
                    Services
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
