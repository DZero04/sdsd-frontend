import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import hospital_logo from "../../../assets/images/hospital_logo.png"
import usep from "../../../assets/images/usep.png"

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  // State for date picker
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  // Close the date picker when clicking outside
  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Philippine Standard Time logic
  const [philippineTime, setPhilippineTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Manila",
        hour12: true,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setPhilippineTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        {/* Sidebar Toggle Button */}
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>

        <img src={usep} alt="USeP Logo" className="area-top-logo" />
        {/* Header Titles */}
        <div>
          <h4 className="area-top-title">University of Southeastern Philippines</h4>
          <h5 className="area-top-tag">College of Information and Computing</h5>
        </div>
      </div>

      {/* Philippine Standard Time */}
      <div className="area-top-r">
        <div className="philippine-time">
          <h5>Philippine Standard Time:</h5>
          <h5>{philippineTime}</h5>
        </div>


      </div>
    </section>
  );
};

export default AreaTop;
