import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap";

export default function Listings () {
    return (
        <>
            <Container className="my-3 mx-0">
                <Outlet/>
            </Container>
        </>
    )
}
