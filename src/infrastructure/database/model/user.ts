import { Model } from './base'

export interface UserCreate {
    email: string
    password: string
    company_name?: string
}

export class User extends Model {
    email: string
    password: string
    company_name: string

    constructor(payload: UserCreate) {
        super()
        this.email = payload.email
        this.password = payload.password
        this.company_name = payload.company_name || ''
    }

    static fromItem(item?: Record<string, any>): User {
        if(!item) throw new Error("No item!")
        return new User({
            email: item.email,
            password: item.password,
            company_name: item.company_name || ''
        })
    }

    get pk(): string {
        return `USER#${this.email.toUpperCase()}`
    }

    get sk(): string {
        return `USER#${this.email.toUpperCase()}`
    }

    get gsi1pk(): string {
        return this.pk
    }

    get gsi1sk(): string {
        return this.sk
    }

    get gsi2pk(): string {
        return this.pk
    }

    get gsi2sk(): string {
        return this.sk
    }

    toItem(): Record<string, any> {
        return {
            PK: this.pk,
            SK: this.sk,
            GSI1PK: this.gsi1pk,
            GSI1SK: this.gsi1sk,
            GSI2PK: this.gsi2pk,
            GSI2SK: this.gsi2sk,
            type: 'User',
            email: this.email,
            password: this.password,
            company_name: this.company_name,
        }
    }
}
