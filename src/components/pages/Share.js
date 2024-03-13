import AddForm from "../AddForm"
import Button from 'react-bootstrap/Button';

function Share () {

    return (
        <main>
            <a href="./listings"><Button variant="secondary">Find</Button></a>
            <a href="./share"><Button variant="success">Share</Button></a>
            <h1>Add a find</h1>
            <AddForm />
        </main>
    )
}

export default Share