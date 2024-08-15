import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../../components";
import "./jobCard.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ConfirmationModal } from "../../components";
import { deleteService, putService } from "../../serviceAPI/serviceAPI";
import { mapping } from "../../pages/commonData/categoryDropdown";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function JobCard(props) {
    const role = useSelector((state) => state.currentUser.role);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const closePosition = async (e) => {
        try {
            await deleteService(`/api/jobs/${props.job._id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const reOpenPosition = async (e) => {
        console.log("re-open");
        try {
            await putService(`/api/jobs/re-open/${props.job._id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleClosePosition = async (e) => {
        setModalTitle("Close Position");
        setModalMessage("Are you sure you want to close this position?");
        setShowConfirmation(true);
    };

    const handleReOpenPosition = (e) => {
        setModalMessage("Are you sure you want to re-open this position?");
        setModalTitle("Re-open Position");
        setShowConfirmation(true);
    };

    const handleConfirmation = async () => {
        setShowConfirmation(false);
        if (modalTitle === "Close Position") await closePosition();
        if (modalTitle === "Re-open Position") await reOpenPosition();
    };

    const handleCancelConfirmation = () => {
        setShowConfirmation(false);
    };

    const appliedCandidates = (e) => {
        navigate(`/applied-candidates/?id=${props.job._id}`);
    };

    return (
        <>
            <ConfirmationModal
                show={showConfirmation}
                title={modalTitle}
                message={modalMessage}
                onConfirm={handleConfirmation}
                onCancel={handleCancelConfirmation}
            />
            <Col md={3} className="p-3 job-card m-2">
                <Row className="job-card-title">
                    <Col>
                        <h3>{props.job.title}</h3>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Description</p>
                    </Col>
                    <Col>
                        <p>{props.job.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Company</p>
                    </Col>
                    <Col>
                        <p>{props.job.company}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Location</p>
                    </Col>
                    <Col>
                        <p>{props.job.location}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Skills</p>
                    </Col>
                    <Col>
                        <p>{props.job.skills}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Qualification</p>
                    </Col>
                    <Col>
                        <p>{props.job.qualification}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Salary</p>
                    </Col>
                    <Col>{props.job.salary}</Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Experience</p>
                    </Col>
                    <Col>{props.job.experience}</Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Vacancies</p>
                    </Col>
                    <Col>{props.job.vacancy}</Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Category</p>
                    </Col>
                    <Col>{mapping[props.job.category]}</Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <p className="fw-bold">Status</p>
                    </Col>
                    <Col>{props.job.status}</Col>
                </Row>
                <hr />
                <Row>
                    {role === "admin" ? (
                        <Col className="d-flex justify-content-center">
                            <Button
                                onClick={() =>
                                    navigate(
                                        `/job-details/?mode=update&id=${props.job._id}`
                                    )
                                }
                                text="Update"
                            />
                            <Button
                                onClick={
                                    props.job.status === "open"
                                        ? handleClosePosition
                                        : handleReOpenPosition
                                }
                                text={
                                    props.job.status === "open"
                                        ? "Close"
                                        : "Re-open"
                                }
                            />
                            <Button
                                onClick={appliedCandidates}
                                text="Applied candidates"
                            />
                        </Col>
                    ) : (
                        <Col className="d-flex justify-content-center">
                            <Button
                                onClick={() =>
                                    navigate(
                                        `/candidate-login/?id=${props.job._id}`
                                    )
                                }
                                text="Apply"
                            />
                        </Col>
                    )}
                </Row>
            </Col>
        </>
    );
}

// Move the export statement outside of the function component
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

export function NewJobCard({ job = dummy_job }) {
    const navigate = useNavigate();

    return (
        // <Card style={{ width: "365px" }}>
        //     <Card.Header as="h5">
        //         <Container>
        //             <Row>
        //                 <Col sm={2} style={{ padding: 0, backgroundColor: "" }}>
        //                     <img
        //                         src="./logo.jpg"
        //                         width={"54px"}
        //                         height={"54px"}
        //                     />
        //                 </Col>

        //                 <Col sm={true} style={{ backgroundColor: "" }}>
        //                     <Card.Title>{job.company}</Card.Title>
        //                     <Card.Subtitle className="mb-2 text-muted">
        //                         {job.location}
        //                     </Card.Subtitle>
        //                 </Col>
        //             </Row>
        //         </Container>
        //     </Card.Header>
        //     <Card.Body>
        //         <Card.Title>{job.title}</Card.Title>
        //         <Card.Subtitle className="mb-2 text-muted">
        //             {job.location}
        //         </Card.Subtitle>
        //         <Card.Text>{job.description}</Card.Text>
        //     </Card.Body>
        //     <Card.Footer className="text-muted">
        //         <Container>
        //             <Row sm={true}>
        //                 <Col
        //                     sm={true}
        //                     style={{ padding: 0, backgroundColor: "" }}
        //                 >
        //                     <Card.Text>{job.createdAt}</Card.Text>
        //                 </Col>
        //                 <Col
        //                     sm={true}
        //                     style={{ padding: 0, backgroundColor: "" }}
        //                 >
        //                     <Button
        //                         className="login-button"
        //                         text="Apply"
        //                         onClick={() =>
        //                             navigate(`/candidate-login/?id=${job._id}`)
        //                         }
        //                     />
        //                 </Col>
        //             </Row>
        //         </Container>
        //     </Card.Footer>
        // </Card>
        <Card className="mb-3" style={{ width: "365px" }}>
            <Card.Body>
                <Row style={{}}>
                    <Col xs={2}>
                        {/* Replace with your Tesla logo or any other logo */}
                        <img
                            alt="Rrons Logo"
                            src="./logo.jpg"
                            width={"54px"}
                            height={"54px"}
                            style={{
                                border: "1px solid gray",
                                borderRadius: "5px",
                            }}
                        />
                    </Col>
                    <Col xs={10}>
                        <Card.Title className="ml-2">{job.company}</Card.Title>
                        <Card.Subtitle className="mb-2 ml-2 gap-2 text-muted">
                            <FaMapMarkerAlt size={16} color="" />
                            {job.location}
                        </Card.Subtitle>
                    </Col>
                </Row>
                <hr />
                {/* <div
                    style={{
                        // lineHeight: "2px",
                        // color: "black",
                        margin: "1px",
                        borderBottom: "1px solid black",
                    }}
                /> */}
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {job.category} · <FaMapMarkerAlt size={16} color="" />{" "}
                    {job.location}
                </Card.Subtitle>
                <Card.Text
                    className="trucate-text truncate-overflow "
                    style={{
                        // // display: "inline-block",
                        // // WebkitLineClamp: 3,
                        // overflow: "hidden",
                        // textWrap : "wrap",
                        // // maxWidth: "150px",
                        // whiteSpace: "pre",
                        // // textWrap: "wrap",
                        maxHeight: "150px",
                        // textOverflow: "ellipsis",
                    }}
                >
                    {job.description}
                </Card.Text>
                <Row>
                    {/* {job.skills.map((skill) => (
                        <Col>{skill}</Col>
                        ))} */}
                    <Col>{job.experience}</Col>
                </Row>
                {/* <div
                    style={{
                        // lineHeight: "2px",
                        // color: "black",
                        margin: "1px",
                        borderBottom: "1px solid black",
                    }}
                /> */}
                <hr />
                <div className="d-flex justify-content-between">
                    <small className="text-muted">
                        {Math.trunc(
                            (new Date().getTime() -
                                new Date(job.updatedAt).getTime()) /
                                1000 /
                                60 /
                                60 /
                                24
                        )}{" "}
                        days ago
                    </small>
                    {/* <Button variant="primary">Apply Now</Button> */}
                    <Button
                        className="login-button"
                        text="Apply"
                        onClick={() =>
                            navigate(`/candidate-login/?id=${job._id}`)
                        }
                    />
                </div>
            </Card.Body>
        </Card>
    );
}
