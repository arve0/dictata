const template_string_pattern = /\$\{([^}]+)}/g;

let run = document.getElementById("run")
let input = CodeMirror(document.getElementById("answer"), {
    mode: 'javascript',
    lineNumbers: true,
});

run.addEventListener('click', runTests)

// replace <code>a</code> with <code>`${__dictata_scope.a}`</scope>
$$('code').forEach(c => {
    if (__dictata_scope[c.textContent]) {
        c.textContent = eval('`${__dictata_scope.' + c.textContent + '}`')
    }
})

$$('.test code').forEach(test => {
    test.textContent = 'function test () {\n' +
        '  return ' + eval('`' + test.textContent.replace(template_string_pattern, '${__dictata_scope.$1}') + '`') +
        '}'
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.metaKey) {
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

function $ (query, element) {
    element = element || document
    return element.querySelector(query)
}

function $$ (query, element) {
    element = element || document
    return Array.from(element.querySelectorAll(query))
}