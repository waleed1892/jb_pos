import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import PageLayout from "components/PageLayout";

export default function Admin({children}) {
    return (
        <>
            <Sidebar/>
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar/>
                {/* Header */}
                {/*<HeaderStats />*/}
                <PageLayout>
                    {children}
                    <FooterAdmin/>
                </PageLayout>
            </div>
        </>
    );
}
