import PageLayout from "components/PageLayout";
import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import ProductForm from "components/products/ProductForm";

export default function Add(){
    return (
        <PageLayout>
            <>
                <Card title="Add New Product">
                    <div className="px-12 py-6 bg-blueGray-100">
                       <ProductForm/>
                    </div>
                </Card>
            </>
        </PageLayout>
    )
}

Add.layout = Admin
