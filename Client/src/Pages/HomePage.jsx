import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import styles from "./homePage.module.css";
import Button from "@mui/material/Button";
import Footer from "../Components/Footer/Footer";
import Navbar2 from "../Components/Navbar/Navbar2";
import { Link } from "react-router-dom";
import TealButton from "../Components/Main Page/TealButton";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import NextEvent from "./HomePageComps/NextEvent";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import BookmarkCard from "../Components/BookmarkCard/BookmarkCard";
import { removeFromBookmark } from "../redux/bookmark/action";
import Group from "./Group";
import { decodeToken } from "react-jwt";
// import Description from  "../Components/Description/Description"

// import Attending from "../Components/Attending/Attending";

const Home = () => {
  const [value, setValues] = React.useState({ email: "", decodedEmail: "" });

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const decoded = decodeToken(token);
    setValues({ ...value, email: email, decodedEmail: decoded.email });
  }, []);

  const { location, setLocation } = useContext(AppContext);
  const { name, setName } = useContext(AppContext);
  const navigate = useHistory();
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

  const handelClick = (item) => {
    dispatch(removeFromBookmark(item.id));
  };

  // const [name2,setName2] = useState("");
  console.log("hi", name, location);

  const handleclick2 = () => {
    navigate.push("/events");
  };
  const handleclick1 = () => {
    alert(1);
    <Link to="/findevent" replace />;
  };

  // if (!isAuth) {
  //     return <Redirect to='/'/>
  // }
  if (value.email === value.decodedEmail) {
    return (
      <div>
        <Navbar2 style={{ color: "black", backgroundColor: "white" }} />

        <div>
          <img src="/photoImg1.svg" alt="img" />
          <h1 style={{ fontWeight: "bold", fontSize: "65px", color: "black" }}>
            Welcome to Here Me Out !
          </h1>
        </div>
        <div style={{ display: "flex", gap: "3rem", padding: "5rem" }}>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: "3rem",
              margin: "20px",
              width: "50%",
            }}>
            <div>
              <img src="/photoImg2.svg" alt="img" />
            </div>
            <div style={{ textAlign: "left" }}>
              <h3>Find your first event</h3>
              <p>Events are happening 24/7. What do you want to do?</p>
              <Button variant="outlined" onClick={handleclick2}>
                Discover Events
              </Button>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              padding: "3rem",
              margin: "20px",
              width: "50%",
            }}>
            <div>
              <img src="/photoImg3.svg" alt="img" />
            </div>
            <div style={{ textAlign: "left" }}>
              <h3>Join your first group</h3>
              <p>
                As a member, you all receive updates each time your group
                schedules new events.
              </p>
              <Button variant="outlined" onClick={handleclick1}>
                Join Groups
              </Button>
            </div>
          </div>
        </div>

        <Group />

        {bookmarks.length > 0 && <h1>Saved Events</h1>}
        {bookmarks.length > 0 &&
          bookmarks.map(
            ({
              id,
              img_url,
              event_mode,
              date,
              event_name,
              event_place,
              attendees,
            }) => (
              <BookmarkCard
                key={id}
                id={id}
                img_url={img_url}
                event_mode={event_mode}
                date={date}
                event_name={event_name}
                event_place={event_place}
                attendees={attendees}
                handelClick={handelClick}
              />
            )
          )}

        <div className={styles.nextSec}>
          <NextEvent />

          <div className={styles.next2}>
            <h1>Check out what’s happening:</h1>

            <div className={styles.tealcont}>
              <TealButton label="Starting Soon" />

              <TealButton label="Today" />

              <TealButton label="Tommorow" />

              <TealButton label="This Week" />

              <TealButton label="Online" />

              <TealButton label="In Person" />

              <TealButton label="Trending Near you" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Log In First</h1>
      </div>
    );
  }
};

export default Home;
