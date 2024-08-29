import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";

function CompanyHeader({
    company_name = "Rrons",
    logo = "./logo.jpg",
    logo_alt = "Rrons Logo",
    location = "Pune",
}) {
    return (
        <Row style={{}}>
            <Col xs={2}>
                {/* Replace with your Tesla logo or any other logo */}
                <img
                    alt={logo_alt}
                    src={logo}
                    width={"54px"}
                    height={"54px"}
                    style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                    }}
                />
            </Col>
            <Col xs={10}>
                <Card.Title className="ml-2">{company_name}</Card.Title>
                <Card.Subtitle className="mb-2 ml-2 gap-2 text-muted">
                    <FaMapMarkerAlt size={16} color="" />
                    {location}
                </Card.Subtitle>
            </Col>
        </Row>
    );
}

export default CompanyHeader;
