import FormPembuatan from "../components/FormPembuatan"
import {FiArrowLeft} from "react-icons/fi"
import { Link } from "react-router-dom"
import FormPembelian from "../components/FormPembelian"
const FormStockBaru = () =>{
return(
    <div className="">
        <div className="fixed left-0 p-3 text-3xl">
            <Link to={'/'}>
            <FiArrowLeft/>
            </Link>
        </div>
    <div className="flex justify-center items-center h-screen">
        <FormPembuatan/>
        <FormPembelian />
    </div>
    </div>
)
}
export default FormStockBaru