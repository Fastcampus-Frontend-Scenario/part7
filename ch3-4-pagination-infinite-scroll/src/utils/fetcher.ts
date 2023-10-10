export const getGitHubPageCount = (response: Response) => {
    const REGEX_GITHUB_HEADER_LINK = /\&page=(\d*)>; rel="last"/g;
    // Extract pageCount from Link header.
    const link = response.headers?.get("Link") ?? ''
    const number = Number(REGEX_GITHUB_HEADER_LINK.exec(link)?.[1])
    console.log(link, number)
    return number
}

export const fetchGitHubRepos =
    async (orgName: string, perPage: number, pageOffset: number)
    : Promise<Response> => {
    return await fetch(
        `https://api.github.com/orgs/${orgName}/repos?${new URLSearchParams({
            per_page: perPage.toString(),
            page: pageOffset.toString()
        })}`,
        {
            headers: {
                Authorization: 'token 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'
            }
        }
    )
}