import { RepositoryInfos } from "@/types/types"
import { fetchGitHubRepos, getGitHubPageCount } from "@/utils/fetcher"
import { useEffect, useState } from "react"
import { Contents } from "../common/Contents"
import { Pagination } from "@mui/material"

interface Props {
    perPage: number
    orgName: string
}

export const MUIPagination: React.FC<Props> = ({ perPage, orgName }) => {
    const [pageOffset, setPageOffset] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [apiError, setApiError] = useState<string | null>(null)
    const [data, setData] = useState<RepositoryInfos>([])

    const handleError = (msg: string) => {
        setApiError(msg)
        setData([])
        setPageCount(0)
    }
    useEffect(() => {
        const handleData = async () => {
            const response = await fetchGitHubRepos(orgName, perPage, pageOffset)
            const responseJson = await response.json()
            if (!response.ok) {
                handleError(responseJson.message)
                return
            }
            const newPageCount = getGitHubPageCount(response)
            setData(responseJson)
            // last page returns NaN, so ignore this case
            if (!isNaN(newPageCount)) {
                setPageCount(newPageCount)
            }
        }
        handleData()
    }, [pageOffset, perPage, orgName])

    return (
        <div style={{ marginTop: "1rem" }}>
            <h3 className="repo-title">{orgName} GitHub repositories</h3>
            <Contents data={data} />
            <Pagination
                count={pageCount}
                page={pageOffset}
                defaultPage={1}
                onChange={(_, page) => setPageOffset(page)}
            />
            {apiError && (
                <div role="alert">
                    {apiError}
                </div>
            )}
        </div>
    )
}

