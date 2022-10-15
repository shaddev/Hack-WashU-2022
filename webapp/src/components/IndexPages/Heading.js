import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Heading.css";

const Heading = (props) => {
  const type = props.user.type;
  const isLoggedIn = props.isLoggedIn;

  const navigate = useNavigate();

  const navigateHome = () => {
    if (isLoggedIn) {
      if (type === "student") {
        navigate("/student/view");
      } else if (type === "contributor") {
        navigate("/contributor/view");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="heading" onClick={navigateHome}>
      <h3>Logged In? {props.isLoggedIn.toString()}</h3>
    </div>
  );
};

export default Heading;
