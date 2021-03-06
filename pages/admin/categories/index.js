import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import Table from "components/common/table";
import Pagination from "components/common/Pagination";
import React, {lazy, Suspense, useState} from "react";
import Modal from "components/common/Modal";
import {getCategories, deleteCategory} from "services/categories";
import {dehydrate, QueryClient, useMutation, useQuery, useQueryClient} from 'react-query';
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";
import Swal from "sweetalert2";
const CategoryForm = lazy(() => import("components/categories/CategoryForm"));

export default function Index() {
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
    const [currentEditableIndex, setCurrentEditableIndex] = useState(null)
    const [formType, setFormType] = useState('add')
    const [page, setPage] = useState(1)

    const {
        data: categories,
        isFetching
    } = useQuery(['categories',page], ()=>getCategories(page), {
        keepPreviousData: true,
        onSuccess: (data) => {
            queryClient.setQueryData('allCategories' , data)
        },
        placeholderData: {
            data: [],
            meta: []
        }

    });

    const queryClient = useQueryClient();
    const columns = [
        {
            header: 'Name',
            accessor: 'name'
        },
        {
            header: 'Parent Category',
            accessor: 'parent_category'
        },
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
            await queryClient.invalidateQueries('showCategories')
        },
    })
    const deleteCategoryHandler = async (index) => {
        const category = categories.data[index];
        Swal.fire({
            title: 'Confirm Delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutateAsync(category.id)
                Swal.fire('Deleted!', '', 'success')
            }
        })
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
            <Card title="Categories" actions={
                <>
                    <>
                        <CardAction onClick={addCategory}>Add New</CardAction>
                    </>
                </>
            }>
                <Table isFetching={isFetching} columns={columns} data={categories.data}
                       actions={tableActions}
                />
                {
                    categories.meta.last_page > 1 && !isFetching &&
                    <Pagination onPageChange={(page) => setPage(page)} meta={categories.meta}/>
                }
            </Card>

            <Modal size="md" title={categories.data[currentEditableIndex]?.name ?? 'Add Category'}
                   isOpen={isAttributeModalOpen}
                   close={() => setIsAttributeModalOpen(false)}>
                <Suspense fallback={<div>loading...</div>}>
                    <CategoryForm category={categories.data[currentEditableIndex]} formType={formType}
                                  onSubmit={() => setIsAttributeModalOpen(false)}/>
                </Suspense>
            </Modal>
        </>

    )
}

Index.layout = Admin
