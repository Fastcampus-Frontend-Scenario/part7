import { Contents } from "@/components/common/Contents"
import { RepositoryInfos } from "@/types/types"
import { fetchGitHubRepos, getGitHubPageCount } from "@/utils/fetcher"
import { useCallback, useEffect, useState } from "react"
import ReactPaginate from "react-paginate"

const Component: React.FC = () => {
    const [pageCount, setPageCount] = useState(0)
    const [pageOffset, setPageOffset] = useState(0)
    const [data, setData] = useState<RepositoryInfos>([])
    const handleData = useCallback(async () => {
        const response = await fetchGitHubRepos('vercel', 5, pageOffset)
        const responseJson = await response.json()
        setData(responseJson)
        const newPageCount = getGitHubPageCount(response)
        setPageCount(newPageCount)
    }, [pageOffset])

    useEffect(() => {
        handleData()
    }, [pageOffset, handleData])

    return (
        <div>
            <Contents data={data} />
            <ReactPaginate 
                pageCount={pageCount}
                initialPage={0}
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                containerClassName="pagination"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                onPageChange={({selected}) => setPageOffset(selected)}
            />
        </div>
    )
}

export default Component