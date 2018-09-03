const template_string_pattern = /\$\{([^}]+)}/g;

let run = document.getElementById("run")
let input = CodeMirror(document.getElementById("input"), {
    mode: 'javascript',
    lineNumbers: true,
});

run.addEventListener('click', runTests)

Array.from(document.querySelectorAll('code')).forEach(c => {
    if (__dictata_scope[c.textContent]) {
        c.textContent = eval('`${__dictata_scope.' + c.textContent + '}`')
    }
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.metaKey) {
        runTests()
    }
})

function runTests () {
    eval(input.getValue())
    let tests = Array.from(document.querySelectorAll('.test'))

    for (let i = 0; i < tests.length; i++) {
        let test = tests[i]
        let test_content = test.querySelector('code').textContent

        if (runTest(test_content)) {
            test.children[0].textContent = `Test ${i + 1} - OK`
        } else {
            test.children[0].textContent = `Test ${i + 1} - FAILED`
        }
    }

    function runTest(test) {
        try {
            test = eval('`' + test.replace(template_string_pattern, '${__dictata_scope.$1}') + '`')
            return eval(test)
        } catch (_) {
            return false
        }
    }
}