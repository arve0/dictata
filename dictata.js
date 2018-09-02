//                $ { not} }
const template_string_pattern = /\$\{([^}]+)}/g;

module.exports = md => md.core.ruler.push('dictata', (state) => {
    let n = 0;
    for (let i = 0; i < state.tokens.length; i++) {
        let token = state.tokens[i]
        if (token.type !== 'fence' || token.info !== 'test') {
            continue
        }
        n += 1
        state.tokens[i] = testBlockStart(state.Token, n)
        state.tokens[i + 1] = token
        state.tokens[i + 2] = testBlockEnd(state.Token)
        // state.tokens[i + 3] = testInScriptBlock(state.Token, token.content, n)
        i += 3
    }
})

function testBlockStart(Token, n) {
    let t = new Token('html_block')
    t.block = true
    t.content = `<div class="test">\n`
    t.content += `<h2>Test ${n}</h2>\n`
    return t
}

function testInScriptBlock(Token, test, n) {
    let t = new Token('html_block')
    t.block = true
    test = test.replace(template_string_pattern, "eval(__dictata_scope.$1)")
    t.content = `<script>
    function __dictata_test_${n} () { try {
        ${test}
    } catch (_) { return false } }
    </script>`
    return t
}

function testBlockEnd(Token) {
    let t = new Token('html_block')
    t.block = true
    t.content = '</div>\n'
    return t
}
