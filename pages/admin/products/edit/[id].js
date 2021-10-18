import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import ProductForm from "components/products/ProductForm";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getAllAttributes} from "services/attributes";
import {getProduct} from "services/product";
import {useRouter} from "next/router";

export default function Add() {
    const router = useRouter();
    const {id} = router.query
    const {data: product} = useQuery('product', () => getProduct(id));
    return (
        <Card title="Edit Product">
            <div className="px-12 py-6 bg-blueGray-100">
                <ProductForm formType="edit" product={product.data}/>
            </div>
        </Card>
    )
}

Add.layout = Admin

export async function getServerSideProps({params}) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('allAttributes', getAllAttributes);
    await queryClient.prefetchQuery('product', () => getProduct(params.id));
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
