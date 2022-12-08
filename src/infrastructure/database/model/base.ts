export abstract class Model {
    abstract get pk(): string
    abstract get sk(): string

    public keys(): Record<string, string> {
        return {
            PK: this.pk,
            SK: this.sk
        }
    }

    abstract toItem(): Record<string, unknown>
}
