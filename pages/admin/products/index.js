import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import {useRouter} from 'next/router'
import Table from "components/common/table";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getProducts} from "services/product";
import {productColumns} from "components/products/utils";

export default function Index() {
    const router = useRouter()
    const {data: products} = useQuery('products', getProducts)
    return (
        <Card title="Products" actions={
            <>
                <CardAction onClick={() => router.push('/admin/products/add')}>Add New</CardAction>
            </>
        }>
            <Table data={products.data} columns={productColumns}/>
        </Card>
    )
}

Index.layout = Admin

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('products', getProducts)
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
