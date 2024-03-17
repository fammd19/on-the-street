import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button, Col, Row } from 'react-bootstrap';
import FindMap from "../FindMap";

export default function Listings () {
    return (
        <>
            <Row  className="my-5 mx-4 justify-content-md-center">
                <Col>
                    <Link className="ml-3" to="../listings"><Button disabled variant="success">Current listings</Button></Link>
                    <Link className="mx-3" to="/share"><Button variant="success">Add a listing</Button></Link>
                </Col>
            </Row>
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
