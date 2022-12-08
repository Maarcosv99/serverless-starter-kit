export interface UserCreate {
    email: string
    password: string
}

export interface UserUpdate {
    password?: string
    company_name?: string
}
