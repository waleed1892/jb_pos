import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import {QueryClient, QueryClientProvider, Hydrate} from "react-query";
import PageChange from "components/PageChange/PageChange.js";
import {ReactQueryDevtools} from 'react-query/devtools'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";

Router.events.on("routeChangeStart", (url) => {
    document.body.classList.add("body-page-transition");
    ReactDOM.render(
        <PageChange path={url}/>,
        document.getElementById("page-transition")
    );
});
Router.events.on("routeChangeComplete", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
    document.body.classList.remove("body-page-transition");
});

export default function MyApp({Component, pageProps}) {
    // static async getInitialProps({Component, router, ctx}) {
    //     let pageProps = {};
    //
    //     if (Component.getInitialProps) {
    //         pageProps = await Component.getInitialProps(ctx);
    //     }
    //
    //     return {pageProps};
    // }
    const Layout = Component.layout || (({children}) => <>{children}</>);
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 100 * 1000
            }
        }
    }))
    return (
        <React.Fragment>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>POS</title>
                {/*<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>*/}
            </Head>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </Hydrate>
            </QueryClientProvider>
        </React.Fragment>
    );
}
