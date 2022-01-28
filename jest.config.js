/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  reporters: [
    "default",
    [ "jest-junit", { outputFile: './jest/results/report.xml' } ]
  ],
}

module.exports = config