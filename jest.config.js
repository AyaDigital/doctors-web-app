module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
    "^.+\\.(css)$": "<rootDir>/jest.transform.js"
  },
  transformIgnorePatterns: [
    'node_modules/(?!' + 
        [
            'node-fetch',
            'fetch-blob',
            'data-uri-to-buffer',
            'jest-runtime',
            'swiper',
            'swiper/react',
            'ssr-window',
            'dom7',
            'formdata-polyfill'
        ].join('|') +
    ')',
],
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  reporters: ['default', 'jest-junit'],

  // We don't need to test the static JSX in the icons folder, so let's exclude it from our test coverage report
  coveragePathIgnorePatterns: ['node_modules', 'src/icons'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': '<rootDir>/src/__mocks__/fileMock.ts',
    "swiper/react": "<rootDir>/node_modules/swiper/react/swiper-react.js",
    "swiper/css": "<rootDir>/node_modules/swiper/swiper.min.css",
    "swiper/css/pagination": "<rootDir>/node_modules/swiper/modules/autoplay/pagination.min.css"
  },
  modulePaths: [
		"src",
		"test"
	],
};
