import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button, Col, Row } from 'react-bootstrap';
import FindMap from "../FindMap";

export default function Listings () {
    return (
        <>
            <Row  className="my-3">
                <Col sm={10} md={8} lg={6}>
                    <Outlet/>
                </Col>
                <Col>
                    <FindMap />
                </Col>
            </Row>
        </>
    )
}
