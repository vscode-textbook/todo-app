module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.module\\.css$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(ts|tsx)$': [
        'ts-jest', { 
          tsconfig: {
            jsx: 'react-jsx',
          },
        }
      ],
    },
};
