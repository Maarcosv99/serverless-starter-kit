import type { JestConfigWithTsJest } from 'ts-jest'
import BaseConfig from './jest.config'

const jestConfig: JestConfigWithTsJest = {
    ...BaseConfig,
    testMatch: [
        "**/test.+(int).[jt]s?(x)",
        "**/*+().+(int.test).[jt]s?(x)",
    ]
}

export default jestConfig