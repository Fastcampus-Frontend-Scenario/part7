import { ReactPaginateImpl } from "@/components/react-paginate/ReactPaginateImpl";

export default function ReactPaginates() {
    return (
        <div id='container'>
            <ReactPaginateImpl perPage={5} orgName="vercel" />
        </div>
    )
}