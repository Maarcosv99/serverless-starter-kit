import type { JestConfigWithTsJest } from 'ts-jest'
import BaseConfig from './jest.config'

const jestConfig: JestConfigWithTsJest = {
    ...BaseConfig,
    testMatch: [
        "**/test.+(e2e).[jt]s?(x)",
        "**/*+().+(e2e.test).[jt]s?(x)",
    ]
}

export default jestConfig