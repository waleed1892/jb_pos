import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import {useRouter} from 'next/router'
import Table from "components/common/table";
import {dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from "react-query";
import {deleteProduct, getProducts} from "services/product";
import {productColumns} from "components/products/utils";
import Pagination from "components/common/Pagination";
import React, {useState} from "react";
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";

export default function Index() {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const {data: products, isFetching} = useQuery(['products', page], () => getProducts(page), {keepPreviousData: true})
    const queryClient = useQueryClient()
    const deleteMutation = useMutation(deleteProduct,{
        onSuccess: () => {
            queryClient.invalidateQueries('products')
            queryClient.setQueriesData('categories')
        }
    })
    const deleteProductHandler = async (index) => {
        await deleteMutation.mutateAsync(products.data[index].id)
    }
    const tableActions = (productIndex) =>
        <div className={`flex items-center gap-x-2`}>
            <PencilIcon onClick={() => router.push(`/admin/products/edit/${products.data[productIndex].id}`)}
                        className={`w-5 h-5 text-lightBlue-500 cursor-pointer`}/>
            <TrashIcon onClick={() => deleteProductHandler(productIndex)}
                       className={`w-5 h-5 text-red-400 cursor-pointer`}/>
        </div>

    return (
        <Card title="Products" actions={
            <>
                <CardAction onClick={() => router.push('/admin/products/add')}>Add New</CardAction>
            </>
        }>
            <Table isFetching={isFetching} data={products.data} columns={productColumns} actions={tableActions}/>
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
