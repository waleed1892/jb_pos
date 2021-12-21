import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import Table from "components/common/table";
import Pagination from "components/common/Pagination";
import React, {lazy, Suspense, useState} from "react";
import Modal from "components/common/Modal";
import {getCategories , deleteCategory} from "services/categories";
import {dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";

const CategoryForm = lazy(() => import("components/categories/CategoryForm"));

export default function Index() {
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
    const [currentEditableIndex, setCurrentEditableIndex] = useState(null)
    const [formType, setFormType] = useState('add')
    const [page, setPage] = useState(1)

    const {
        data: categories,
        isFetching
    } = useQuery('categories', getCategories, {
        keepPreviousData: true,
        onSuccess:(data)=>{
            // console.log(data,'sdfsdfs')
        },
        placeholderData:{
            data:[],
            meta:[]
        }

    });

    // console.log(categories,'sdfsdfs')

    const queryClient = useQueryClient();
    const columns = [
        {
            header: 'Name',
            accessor: 'name'
        },
        {
            header: 'Customer',
            accessor: 'customer_name'
        },

        {
            header: 'Order',
            accessor: 'order'
        },

        {
            header: 'Quantity',
            accessor: 'quantity'
        },

        {
            header: 'Total',
            accessor: 'total'
        }
    ]

    const editCategory = (index) => {
        setFormType('edit')
        setCurrentEditableIndex(index)
        setIsAttributeModalOpen(true)
    }

    const addCategory = () => {
        setFormType('add')
        setCurrentEditableIndex(null)
        setIsAttributeModalOpen(true)
    }

    const deleteMutation = useMutation(deleteCategory, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('categories')
        },
    })
    const deleteCategoryHandler = async (index) => {
        const category = categories.data[index];
        await deleteMutation.mutateAsync(category.id)
    }

    const tableActions = (categoryIndex) =>
        <div className={`flex items-center gap-x-2`}>
            <PencilIcon onClick={() => editCategory(categoryIndex)}
                        className={`w-5 h-5 text-lightBlue-500 cursor-pointer`}/>
            <TrashIcon onClick={() => deleteCategoryHandler(categoryIndex)}
                       className={`w-5 h-5 text-red-400 cursor-pointer`}/>
        </div>

    return (
        <>
            <Card title="Invoices" actions={
                <>
                    <>
                        {/*<CardAction onClick={addInvoice} >Add New</CardAction>*/}
                    </>

                </>
            }>
                {/*<Table isFetching={isFetching } columns={columns} data={invoices.data}*/}
                {/*       actions={tableActions}*/}
                {/*/>*/}
                {/*{*/}
                {/*    invoices.meta.last_page > 1 &&*/}
                {/*    <Pagination onPageChange={(page) => setPage(page)} meta={invoices.meta}/>*/}
                {/*}*/}
            </Card>

            {/*<Modal size="lg" title={invoices.data[currentEditableIndex]?.name ?? 'Add Category'}*/}
            {/*       isOpen={isAttributeModalOpen}*/}
            {/*       close={() => setIsAttributeModalOpen(false)}>*/}
            {/*    <Suspense fallback={<div>loading...</div>}>*/}
            {/*        <CategoryForm category={invoices.data[currentEditableIndex]} formType={formType}*/}
            {/*                      onSubmit={() => setIsAttributeModalOpen(false)}/>*/}
            {/*    </Suspense>*/}
            {/*</Modal>*/}
        </>

    )
}

Index.layout = Admin

