import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import Table from "components/common/table";
import Pagination from "components/common/Pagination";
import React, {useState} from "react";
import { getInvoices, deleteInvoice} from "services/invoices";
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";
import {useRouter} from 'next/router'
import Swal from "sweetalert2";
// const InvoiceForm = lazy(() => import("components/invoices/InvoiceForm"));

export default function Index() {
    const [page, setPage] = useState(1)
    const router = useRouter();

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

    const deleteMutation = useMutation(deleteInvoice, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('invoices')
        },
    })
    const deleteInvoiceHandler = async (index) => {
        const invoice = invoices.data[index];
        Swal.fire({
            title: 'Confirm Delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutateAsync(invoice.id)
                Swal.fire('Deleted!', '', 'success')
            }
        })
    }

    const tableActions = (categoryIndex) =>
        <div className={`flex items-center gap-x-2`}>
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
                        <CardAction onClick={() => router.push('/admin/invoices/add')} >Add New</CardAction>
                    </>

                </>
            }>
                <Table isFetching={isFetching } columns={columns} data={invoices.data}
                       actions={tableActions}
                />
                {
                    invoices.meta.last_page > 1 && !isFetching &&
                    <Pagination onPageChange={(page) => setPage(page)} meta={invoices.meta}/>
                }
            </Card>
        </>

    )
}

Index.layout = Admin
