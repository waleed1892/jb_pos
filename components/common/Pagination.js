import ProductForm from "components/products/ProductForm";
import Card from "components/common/Card/Card";

export default function Pagination(){
    return (
        <div className="block py-4">
            <ul className="flex pl-0 rounded list-none flex-wrap justify-center">
                <li>
                    <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                        <i className="fas fa-chevron-left -ml-px"></i>
                        <i className="fas fa-chevron-left -ml-px"></i>
                    </a>
                </li>
                <li>
                    <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                        <i className="fas fa-chevron-left -ml-px"></i>
                    </a>
                </li>
                <li>
                    <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 text-white bg-indigo-500">
                        1
                    </a>
                </li>
                <li>
                    <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                        <i className="fas fa-chevron-right -mr-px"></i>
                    </a>
                </li>
                <li>
                    <a href="#pablo" className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-indigo-500 bg-white text-indigo-500">
                        <i className="fas fa-chevron-right -mr-px"></i>
                        <i className="fas fa-chevron-right -mr-px"></i>
                    </a>
                </li>
            </ul>
        </div>
    )
}
