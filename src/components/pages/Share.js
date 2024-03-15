import AddForm from "../AddForm"
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

function Share ( { formData,setFormData,
    areOtherItems,setAreOtherItems,
    isKitchenware,setIsKitchenware,
    isFurniture,setIsFurniture,
    isElectricals,setIsElectricals } ) {

    return (
        <main className="mx-5 my-5">
            <Link className="ml-3" to="/listings"><Button variant="secondary">Find</Button></Link>
            <Link className="mx-3" to="/share"><Button variant="success">Share</Button></Link>
            <h1 className="mt-5">Add a find</h1>
            <AddForm 
                formData={formData} setFormData={setFormData}
                areOtherItems={areOtherItems} setAreOtherItems={setAreOtherItems}
                isKitchenware={isKitchenware} setIsKitchenware={setIsKitchenware}
                isFurniture={isFurniture} setIsFurniture={setIsFurniture}
                isElectricals={isElectricals} setIsElectricals={setIsElectricals}
            />
        </main>
    )
}

export default Share