#!/usr/bin/env node

const download = require('download-git-repo')
const program = require('commander')
const shell = require('shelljs');

program.usage('<project-name>')

program.on('--help', () => {
    console.log()
    console.log('  Example:')
    console.log()
    console.log('  # create a new project with cutt')
    console.log('  $ cutt my-project')
    console.log()
})
function help() {
    program.parse(process.argv)
    if (program.args.length < 1) return program.help()
}
help()

program.action(function (project) {
    let pwd = shell.pwd()
    console.log()
    console.log('  fetching template...')
    download(`jackshawn/cutt`, pwd + `/${project}`, null, function () {
        shell.rm('-rf', pwd + `/${project}/.git`)
        console.log('  complete!')
        console.log('')
        console.log('  next:')
        console.log('  $ cd ' + project)
        console.log('  $ npm install')
        console.log('  $ npm run dev')
        console.log('')
    })
})
program.parse(process.argv)