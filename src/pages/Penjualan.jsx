import { FiArrowLeft } from "react-icons/fi"
import FormPenjualan from "../components/FormPenjualan"
import { Link } from "react-router-dom"

const Penjualan = ()=>{
return(
    <>
     <div className="fixed left-0 p-3 text-3xl">
            <Link to={'/'}>
            <FiArrowLeft/>
            </Link>
        </div>
        <div className="flex justify-center items-center h-screen">

    <FormPenjualan/>
        </div>
    </>
)
}
export default Penjualan