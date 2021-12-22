import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {getInvoice} from "services/invoices";
import {useRouter} from "next/router";
import InvoiceForm from "components/invoices/InvoiceForm";
import React, {Suspense} from "react";

export default function Add() {
    const router = useRouter();
    const {id} = router.query
    const {data: invoice} = useQuery('invoice', () => getInvoice(id));
    console.log(invoice,'lvb')
    return (
        <Card title="Edit Invoice">
            <div className="px-12 py-6 bg-blueGray-100">
                <InvoiceForm invoice={invoice.data} formType="edit"/>
            </div>
        </Card>
    )
}

Add.layout = Admin

export async function getServerSideProps({params}) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('invoice', () => getInvoice(params.id));
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
