import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import {useRouter} from 'next/router'
import Table from "components/common/table";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getProducts} from "services/product";
import {productColumns} from "components/products/utils";
import Pagination from "components/common/Pagination";
import {useState} from "react";

export default function Index() {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const {data: products, isFetching} = useQuery(['products', page], () => getProducts(page), {keepPreviousData: true})
    return (
        <Card title="Products" actions={
            <>
                <CardAction onClick={() => router.push('/admin/products/add')}>Add New</CardAction>
            </>
        }>
            <Table isFetching={isFetching} data={products.data} columns={productColumns}/>
            {
                products.meta.last_page > 1 && <Pagination onPageChange={(page) => setPage(page)} meta={products.meta}/>
            }
        </Card>
    )
}

Index.layout = Admin

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['products', 1], getProducts)
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
