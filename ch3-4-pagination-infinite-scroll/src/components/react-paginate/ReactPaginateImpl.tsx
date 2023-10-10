import { RepositoryInfos } from "@/types/types"
import { fetchGitHubRepos, getGitHubPageCount } from "@/utils/fetcher"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Contents } from "../common/Contents"

interface Props {
    perPage: number
    orgName: string
}

export const ReactPaginateImpl: React.FC<Props> = ({ perPage, orgName}) => {
    const [pageOffset, setPageOffset] = useState(0)
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

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPageOffset(selectedItem.selected)
    }
    
    /**
     * previousLabel - 이전페이지로 버튼 display 값
     * nextLabel - 다음페이지 버튼 display 값
     * breakLabel - 페이지 수가 많을 경우 건너뛸 수 있는 버튼
     * pageCount - 전체 페이지 숫자
     * pageRangeDisplayed - 한 페이지에 표시될 아이템 수
     * onPageChange - 페이지 버튼을 눌렀을 때 일어나는 이벤트 이를 이용해 페이지 증감
     * containerClassName - css적용할 때 사용
     * activeClassName - 현재 페이지의 css 이름
     * previousClassName/NextClassName - 이전/다음버튼 css적용위한 클래스명을 적으면 됨
     */
    return (
        <div style={{ marginTop: "1rem" }}>
            <h3 className="repo-title">{orgName} GitHub repositories</h3>
            <Contents data={data} />
            <ReactPaginate
                previousLabel="Prev"
                nextLabel="Next"
                breakLabel="..."
                pageCount={pageCount}
                pageRangeDisplayed={perPage}
                initialPage={0}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
            {apiError && (
                <div role="alert">
                    {apiError}
                </div>
            )}
        </div>
    )
}

