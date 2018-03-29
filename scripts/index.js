#! usr/bin/env node

const Curriculum = require('../lib/curriculum')
const GitHub = require('../lib/networking/github')

const basePath = process.argv[2]

const git = new GitHub(basePath)

const curriculum = new Curriculum(git)

// from here you can script changes to the curriculum.cl

module.exports = curriculum
