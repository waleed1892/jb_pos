import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import Table from "components/common/table";
import Pagination from "components/common/Pagination";
import React, {lazy, Suspense, useState} from "react";
import Modal from "components/common/Modal";
import {getAttributes} from "services/attributes";
import {dehydrate, QueryClient, useQuery} from 'react-query';

const AttributeForm = lazy(() => import("components/attributes/AttributeForm"));

export default function Index() {
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
    const {data: attributes} = useQuery('attributes', getAttributes);
    const columns = [
        {
            header: 'Name (EN)',
            accessor: 'name_en'
        },
        {
            header: 'Name (AR)',
            accessor: 'name_ar'
        },
    ]
    return (
        <>
            <Card title="Attributes" actions={
                <>
                    <CardAction onClick={() => setIsAttributeModalOpen(true)}>Add New</CardAction>
                </>
            }>
                <Table columns={columns} data={attributes.data}/>
                {
                    attributes.data.length &&
                    <Pagination/>
                }
            </Card>
            <Modal size="lg" title="Add Attribute" isOpen={isAttributeModalOpen}
                   close={() => setIsAttributeModalOpen(false)}>
                <Suspense fallback={<div>loading...</div>}>
                    <AttributeForm onSubmit={() => setIsAttributeModalOpen(false)}/>
                </Suspense>
            </Modal>
        </>

    )
}

Index.layout = Admin

export async function getStaticProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery('attributes', getAttributes)
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
