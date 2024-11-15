import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

const CustomDateFormatter = ({ inputDate }: any) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Parse the input date string using Moment.js
    const parsedDate = moment(inputDate, "MM/DD/YY h:mm A");

    // Format the date as "DD MMM h.mm A"
    const formattedDateString = parsedDate.format("DD MMM h.mm A");

    // Set the formatted date in the state
    setFormattedDate(formattedDateString);
  }, [inputDate]);

  return <> {formattedDate}</>;
};

CustomDateFormatter.propTypes = {
  inputDate: PropTypes.string.isRequired,
};

export default CustomDateFormatter;
