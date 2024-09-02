import React from "react";
import { Col } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { PiBriefcaseThin, PiLineVerticalThin } from "react-icons/pi";
export const JobSearchBar = () => {
    let locationList = [
        { key: "all", value: "Location" },
        { key: "delhi", value: "Delhi" },
        { key: "mumbai", value: "Mumbai" },
        { key: "Parabhani", value: "Parabhani" },
    ];
    return (
        <Col className="d-flex search-bar">
            <PiBriefcaseThin className="" />
            <input type="text" placeholder="Job title or Designation" />
            {/* <p className="vertical-bar">|</p> */}
            <PiLineVerticalThin />
            <CiLocationOn className="" />
            <select name="location">
                {locationList.map((location) => (
                    <option key={location.key} value={location.key}>
                        {location.value}
                    </option>
                ))}
            </select>

            <div className="search-icon">
                <img
                    src="/searchIcon.png"
                    alt="search-icon"
                    width="20px"
                    // height="20px"
                />
            </div>
            {/* </div> */}
        </Col>
    );
};
