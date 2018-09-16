const Metalsmith = require('metalsmith')
const md = require('metalsmith-markdownit')
const layouts = require('metalsmith-layouts')
const dictata = require('./dictata.js')
const ancestry = require('metalsmith-ancestry')


Metalsmith(__dirname)
    .use(md({ html: true }).use(dictata))
    .use(ancestry())
    .use(function (files, ms) {
        console.log(files)
    })
    .use(layouts({
        default: 'layout.njk',
        pattern: '**/*.html',
        engineOptions: {
            autoescape: false
        }
    }))
    .build(err => {
        if (err) throw err
    });
