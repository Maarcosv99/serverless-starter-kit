import type { JestConfigWithTsJest } from 'ts-jest'
import BaseConfig from './jest.config'

const jestConfig: JestConfigWithTsJest = {
    ...BaseConfig,
    testMatch: [
        "**/test.+(unit).[jt]s?(x)",
        "**/*+().+(unit.test).[jt]s?(x)",
    ]
}

export default jestConfig