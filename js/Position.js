class Position {
    constructor(pos, line, col) {
        this.pos = pos
        this.line = line
        this.col = col
    }
    advance(char = undefined) {
        this.pos++
        this.col++

        if (char === "\n") {
            this.col = 1
            this.line++
        }
    }
    copy() {
        return new Position(this.pos, this.line, this.col)
    }
    toString() {
        return `Posicion: ${this.pos}, Columna: ${this.col}, Fila: ${this.line}`
    }
}
