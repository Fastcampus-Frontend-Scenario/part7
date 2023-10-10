import { Contents } from "@/components/common/Contents"
import { RepositoryInfos } from "@/types/types"
import { fetchGitHubRepos, getGitHubPageCount } from "@/utils/fetcher"
import { Pagination } from "@mui/material"
import { useState, useCallback, useEffect } from "react"

const MUIPagination: React.FC = () => {
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
            <Pagination 
                count={pageCount}
                page={pageOffset}
                onChange={(_, page) => setPageOffset(page)}
            />
        </div>
    )
}

export default MUIPagination