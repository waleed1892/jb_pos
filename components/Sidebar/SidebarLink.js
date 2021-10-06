import Link from "next/link";
import {useRouter} from "next/router";

export default function SidebarLink({href, children, iconClass, showIcon = false}) {
    const router = useRouter();
    return <Link href={href}>
        <a
            href={href}
            className={
                "text-xs uppercase py-3 font-bold block " +
                (router.pathname.indexOf(href) !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
            }
        >
            {
                showIcon &&
                    <>
                        <i
                            className={
                                iconClass +
                                " mr-2 text-sm " +
                                (router.pathname.indexOf(href) !== -1
                                    ? "opacity-75"
                                    : "text-blueGray-300")
                            }
                        />{" "}
                    </>
            }

            {children}
        </a>
    </Link>
}
