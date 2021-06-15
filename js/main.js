const prog = document.getElementById("input")

function run() {
    let error, tokens, ast
    try {
        [tokens, error] = new Lexer(prog.value).makeTokens()
        if (error) {
            console.log(error)
            if (tokens) console.log(tokens)
        } else {
            if (tokens && error === undefined) {
                [ast, error] = new Parser(tokens).parse()
            }
            if (error) {
                console.log(error)
                if (tokens) console.log(tokens)
                if (ast) console.log(ast)
            } else {
                if (ast && error === undefined) {
                    const startTime = new Date().getTime()
                        error = new Interpreter(ast).interpret()
                    const endTime = new Date().getTime()
                    console.log((endTime - startTime), "ms")
                }
                if (error) {
                    console.log(error)
                    if (tokens) console.log(tokens)
                    if (ast) console.log(ast)
                }
            }
        }
    } catch (e) {
        if (e !== "error") {
            console.log(e)
        }
    }
}

