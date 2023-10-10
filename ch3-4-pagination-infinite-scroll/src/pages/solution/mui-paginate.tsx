import { MUIPagination } from "@/components/MUI/MUIPagination";

export default function MuiPaginate() {
    return (
        <div id='container'>
            <MUIPagination perPage={5} orgName="vercel" />
        </div>
    )
}