import { useParams } from "react-router";
import Text from "../components/text";

export default function PagePhotoDetails() {
    const { id } = useParams();
    return (
        <>
            <hr />
            <Text variant="heading-medium">Page Photo Details</Text>
            <hr />
            <Text variant="heading-medium">ID: {id}</Text>
        </>
    )

}