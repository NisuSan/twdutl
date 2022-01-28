/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  reporters: [
    "default",
    [ "jest-junit", { outputFile: './jest/results/jest.report.xml' } ]
  ],
}

module.exports = config