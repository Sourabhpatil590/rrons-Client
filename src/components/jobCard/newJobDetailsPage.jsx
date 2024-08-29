import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Accordion } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { CompanyCard } from "./company_card";
import { useLocation } from "react-router-dom";
import { getService } from "../../serviceAPI/serviceAPI";

const dummy_job = {
    _id: "66439cab667967fe35abb389",
    title: "Production Engineer",
    description:
        "Preparing production drawing ,making changes in shop drawings as  per site measurements maintain the design essence. Taking approval on shop drawings before initiating production  preparation. Preparing the CUTLIST, BOM as per specification and drawings. Checking the production work to ensure the working as per cultist and  BOM list Handing over the production detail to cut master in absence of  production manager and resolving their queries drawing related. Keeping records of documents project wise . increasing productivity and quality improvement and all issues related  to material sizes. ensuring that final product final product meet quality standard and  customers specification. capacity.",
    company: "Acmeview Interior solutions pvt Itd",
    location: "Bhiwandi,Mumbai.",
    salary: "18k-22k",
    appliedCandidates: [
        "66691c42cb9415da36198a53",
        "66433618f4293500c30610b0",
        "66481b33eefccfb464636a66",
    ],
    createdAt: "2024-05-14T17:17:31.337Z",
    updatedAt: "2024-08-01T09:51:49.615Z",
    __v: 4,
    skills: "Excellent at working in autocad , sketch up , top solid and cutlist  software. Knowledge of joinery details and QC Good skills to create and maintain Excel sheets on daily basis. Good Knowledge of Optimisation Software",
    experience: "2+yr",
    qualification:
        "draughtsman diploma . Auto Cad , pytha, solidworks  software",
    status: "open",
    vacancy: 2,
    category: "design",
};

const Info = ({ icon = "🏢", label = "Industry", value = "Info" }) => {
    return (
        <div className="d-flex justify-content-start align-content-center p-2">
            <span className="mx-1">{icon}</span>
            <span className="mx-1 text-muted">{label}</span>
            <span className="mx-2 text-dark fw-bold">{value}</span>
        </div>
    );
};

const NewJobDetailsPage = () => {
    // const navigate = useNavigate();
    const [job, setJob] = useState(dummy_job);

    const URL = useLocation();
    const params = new URLSearchParams(URL.search);
    const id = params.get("id");

    useEffect(() => {
        getService(`/api/jobs/${id}`).then((res) => {
            setJob(res.data);
        });
    }, []);

    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col xs={8}>
                        <Row>
                            <h3>{job.title}</h3>
                        </Row>
                        <Row></Row>
                    </Col>
                    <Col xs={4} className="text-right">
                        <Button variant="primary">Apply Now</Button>
                    </Col>
                </Row>
                <Row></Row>
            </Card.Header>
            <Card.Body>
                <Row  className="justify-content-between">
                    <Col>
                        <Row>
                            <Col md={6}>
                                <Info label="Industry" value={job.category} />
                                <Info
                                    icon={"💲"}
                                    label="Salary"
                                    value={job.salary}
                                />
                                <Info
                                    icon={"💼"}
                                    label="Job type"
                                    value="Not Specified"
                                />
                                <Info
                                    icon={"🔄"}
                                    label="Updated"
                                    value={job.updatedAt}
                                />
                            </Col>
                            <Col md={6}>
                                <Info
                                    icon="👤"
                                    label="Job Level"
                                    value="Not Specified"
                                />
                                <Info
                                    icon={"⏳"}
                                    label="Experience"
                                    value={`${job.experience} Years`}
                                />
                                <Info
                                    icon={"📅"}
                                    label="DeadLine"
                                    value="Not Specified"
                                />
                                <Info
                                    icon={"📍"}
                                    label="Location"
                                    value={job.location}
                                />
                            </Col>
                        </Row>
                        <Row></Row>
                    </Col>
                    <Col>
                        <CompanyCard />
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer className="text-center">
                <Button variant="primary">Apply Now</Button>
                <Button variant="secondary">Save Job</Button>
                <Button variant="secondary">Share</Button>
                <div className="social-icons">
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <FaWhatsapp />
                </div>
            </Card.Footer>
        </Card>
    );
};

export default NewJobDetailsPage;
