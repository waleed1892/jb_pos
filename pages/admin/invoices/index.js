import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import Table from "components/common/table";
import Pagination from "components/common/Pagination";
import React, {lazy, Suspense, useState} from "react";
import Modal from "components/common/Modal";
import { getInvoices, deleteInvoice} from "services/invoices";
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";
import {useRouter} from 'next/router'
import {router} from "next/client";
const InvoiceForm = lazy(() => import("components/invoices/InvoiceForm"));

export default function Index() {
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
    const [currentEditableIndex, setCurrentEditableIndex] = useState(null)
    const [formType, setFormType] = useState('add')
    const [page, setPage] = useState(1)

    const {
        data: invoices,
        isFetching
    } = useQuery(['invoices',page], ()=>getInvoices(page), {
        keepPreviousData: true,
        onSuccess:(data)=>{
            console.log(data,'invoices')
        },
        placeholderData:{
            data:[],
            meta:[]
        }

    });
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
            header: 'Quantity',
            accessor: 'quantity'
        },

        {
            header: 'Product',
            accessor: 'product_name'
        },
        {
            header: 'Barcode',
            accessor: 'product_barcode'
        },
        {
            header: 'Total',
            accessor: 'total'
        }
    ]

    const editInvoice = (index) => {
        setFormType('edit')
        setCurrentEditableIndex(index)
        setIsAttributeModalOpen(true)
    }

    const addInvoice = () => {
        setFormType('add')
        setCurrentEditableIndex(null)
        setIsAttributeModalOpen(true)
    }

    const deleteMutation = useMutation(deleteInvoice, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('invoices')
        },
    })
    const deleteInvoiceHandler = async (index) => {
        const invoice = invoices.data[index];
        await deleteMutation.mutateAsync(invoice.id)
    }

    const tableActions = (categoryIndex) =>
        <div className={`flex items-center gap-x-2`}>
            {/*<PencilIcon onClick={() => editInvoice(categoryIndex)}*/}
            <PencilIcon onClick={() => router.push(`/admin/invoices/edit/${invoices.data[categoryIndex].id}`)}
                        className={`w-5 h-5 text-lightBlue-500 cursor-pointer`}/>
            <TrashIcon onClick={() => deleteInvoiceHandler(categoryIndex)}
                       className={`w-5 h-5 text-red-400 cursor-pointer`}/>
        </div>

    return (
        <>
            <Card title="Invoices" actions={
                <>
                    <>
                        {/*<CardAction onClick={addInvoice} >Add New</CardAction>*/}
                        <CardAction onClick={() => router.push('/admin/invoices/add')} >Add New</CardAction>
                    </>

                </>
            }>
                <Table isFetching={isFetching } columns={columns} data={invoices.data}
                       actions={tableActions}
                />
                {
                    invoices.meta.last_page > 1 &&
                    <Pagination onPageChange={(page) => setPage(page)} meta={invoices.meta}/>
                }
            </Card>

            <Modal size="lg" title={invoices.data[currentEditableIndex]?.name ?? 'Add Invoice'}
                   isOpen={isAttributeModalOpen}
                   close={() => setIsAttributeModalOpen(false)}>
                <Suspense fallback={<div>loading...</div>}>
                    <InvoiceForm invoice={invoices.data[currentEditableIndex]} formType={formType}
                                 onSubmitHandle={() => setIsAttributeModalOpen(false)}/>
                </Suspense>
            </Modal>
        </>

    )
}

Index.layout = Admin

