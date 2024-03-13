import {Outlet} from "react-router-dom"
import Button from 'react-bootstrap/Button'; //

export default function Listings () {
    return (
        <>
            <a href="./find"><Button variant="success">Find</Button></a>
            <a href="./share"><Button variant="secondary">Share</Button></a>
            <Outlet/>
        </>
    )
}

