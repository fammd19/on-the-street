import { useEffect } from "react";
import AddForm from "../AddForm"
import { Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom"

function Share ( { formData,setFormData, } ) {

    useEffect (()=> {
        setFormData({
            date: "",
            time: "",
            address: "",
            suburb:"",
            postcode:"",
            kitchenware: "",
            furniture: "",
            electricals: "",
            otherItems: "",
            dateUpdated: "",
            timeUpdated: "",
        })
    },[])

    return (
        <Container className="mx-4 my-5">
            <Link className="ml-3" to="/listings"><Button variant="success">Current listings</Button></Link>
            <Link className="mx-3" to="/share"><Button disabled variant="success">Add a listing</Button></Link>
            <h1 className="mt-5">Add a find</h1>
            <AddForm 
                formData={formData} setFormData={setFormData}
            />
        </Container>
    )
}

export default Share