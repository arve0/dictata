// initialize code editor
let input = CodeMirror($("#answer"), {
    mode: 'javascript',
    lineNumbers: true,
    value: localStorage.getItem(location.pathname + "#input") || "",
})

input.getInputField().addEventListener("keyup", () => {
    localStorage.setItem(location.pathname + "#input", input.getValue())
})

// run tests by either clicking button or cmd/ctrl + enter
if ($('#run')) {
    $('#run').addEventListener('click', runTests)
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault()  // avoid newline in editor
            runTests()
        }
    })
}

function runTests () {
    for ([i, codeBlock] of $$('.test').entries()) {
        let test = $('code', codeBlock).textContent

        run(test, input.getValue())
            .then(ok => {
                if (ok) {
                    $('h2', codeBlock).textContent = `Test ${i + 1} - OK`
                    approveTask()
                } else {
                    $('h2', codeBlock).textContent = `Test ${i + 1} - FAILED`
                }
            }).catch(err => {
                console.log(err)
                $('h2', codeBlock).textContent = `Test ${i + 1} - FAILED`
            })
    }

    async function run(testStr, input) {
        try {
            eval(testStr)
            return test(input)
        } catch (err) {
            console.log(err)
            return false
        }
    }
}


// replace <code>a</code> with <code>`${__dictata_scope.a}`</scope>
const template_string_pattern = /\$\{([^}]+)}/g;

$$('p > code').forEach(c => {
    try {
        c.textContent = __dictata_scope[c.textContent]
    } catch {}
})

// wrap tests with function test () { }
$$('.test code').forEach(test => {
    test.textContent = test.textContent.replace(template_string_pattern, (_, name) => __dictata_scope[name])
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

// add ✓ to approved tasks
function updateApprovedTasks () {
    let i = 1;
    $$('footer .task').forEach(task => {
        let pathname = task.href ? new URL(task.href).pathname : location.pathname
        $('button', task).textContent = i + (isApproved(pathname) ? ' ✓' : '')
        i += 1;
    })
}
updateApprovedTasks()

// helpers
function $ (query, element) {
    element = element || document
    return element.querySelector(query)
}

function $$ (query, element) {
    element = element || document
    return Array.from(element.querySelectorAll(query))
}

function approveTask() {
    localStorage.setItem(location.pathname, "approved")
    updateApprovedTasks()
}

function isApproved(pathname) {
    return localStorage.getItem(pathname) === "approved"
}

function addInputAsScript (str) {
    let previousScript = $('script#answer-script')
    if (previousScript) {
        document.body.removeChild(previousScript)
    }

    let script = document.createElement('script')
    script.id = 'answer-script'
    script.innerText = str
    document.body.appendChild(script)
}