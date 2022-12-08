export interface GetUserRequest {
    email: string
}

export interface GetUserResponse {
    email: string
    company_name?: string
    videosCount: number
    domainsCount: number
}
