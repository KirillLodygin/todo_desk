module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(my-custom-module)/)'
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json'
        }
    }
};
