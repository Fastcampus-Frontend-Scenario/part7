import { RepositoryInfos } from "@/types/types";
import { fetchGitHubRepos } from "@/utils/fetcher";
import { useCallback, useEffect, useState } from "react";
import { Contents } from "../common/Contents";

const throttleByRAF = (cb: () => void) => {
    if (!cb) {
        throw Error('Invalid required arguments');
    }

    return () => {
        return requestAnimationFrame(() => {
            return cb();
        });
    };
}


export const InfiniteScroll = () => {
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

    const handleScroll = useCallback(() => {
        const { scrollTop, offsetHeight } = document.documentElement
        if ((window.innerHeight + Math.ceil(scrollTop)) >= offsetHeight && !isLoading) {
            fetchData();
        }
    }, [fetchData, isLoading])

    useEffect(() => {

        const enhanceScroll = throttleByRAF(() => handleScroll())
        window.addEventListener('scroll', enhanceScroll);
        return () => window.removeEventListener('scroll', enhanceScroll);
    }, [isLoading, handleScroll]);

    useEffect(()=> {
        // initial load
        if(!data.length) {
            fetchData()
        }
    }, [fetchData, data])
    return (
        <div>
            <Contents data={data} />
        </div>
    )
}