/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  reporters: [
    "default",
    [ "jest-junit", { outputFile: './test_reports/jest.report.xml' } ]
  ],
}

module.exports = config