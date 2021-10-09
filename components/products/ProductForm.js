import Label from "components/common/Label";
import Input from "components/common/Input";
import React, {useState} from "react";
import CardAction from "components/common/Card/CardAction";
import Modal from "components/common/Modal";
import {productData} from "../../constants/product";
import AttributeForm from "../attributes/AttributeForm";
import Alert from "../common/alert";
import Table from "../common/table";
import VariationsForm from "../variations/VariationsForm";

export default function ProductForm({type = 'add'}) {
    const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
    const [variationFormOpen, setVariationFormOpen] = useState(false);
    const [showARName, setShowARName] = useState(false);
    const [product, setProduct] = useState(productData);
    const handleChange = (e, field) => {
        const {value} = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [field]: value
        }))
    }
    const attributeColumns = [
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Value(s)',
            accessor: 'value',
            cell: (row) => row.value.join(', ')
        }
    ]
    const data = [
        {
            name: 'model',
            value: ['nokia', 'samsung'],
        },
        {
            name: 'company',
            value: ['apple', 'intel']
        }
    ]
    return (
        <>
            <form action="">
                <div>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">General</h6>
                    <div className="grid grid-cols-2 gap-x-4">
                        {
                            showARName ?
                                <div>
                                    <Label>Name (AR)</Label>
                                    <a onClick={() => setShowARName(false)}
                                       className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>EN</a>
                                    <Input value={product.name_ar} onChange={(e) => handleChange(e, 'name_ar')}/>
                                </div>
                                : <div>
                                    <Label>Name (EN)</Label>
                                    <a onClick={() => setShowARName(true)}
                                       className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>AR</a>
                                    <Input value={product.name_en} onChange={(e) => handleChange(e, 'name_en')}/>
                                </div>
                        }
                    </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300"/>
                <div>
                    <div className="flex items-center justify-between">
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Attributes</h6>
                        <CardAction onClick={() => setIsAttributeModalOpen(true)}>Add Attribute</CardAction>
                    </div>
                    <Table columns={attributeColumns} data={data}/>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300"/>
                <div>
                    <div className="flex items-center justify-between">
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Variations</h6>
                        <CardAction onClick={() => setVariationFormOpen(true)}>Add Variation</CardAction>
                    </div>
                    <Alert variant="info">Before you can add a variation you need to add some variation
                        attributes.</Alert>
                </div>
            </form>
            <Modal size="lg" title="Add Attribute" isOpen={isAttributeModalOpen}
                   close={() => setIsAttributeModalOpen(false)}>
                <AttributeForm/>
            </Modal>
            <Modal title="Add Variation" size="lg" isOpen={variationFormOpen} close={() => setVariationFormOpen(false)}>
                <VariationsForm/>
            </Modal>
        </>
    )
}
