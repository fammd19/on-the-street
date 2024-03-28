import { Outlet } from "react-router-dom"
import { Col, Container, Row } from 'react-bootstrap';
// import FindMap from "../FindMap";

export default function Listings () {
    return (
        <>
            <Container className="my-3 mx-0">
                    <Outlet/>
            </Container>
        </>
    )
}
