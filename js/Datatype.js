class DataType {
    constructor() {
    }
}
class BaseFunction extends DataType {
    constructor(identifier) {
        super()
        this.identifier = identifier
    }

    str() {
        return `Funcion ${this.identifier}()`
    }
}
class DefFunction extends BaseFunction {
    constructor(identifier, prog, params, retvalue) {
        super(identifier)
        this.prog = prog
        this.params = params
        this.retvalue = retvalue
    }
}
class DTNull extends DataType {
    constructor() {
        super()
    }

    str() {
        return `NULO`
    }
}
class DTString extends DataType {
    constructor(v) {
        super()
        if (v instanceof DTString) {
            this.value = v.value
        } else {
            this.value = v
        }
    }
    add(other) {
        this.value = this.value + other.value
        return this
    }
    mul(other) {
        let result = ""
        for (let i = 0; i < other.value; i++) {
            result += this.value
        }
        this.value = result
        return this
    }
    getLen() {
        return this.value.length
    }
    eq(other) {
        this.value = this.value === other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    ne(other) {
        this.value = this.value !== other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    lt(other) {
        this.value = this.value < other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    le(other) {
        this.value = this.value <= other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    gt(other) {
        this.value = this.value > other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    ge(other) {
        this.value = this.value >= other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    str() {
        return `"${this.value}"`
    }
}
class BaseNumber extends DataType {
    constructor(v) {
        super()
        if (v instanceof BaseNumber) {
            this.value = v.value
        } else {
            this.value = v
        }
    }
    str() {
        return `${this.value}`
    }
}
class IntNumber extends BaseNumber {
    constructor(value) {
        super(value)
    }
    add(other) {
        if (other instanceof BaseNumber) {
            this.value = this.value + parseInt(other.value)
        }
        return this
    }
    sub(other) {
        if (other instanceof BaseNumber) {
            this.value = this.value - parseInt(other.value)
        }
        return this
    }
    mul(other) {
        if (other instanceof BaseNumber) {
            this.value = this.value * parseInt(other.value)
        }
        return this
    }
    div(other) {
        if (other instanceof BaseNumber) {
            if (other.value === 0) {
                throw {
                    msg: "Division por cero"
                }
            }
            this.value = this.value / parseInt(other.value)
        }
        return this
    }
    mod(other) {
        if (other instanceof IntNumber) {
            this.value = this.value % parseInt(other.value)
        }
        return this
    }
    or(other) {
        this.value = this.value | other.value
        return this
    }
    and(other) {
        this.value = this.value & other.value
        return this
    }
    eq(other) {
        this.value = this.value === other.value ? 1 : 0
        return this
    }
    
    ne(other) {
        this.value = this.value !== other.value ? 1 : 0
        return this
    }
    lt(other) {
        this.value = this.value < other.value ? 1 : 0
        return this
    }
    le(other) {
        this.value = this.value <= other.value ? 1 : 0
        return this
    }
    gt(other) {
        this.value = this.value > other.value ? 1 : 0
        return this
    }
    ge(other) {
        this.value = this.value >= other.value ? 1 : 0
        return this
    }
}
class FloatNumber extends BaseNumber {
    constructor(value) {
        super(value)
    }
    add(other) {
        if (other instanceof BaseNumber) {
            this.value = this.value + other.value
        }
        return this
    }
    sub(other) {
        if (other instanceof BaseNumber) {
            this.value = this.value - other.value
        }
        return this
    }
    mul(other) {
        if (other instanceof BaseNumber) {
            this.value = this.value * other.value
        }
        return this
    }
    div(other) {
        if (other instanceof BaseNumber) {
            if (other.value === 0) {
                throw {
                    msg: "Division por cero"
                }
            }
            this.value = this.value / other.value
        }
        return this
    }
    eq(other) {
        this.value = this.value === other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    ne(other) {
        this.value = this.value !== other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    lt(other) {
        this.value = this.value < other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    le(other) {
        this.value = this.value <= other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    gt(other) {
        this.value = this.value > other.value ? 1 : 0
        return new IntNumber(this.value)
    }
    ge(other) {
        this.value = this.value >= other.value ? 1 : 0
        return new IntNumber(this.value)
    }
}
