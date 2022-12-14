import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EventComponent from "./EventComponent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark, removeFromBookmark } from "../../redux/bookmark/action";

const styleContainer = {
  width: "640px",
  marginLeft: "12vw",
};

function Event() {
  const days = [
    "Starting soon",
    "Today",
    "Tomorrow",
    "This week",
    "This weekend",
    "Next week",
    "Custom",
  ];

  const distance = [2, 5, 10, 25, 50, 100];

  const category = [
    "Art & Culture",
    "Career & Business",
    "Community & Environment",
    "Dancing",
    "Games",
    "Health & Wellbeing",
    "Hobbies & Passions",
    "Identity & Language",
    "Movements & Politics",
    "Music",
    "Parents & Family",
    "Pets & Animals",
    "Religion & Spirituality",
    "Science & Education",
    "Social Activities",
    "Sports & Fitness",
    "Support & Coaching",
    "Technology",
    "Travel & Outdoor",
    "Writing",
  ];

  const [dayType, setDayType] = React.useState("");
  const [type, setType] = React.useState("");
  const [dist, setDist] = React.useState(Infinity);
  const [cate, setCate] = React.useState("");

  const handleDayType = (event) => {
    setDayType(event.target.value);
  };
  const handleType = (event) => {
    setType(event.target.value);
  };
  const handleDist = (event) => {
    setDist(event.target.value);
  };
  const handleCategory = (event) => {
    setCate(event.target.value);
  };

  const [data, setData] = React.useState([]);

  // const getEvents = async () => {
  //   let eventData = await axios.get(
  //     "https://meetupserverjsonserver.herokuapp.com/posts"
  //   );
  //   eventData = eventData.data;
  //   setData(eventData);
  //   console.log(eventData);
  // };

  // React.useEffect(() => {
  //   getEvents();
  // }, []);
  React.useEffect(async () => {
    const response = await fetch("http://localhost:6969/api/events");
    const data = await response.json();
    console.log(data);
    setData(data);
  });

  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);
  console.log("Bookmarks", bookmarks);
  const handelClick = (item) => {
    for (let i = 0; i < bookmarks.length; i++) {
      if (item.id === bookmarks[i].id) {
        dispatch(removeFromBookmark(item.id));
        return;
      }
    }
    dispatch(addToBookmark(item));
  };

  return (
    <div style={styleContainer}>
      <br />
      <div>
        <Select
          sx={{ maxHeight: 46, m: 1, borderRadius: 10, minWidth: 140 }}
          value={dayType}
          onChange={handleDayType}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value="">
            <em>Any Day</em>
          </MenuItem>
          {days.map((day) => (
            <MenuItem value={day}>{day}</MenuItem>
          ))}
        </Select>
        <Select
          sx={{ maxHeight: 46, m: 1, borderRadius: 10, minWidth: 140 }}
          value={type}
          onChange={handleType}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value="">
            <em>Any Type</em>
          </MenuItem>
          <MenuItem value="Online">Online</MenuItem>)
          <MenuItem value="InPerson">In Person</MenuItem>)
        </Select>

        <Select
          sx={{ maxHeight: 46, m: 1, borderRadius: 10, minWidth: 140 }}
          value={dist}
          onChange={handleDist}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={Infinity}>
            <em>Any Distance</em>
          </MenuItem>
          {distance.map((d) => (
            <MenuItem value={d}>{d} miles</MenuItem>
          ))}
        </Select>

        <Select
          sx={{ maxHeight: 46, m: 1, borderRadius: 10, minWidth: 140 }}
          value={cate}
          onChange={handleCategory}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value="">
            <em>Any Category</em>
          </MenuItem>
          {category.map((d) => (
            <MenuItem value={d}>{d}</MenuItem>
          ))}
        </Select>
      </div>

      {data.length !== 0 ? (
        <div>
          {type === ""
            ? data.map(
                ({
                  id,
                  img_url,
                  date,
                  event_mode,
                  event_name,
                  event_place,
                  attendees,
                }) => (
                  <EventComponent
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
              )
            : type === "Online"
            ? data
                .filter(({ event_mode }) => event_mode === "online")
                .map(
                  ({
                    id,
                    img_url,
                    date,
                    event_mode,
                    event_name,
                    event_place,
                    attendees,
                  }) => (
                    <EventComponent
                      kye={id}
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
                )
            : data
                .filter(({ event_mode }) => event_mode === "In-person")
                .map(
                  ({
                    id,
                    img_url,
                    date,
                    event_mode,
                    event_name,
                    event_place,
                    attendees,
                  }) => (
                    <EventComponent
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
        </div>
      ) : (
        <Stack spacing={1}>
          <hr />
          <Skeleton variant="rectangular" width={640} height={128} />
          <Skeleton variant="rectangular" width={640} height={128} />
          <Skeleton variant="rectangular" width={640} height={128} />
          <Skeleton variant="rectangular" width={640} height={128} />
          <Skeleton variant="rectangular" width={640} height={128} />
          <Skeleton variant="rectangular" width={640} height={128} />
        </Stack>
      )}
    </div>
  );
}

export default Event;
