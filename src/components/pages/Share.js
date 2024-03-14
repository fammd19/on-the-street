import AddForm from "../AddForm"
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom"

function Share () {

    return (
        <main className="mx-5 my-5">
            <Link className="ml-3" to="/listings"><Button variant="secondary">Find</Button></Link>
            <Link className="mx-3" to="/share"><Button variant="success">Share</Button></Link>
            <h1 className="my-2">Add a find</h1>
            <AddForm />
        </main>
    )
}

export default Share