// initialize code editor
let input = CodeMirror($("#answer"), {
    mode: 'javascript',
    lineNumbers: true,
});

// run tests by either clicking button or cmd/ctrl + enter
$('#run').addEventListener('click', runTests)
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()  // avoid newline in editor
        runTests()
    }
})

function runTests () {
    eval(input.getValue())
    for ([i, test] of $$('.test').entries()) {
        let content = $('code', test).textContent

        if (runTest(content)) {
            $('h2', test).textContent = `Test ${i + 1} - OK`
        } else {
            $('h2', test).textContent = `Test ${i + 1} - FAILED`
        }
    }

    function runTest(content) {
        try {
            return eval('(' + content + ')()')
        } catch (_) {
            return false
        }
    }
}


// replace <code>a</code> with <code>`${__dictata_scope.a}`</scope>
const template_string_pattern = /\$\{([^}]+)}/g;

$$('code').forEach(c => {
    if (__dictata_scope[c.textContent]) {
        c.textContent = eval('`${__dictata_scope.' + c.textContent + '}`')
    }
})

// wrap tests with function test () { }
$$('.test code').forEach(test => {
    test.textContent = 'function test () {\n' +
        '  return ' + eval('`' + test.textContent.replace(template_string_pattern, '${__dictata_scope.$1}') + '`') +
        '}'
})

// show test on title click
$$('.test').forEach(test => {
    var visible = false
    let header = $('h2', test)
    header.title = 'Show test'
    header.addEventListener('click', () => {
        visible = !visible
        if (visible) {
            $('pre > code', test).style.display = 'block'
        } else {
            $('pre > code', test).style.display = ''
        }
    })
})

// helpers
function $ (query, element) {
    element = element || document
    return element.querySelector(query)
}

function $$ (query, element) {
    element = element || document
    return Array.from(element.querySelectorAll(query))
}