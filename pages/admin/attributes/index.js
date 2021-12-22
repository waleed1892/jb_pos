import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import Table from "components/common/table";
import Pagination from "components/common/Pagination";
import React, {lazy, Suspense, useState} from "react";
import Modal from "components/common/Modal";
import {getAttributes, deleteAttribute} from "services/attributes";
import {dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";
import Swal from "sweetalert2";

const AttributeForm = lazy(() => import("components/attributes/AttributeForm"));

export default function Index() {
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
    const [currentEditableIndex, setCurrentEditableIndex] = useState(null)
    const [formType, setFormType] = useState('add')
    const [page, setPage] = useState(1)
    const {
        data: attributes,
        isFetching
    } = useQuery(['attributes', page], () => getAttributes(page), {keepPreviousData: true});
    const queryClient = useQueryClient();
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
    const editAttribute = (index) => {
        setFormType('edit')
        setCurrentEditableIndex(index)
        setIsAttributeModalOpen(true)
    }

    const addAttribute = () => {
        setFormType('add')
        setCurrentEditableIndex(null)
        setIsAttributeModalOpen(true)
    }

    const deleteMutation = useMutation(deleteAttribute, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('attributes')
        },
    })
    const deleteAttributeHandler = async (index) => {
        const attribute = attributes.data[index];
        Swal.fire({
            title: 'Confirm Delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutateAsync(attribute.id)
                Swal.fire('Deleted!', '', 'success')
            }
        })
    }

    const tableActions = (attributeIndex) =>
        <div className={`flex items-center gap-x-2`}>
            <PencilIcon onClick={() => editAttribute(attributeIndex)}
                        className={`w-5 h-5 text-lightBlue-500 cursor-pointer`}/>
            <TrashIcon onClick={() => deleteAttributeHandler(attributeIndex)}
                       className={`w-5 h-5 text-red-400 cursor-pointer`}/>
        </div>

    return (
        <>
            <Card title="Attributes" actions={
                <>
                    <CardAction onClick={addAttribute}>Add New</CardAction>
                </>
            }>
                <Table isFetching={isFetching || deleteMutation.isLoading} columns={columns} data={attributes.data}
                       actions={tableActions}
                />
                {
                    attributes.meta.last_page > 1 &&
                    <Pagination onPageChange={(page) => setPage(page)} meta={attributes.meta}/>
                }
            </Card>
            <Modal size="lg" title={attributes.data[currentEditableIndex]?.name_en ?? 'Add Attribute'}
                   isOpen={isAttributeModalOpen}
                   close={() => setIsAttributeModalOpen(false)}>
                <Suspense fallback={<div>loading...</div>}>
                    <AttributeForm attribute={attributes.data[currentEditableIndex]} formType={formType}
                                   onSubmit={() => setIsAttributeModalOpen(false)}/>
                </Suspense>
            </Modal>
        </>

    )
}

Index.layout = Admin

export async function getStaticProps() {
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['attributes', 1], getAttributes)
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}
