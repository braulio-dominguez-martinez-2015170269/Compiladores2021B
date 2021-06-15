class Interpreter {
    constructor(ast) {
        this.ast = ast
        this.output = document.getElementById("output")
        this.errorMsg = undefined
    }
    error(msg, position, details = undefined) {
        this.errorMsg = { msg, position, details }
        throw "error"
    }
    visit_FuncDefNode(node, ctx) {
        if (ctx.symbolTable.declareVar(node.identifier) === undefined) {
            this.error(`Redeclaracion de ${node.identifier}`, node.position)
        }
        ctx.symbolTable.setVar(node.identifier, new DefFunction(node.identifier, node.prog, node.args, node.retvalue))
    }
    visit_FuncCallNode(node, ctx) {
        const func = ctx.symbolTable.getVar(node.identifier)
        if (!func) {
            this.error(`Funcion desconocida ${node.identifier}`, node.position)
        }
        const context = new Context(node.identifier, ctx)
        if (func.params?.length !== node.args?.length) {
            const flen = func.params?.length || 0
            const alen = node.args?.length || 0
            this.error(`Cantidad de argumentos incorrecta, se esperan ${flen} se tienen ${alen}`, node.position)
        }
        if (func.params) {
            func.params.forEach(e => { this.visit(e, context) })
            for (let i = 0; i < func.params.length; i++) {
                if (context.symbolTable.setVar(func.params[i].identifier, this.visit(node.args[i], context)) === undefined) {
                    this.error(`Variable desconocida ${func.params[i].identifier}`, node.position)
                }
            }
        }
        if (func.prog) {
            this.visit(func.prog, context)
        }
        const returnValue = func.retvalue ? this.visit(func.retvalue, context) : new DTNull()
        return returnValue
    }
    visit_RoundNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: REDONDEO(${arg.value})`, node.position)
        }
        return new IntNumber(Math.round(arg.value))
    }
    visit_FloorNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: ABAJO(${arg.value})`, node.position)
        }
        return new IntNumber(Math.floor(arg.value))
    }
    visit_CeilNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: ARRIBA(${arg.value})`, node.position)
        }
        return new IntNumber(Math.ceil(arg.value))
    }
    visit_SinNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: SENO(${arg.value})`, node.position)
        }
        return new FloatNumber(Math.sin(arg.value))
    }
    visit_CosNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: COSENO(${arg.value})`, node.position)
        }
        return new FloatNumber(Math.cos(arg.value))
    }
    visit_TanNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: TANGENTE(${arg.value})`, node.position)
        }
        return new FloatNumber(Math.tan(arg.value))
    }
    visit_LogNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: LOGARITMO(${arg.value})`, node.position)
        }
        return new FloatNumber(Math.log(arg.value))
    }
    visit_ExpNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: EXPONENCIAL(${arg.value})`, node.position)
        }
        return new FloatNumber(Math.exp(arg.value))
    }
    visit_PowerNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        const exp =  this.visit(node.exp, ctx)
        if (!(arg instanceof BaseNumber) || !(exp instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: POTENCIA(${arg.value})`, node.position)
        }
        return new FloatNumber(Math.pow(arg.value, exp.value))
    }
    visit_SqrtNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: RAIZ(${arg.value})`, node.position)
        }
        return new FloatNumber(Math.sqrt(arg.value))
    }
    visit_AbsNode(node, ctx) {
        const arg =  this.visit(node.arg, ctx)
        if (!(arg instanceof BaseNumber)) {
            this.error(`El argumento debe ser numero: ABSOLUTO(${arg.value})`, node.position)
        }
        return new IntNumber(Math.abs(arg.value))
    }
    visit_RandomNode(node, ctx) {
        return new FloatNumber(Math.random())
    }
    visit_DateNode(node, ctx) {
        return new DTString(new Date().toLocaleDateString())
    }
    visit_TimeNode(node, ctx) {
        return new DTString(new Date().toLocaleTimeString())
    }
    visit_ClsNode(node, ctx) {
        this.output.value = ""
    }
    visit_PrintNode(node, ctx) {
        if (node.args !== undefined) {
            for (let e of node.args) {
                this.output.value += this.visit(e, ctx).value
            }
        }
    }
    visit_PrintLNNode(node, ctx) {
        if (node.args !== undefined) {
            for (let e of node.args) {
                this.output.value += this.visit(e, ctx).value
            }
        }
        this.output.value += "\n"
    }
    visit_ForNode(node, ctx) {
        const forIdentifier = node.forIdentifier.identifier
        this.visit(node.forIdentifier, ctx)
        const forStart = this.visit(node.forStart, ctx)
        const forEnd = this.visit(node.forEnd, ctx)
        const forStep = this.visit(node.forStep, ctx)
        if (!(forStart instanceof FloatNumber) || !(forEnd instanceof FloatNumber) || !(forStep instanceof FloatNumber)) {
            this.error(`Los argumentos deben ser flotantes: DESDE`, node.position)
        }
        if (forStep.value === 0) {
            this.error(`El paso no puede ser cero: DESDE`, node.position)
        }
        if (ctx.symbolTable.setVar(forIdentifier, forStart) === undefined) {
            this.error(`Variable no declarada: ${forIdentifier}`, node.position)
        }
        if (forStep.value > 0) {
            while (ctx.symbolTable.getVar(forIdentifier).value <= forEnd.value) {
                this.visit(node.forProg, ctx)
                ctx.symbolTable.setVar(forIdentifier, ctx.symbolTable.getVar(forIdentifier).add(new FloatNumber(forStep.value)))
            }
        } else {
            while (ctx.symbolTable.getVar(forIdentifier).value >= forEnd.value) {
                this.visit(node.forProg, ctx)
                ctx.symbolTable.setVar(forIdentifier, ctx.symbolTable.getVar(forIdentifier).add(new FloatNumber(forStep.value)))
            }
        }
    }
    visit_WhileNode(node, ctx) {
        while (this.visit(node.condition, ctx).value !== 0) {
            this.visit(node.whiledo, ctx)
        }
    }
    visit_IfNode(node, ctx) {
        if (this.visit(node.condition, ctx).value !== 0) {
            this.visit(node.ifthen, ctx)
        } else {
            if (node.ifelse !== undefined) {
                this.visit(node.ifelse, ctx)
            }
        }
    }
    visit_StatementNode(node, ctx) {
        if (node.left !== undefined) {
            this.visit(node.left, ctx)
        }
        if (node.right !== undefined) {
            this.visit(node.right, ctx)
        }
    }
    visit_DeclareIdentifierNode(node, ctx) {
        if (Array.isArray(node.identifier)) {
            node.identifier.forEach(e => {
                if (ctx.symbolTable.declareVar(e.identifier) === undefined) {
                    this.error(`Redeclaratcion de ${e.identifier}`, node.position)
                }
            })
        } else {
            if (ctx.symbolTable.declareVar(node.identifier) === undefined) {
                this.error(`Redeclaracion de ${node.identifier}`, node.position)
            }
        }
    }
    visit_DeclareIfUndeclaredIdentifierNode(node, ctx) {
        ctx.symbolTable.declareVar(node.identifier)
    }
    visit_IdentifierNode(node, ctx) {
        if (ctx.symbolTable.testVar(node.identifier)) {
            if (node.access) {
                const index = this.visit(node.access, ctx).value
                const listVar = ctx.symbolTable.getVar(node.identifier)
                return listVar.getElement(index)
            }
            return ctx.symbolTable.getVar(node.identifier)
        } else {
            this.error(`Variable no declarada: ${node.identifier}`, node.position)
        }
    }
    visit_IntNode(node, ctx) {
        return new IntNumber(node.value)
    }
    visit_IntConvNode(node, ctx) {
        const value = this.visit(node.value, ctx)
        if (value instanceof BaseNumber || value instanceof DTString) {
            return new IntNumber(parseInt(value.value), ctx)
        } else {
            this.error(`Error al convertir a entero`, node.position)
        }
    }
    visit_FloatConvNode(node, ctx) {
        const value = this.visit(node.value, ctx)
        if (value instanceof BaseNumber || value instanceof DTString) {
            return new FloatNumber(parseFloat(value.value), ctx)
        } else {
            this.error(`Error al convertir a flotante`, node.position)
        }
    }
    visit_StringConvNode(node, ctx) {
        const value = this.visit(node.value, ctx)
        if (value instanceof BaseNumber) {
            return new DTString("" + value.value, ctx)
        } else {
            this.error(`Error al convertir a cadena`, node.position)
        }
    }
    visit_IntTestNode(node, ctx) {
        const value = this.visit(node.value, ctx)
        return new IntNumber(value instanceof IntNumber ? 1 : 0, ctx)
    }
    visit_FloatTestNode(node, ctx) {
        const value = this.visit(node.value, ctx)
        return new IntNumber(value instanceof FloatNumber ? 1 : 0, ctx)
    }
    visit_StringTestNode(node, ctx) {
        const value = this.visit(node.value, ctx)
        return new IntNumber(value instanceof DTString ? 1 : 0, ctx)
    }
    visit_FloatNode(node, ctx) {
        return new FloatNumber(node.value)
    }
    visit_StringNode(node, ctx) {
        return new DTString(node.value)
    }
    visit_AssignNode(node, ctx) {
        let value = this.visit(node.value, ctx), writeElement = undefined
        if (node.writeAccess) {
            writeElement = this.visit(node.writeAccess, ctx)
            if (!(writeElement instanceof BaseNumber)) {
                this.error("El indice debe ser un entero", node.position)
            }
            writeElement = writeElement.value
        }
        if (value instanceof IntNumber || value instanceof FloatNumber || value instanceof DTString) {
            if (ctx.symbolTable.setVar(node.name, value, writeElement) === undefined) {
                this.error(`Variable no declarada ${node.name}`, node.position)
            }
        } 
    }
    visit_UnOpNode(node, ctx) {
        const left = this.visit(node.left, ctx)
        let result = left
        if (node.operator.tokentype === TokenType.RESTA) {
            if (!left instanceof BaseNumber) {
                this.error("Numero esperado (-)", left.position)
            }
            if (left instanceof IntNumber) {
                result = new IntNumber(-left.value)
            } else if (left instanceof FloatNumber ) {
                result = new FloatNumber(-left.value)
            }
        } else if (node.operator.tokentype === TokenType.KEY && node.operator.value === "NO") {
            if (left instanceof IntNumber) {
                return new IntNumber(left.value === 0 ? 1 : 0)
            } else {
                this.error("Entero esperado (NO)", left.position)
            }
        }
        return result
    }
    visit_BinOpNode(node, ctx) {
        const left = this.visit(node.left, ctx)
        const right = this.visit(node.right, ctx)
        switch (node.operator.tokentype) {
            case TokenType.SUMA:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).add(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).add(right)
                } else if (left instanceof DTString && right instanceof DTString) {
                    return new DTString(left).add(right)
                } else {
                    this.error(`Incompatibilidad de tipo (+) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.RESTA:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).sub(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).sub(right)
                } else {
                    this.error(`Incompatibilidad de tipo (-) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.MUL:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).mul(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).mul(right)
                } else if (left instanceof DTString && right instanceof BaseNumber) {
                    return new DTString(left).mul(right)
                } else {
                    this.error(`Incompatibilidad de tipo (*) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.DIV:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).div(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).div(right)
                } else {
                    this.error(`Incompatibilidad de tipo (/) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.MOD:
                if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).mod(right)
                } else {
                    this.error(`Incompatibilidad de tipo (%) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.KEY:
                switch (node.operator.value) {
                    case "O":
                        if (left instanceof IntNumber && right instanceof IntNumber) {
                            return new IntNumber(left).or(right)
                        } else {
                            this.error(`Incompatibilidad de tipo (or) [${typeof left}, ${typeof right}]`, node.position)
                        }
                        break
                    case "Y":
                        if (left instanceof IntNumber && right instanceof IntNumber) {
                            return new IntNumber(left).and(right)
                        } else {
                            this.error(`Incompatibilidad de tipo (and) [${typeof left}, ${typeof right}]`, node.position)
                        }
                        break
                }
            case TokenType.EQ:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).eq(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).eq(right)
                } else if (left instanceof DTString && right instanceof DTString) {
                    return new DTString(left).eq(right)
                } else{
                    this.error(`Incompatibilidad de tipo (==) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.NE:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).ne(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).ne(right)
                } else if (left instanceof DTString && right instanceof DTString) {
                    return new DTString(left).ne(right)
                } else {
                    this.error(`Incompatibilidad de tipo (!=) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.LT:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).lt(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).lt(right)
                } else if (left instanceof DTString && right instanceof DTString) {
                    return new DTString(left).lt(right)
                } else {
                    this.error(`Incompatibilidad de tipo (<) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.LE:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).le(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).le(right)
                } else if (left instanceof DTString && right instanceof DTString) {
                    return new DTString(left).le(right)
                } else {
                    this.error(`Incompatibilidad de tipo (<=) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.GT:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).gt(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).gt(right)
                } else if (left instanceof DTString && right instanceof DTString) {
                    return new DTString(left).gt(right)
                } else {
                    this.error(`Incompatibilidad de tipo (>) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
            case TokenType.GE:
                if (left instanceof FloatNumber || right instanceof FloatNumber) {
                    return new FloatNumber(left).ge(right)
                } else if (left instanceof IntNumber && right instanceof IntNumber) {
                    return new IntNumber(left).ge(right)
                } else if (left instanceof DTString && right instanceof DTString) {
                    return new DTString(left).ge(right)
                } else {
                    this.error(`Incompatibilidad de tipo (>=) [${typeof left}, ${typeof right}]`, node.position)
                }
                break
        }
    }
    visit(node, ctx) {
        if (this.errorMsg === undefined) {
            return this[`visit_${node.constructor.name}`](node, ctx)
        }
    }
    interpret() {
        const ctx = new Context("main")
        try {
            this.visit(this.ast, ctx)
        } catch (e) {
            if (e !== "error") {
                console.log(e)
            }
        } finally {
            return this.errorMsg
        }
    }
}