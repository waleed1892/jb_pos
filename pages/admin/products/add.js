import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import ProductForm from "components/products/ProductForm";
import {dehydrate, QueryClient} from "react-query";
import {getAllAttributes} from "services/attributes";

export default function Add() {
    return (
        <Card title="Add New Product">
            <div className="px-12 py-6 bg-blueGray-100">
                <ProductForm/>
            </div>
        </Card>
    )
}

Add.layout = Admin

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('allAttributes', getAllAttributes);
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
