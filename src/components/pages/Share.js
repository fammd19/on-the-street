import { useEffect } from "react";
import { Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom"
import AddForm from "../AddForm"

function Share ( { formData,setFormData, } ) {

    useEffect (()=> {
        setFormData({
            date: "",
            time: "",
            address: "",
            suburb:"",
            postcode:"",
            dateUpdated: "",
            timeUpdated: ""
        })
    },[])

    return (
        <Container className="mx-4 my-5">
            <Link className="ml-3" to="/listings"><Button variant="success">View listings</Button></Link>
            <h1 className="mt-5">Add a find</h1>
            <AddForm 
                formData={formData} setFormData={setFormData}
            />
        </Container>
    )
}

export default Share