import React, { useEffect, useState } from "react";
import { Accordion, Card, Form, Col, Button } from "react-bootstrap";
import { updateJobFilter } from "../../slices/jobsSlice";
import { useDispatch } from "react-redux";

const default_filter = {
    sorted_by: "DATE_POSTED", // DATE_POSTED / SALARY_HIGH_LOW / SALARY_LOW_HIGH,
    date_posted: "ALL", // ALL / LAST_24_HOURS / LAST_3_DAYS / LAST_7_DAYS
    work_mode: "ALL", // HIBRID / WFH / WFO
    experience: -1,
};
export const JobsFilterLayout = () => {
    const [filter, setFilter] = useState(default_filter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateJobFilter(filter));
    }, [filter]);
    return (
        <>
            {/* <div>
                <Button variant="outline-info">Info</Button>
            </div> */}

            <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Sort By</Accordion.Header>
                    <Accordion.Body alwaysOpen>
                        <Form>
                            {[
                                { key: "Date Posted", value: "DATE_POSTED" },
                                {
                                    key: "Salary High to Low",
                                    value: "SALARY_HIGH_LOW",
                                },
                                {
                                    key: "Salary Low to High",
                                    value: "SALARY_LOW_HIGH",
                                },
                            ].map((sort) => (
                                <Form.Check
                                    type="radio"
                                    label={sort.key}
                                    checked={sort.value === filter.sorted_by}
                                    onChange={(value) =>
                                        setFilter({
                                            ...filter,
                                            sorted_by: sort.value,
                                        })
                                    }
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Date Posted</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {[
                                { key: "All", value: "ALL" },
                                {
                                    key: "Last 7 days",
                                    value: "LAST_7_DAYS",
                                },
                                {
                                    key: "Last 3 days",
                                    value: "LAST_3_DAYS",
                                },
                                {
                                    key: "Last 24 hours",
                                    value: "LAST_24_HOURS",
                                },
                            ].map((sort) => (
                                <Form.Check
                                    type="radio"
                                    label={sort.key}
                                    checked={sort.value === filter.date_posted}
                                    onChange={(value) =>
                                        setFilter({
                                            ...filter,
                                            date_posted: sort.value,
                                        })
                                    }
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Work Mode</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {[
                                { key: "All", value: "ALL" },
                                { key: "Hibrid", value: "HIBRID" },
                                {
                                    key: "WFH",
                                    value: "WFH",
                                },
                                {
                                    key: "WFO",
                                    value: "WFO",
                                },
                            ].map((sort) => (
                                <Form.Check
                                    type="radio"
                                    label={sort.key}
                                    checked={sort.value === filter.work_mode}
                                    onChange={(value) =>
                                        setFilter({
                                            ...filter,
                                            work_mode: sort.value,
                                        })
                                    }
                                />
                            ))}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Experience</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Label>{filter.experience} Years</Form.Label>
                            <Form.Range
                                value={filter.experience}
                                max={20}
                                min={-1}
                                onChange={(value) =>
                                    setFilter({
                                        ...filter,
                                        experience: value.target.value,
                                    })
                                }
                            />
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};
