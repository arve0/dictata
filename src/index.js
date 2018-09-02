const template_string_pattern = /\$\{([^}]+)}/g;

let run = document.getElementById("run")
let input = document.getElementById("input")

run.addEventListener('click', function () {
    eval(input.value)
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
})

Array.from(document.querySelectorAll('p')).forEach(p => {
    p.textContent = eval('`' + p.textContent.replace(template_string_pattern, '${__dictata_scope.$1}') + '`')
})

