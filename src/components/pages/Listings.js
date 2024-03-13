import {Outlet} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom"
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export default function Listings () {
    return (
        <>
            <Link to="../listings"><Button variant="success">Find</Button></Link>
            <Link to="/share"><Button variant="secondary">Share</Button></Link>
            <Row  className="my-3">
                <Col sm={6} md={5} lg={4}>
                    <Outlet/>
                </Col>
            </Row>
        </>
    )
}

