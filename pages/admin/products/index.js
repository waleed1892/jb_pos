import Admin from "layouts/Admin";
import PageLayout from "components/PageLayout";
import Card from "components/common/Card/Card";
import CardAction from "components/common/Card/CardAction";
import {useRouter} from 'next/router'
import AttributeForm from "../../../components/attributes/AttributeForm";

export default function Index() {
    const router = useRouter()
    return (
        <PageLayout>
            <Card actions={
                <>
                    <CardAction onClick={() => router.push('/admin/products/add')}>Add New</CardAction>
                </>
            }>
            </Card>
        </PageLayout>
    )
}

Index.layout = Admin
