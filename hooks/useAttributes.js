import {useQuery} from "react-query";
import {getAttributes} from "services/attributes";

export default function useAttributes() {
    const {data: {data: attributes}} = useQuery('attributes', getAttributes, {
        placeholderData: {data: {data: []}},
        refetchOnWindowFocus: false,
    });
    return attributes;
}
