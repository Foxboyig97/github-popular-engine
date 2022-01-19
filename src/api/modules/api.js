import httpRequest from "../request";

export const getPopular = (params) => {
    return httpRequest.get(`/search/repositories?${params}`)
}
export const queryRepositoryAuthorDetails = (author) => {
    return httpRequest.get(`/users/${author}`, {
        accept: "application/vnd.github.v3+json",
    });
}