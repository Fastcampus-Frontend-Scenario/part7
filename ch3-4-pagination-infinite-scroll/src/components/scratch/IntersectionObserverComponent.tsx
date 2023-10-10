import { RepositoryInfos } from "@/types/types";
import { fetchGitHubRepos } from "@/utils/fetcher";
import { useCallback, useEffect, useRef, useState } from "react";
import { Contents } from "../common/Contents";



export const IntersectionObserverComponent = () => {
    const ref = useRef<HTMLDivElement>(null)

    const [isLoading, setLoading] = useState(false)
    const [pageOffset, setPageOffset] = useState(0)
    const [data, setData] = useState<RepositoryInfos>([])

    const fetchData = useCallback(async () => {
        setLoading(true)
        fetchGitHubRepos('vercel', 40, pageOffset)
            .then(res => res.json())
            .then(newData => {
                setData([...data, ...newData])
                setPageOffset(pageOffset + 1)
                setLoading(false)
            })
    }, [data, pageOffset])

    const callback = useCallback(
        (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isLoading) fetchData()
            })
        },
        [fetchData, isLoading]
    )

    useEffect(() => {
        if (!ref.current) return
        const observer = new IntersectionObserver(callback)
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ref, callback])

    return (
        <div >
            <Contents data={data} />
            <div id='observer' ref={ref} style={{ height: 30, width: '100%', background: '#cc0000'}}/>
        </div>
    )
}