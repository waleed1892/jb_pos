import Admin from "layouts/Admin";
import Card from "components/common/Card/Card";
import InvoiceForm from "components/invoices/InvoiceForm";
import {dehydrate, QueryClient} from "react-query";


export default function Add() {
    return (
        <Card title="Add New Invoice">
            <div className="px-12 py-6 bg-blueGray-100">
                <InvoiceForm/>
            </div>
        </Card>
    )
}

Add.layout = Admin

// export async function getStaticProps() {
//     const queryClient = new QueryClient();
//     await queryClient.prefetchQuery('allAttributes', getAllAttributes);
//     return {
//         props: {
//             dehydratedState: dehydrate(queryClient)
//         }
//     }
// }
