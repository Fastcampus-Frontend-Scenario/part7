import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

interface Props {
    loading: boolean
}

export const Post: React.FC<Props> = ({ loading }) => {
    return (
        <SkeletonTheme baseColor="#c8c8c8" highlightColor="#dedede">
            <div>
                {loading ?
                    (<Skeleton circle height="150px" width='150px' />)
                    : (
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: 150, height: 150 }}>
                            <circle cx="50" cy="50" r="50" />
                        </svg>
                    )
                }
                <h1>
                    {loading ?
                        (<Skeleton count={1} />)
                        : (<>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>)}
                </h1>
                <h2>
                    {loading ?
                        (<Skeleton count={1} />)
                        : (<>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</>)}
                </h2>
                <p >
                    {loading ?
                        (<Skeleton count={3} />)
                        : (
                            <>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Vestibulum nec justo feugiat, auctor nunc ac, volutpat arcu.
                                Suspendisse faucibus aliquam ante, sit amet iaculis dolor
                                posuere et. In ut placerat leo.
                            </>
                        )
                    }
                </p>
            </div>
        </SkeletonTheme>
    )
}