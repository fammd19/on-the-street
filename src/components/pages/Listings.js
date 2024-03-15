import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button, Col, Row } from 'react-bootstrap';

export default function Listings () {
    return (
        <>
            <div className="mx-5 my-5">
                <Link className="ml-3" to="../listings"><Button variant="success">Find</Button></Link>
                <Link className="mx-3" to="/share"><Button variant="secondary">Share</Button></Link>
            </div>
            <Row  className="my-3">
                <Col sm={10} md={8} lg={6}>
                    <Outlet/>
                </Col>
            </Row>
        </>
    )
}
