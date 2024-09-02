import Card from "react-bootstrap/Card";
import { Button } from "..";
import "./jobCard.scss";
import { useNavigate } from "react-router-dom";
import CompanyHeader from "./company_header";

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

export function CompanyCard({ job = dummy_job }) {
    const navigate = useNavigate();

    return (
        <Card className="mb-3" style={{ width: "365px" }}>
            <Card.Body>
                <CompanyHeader
                    location={job.location}
                    company_name={job.company}
                    logo_alt={job.company}
                />
                <hr />
                {/* <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {job.category} · <FaMapMarkerAlt size={16} color="" />
                    {job.location}
                </Card.Subtitle>
                <Card.Text
                    className=""
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
                    {job.description.slice(0, 120)} ...
                </Card.Text>
                <Row>
                    <Col>{job.experience}</Col>
                </Row> */}
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
