const TokenType = {
    "EOF": "EOF",
    "ENTERO": "ENTERO",
    "FLOTANTE": "FLOTANTE",
    "NUMBER": "NUMBER",
    "CADENA": "CADENA",
    "PLUS": "PLUS",
    "MINUS": "MINUS",
    "MUL": "MUL",
    "DIV": "DIV",
    "MOD": "MOD",
    "LPAREN": "LPAREN",
    "RPAREN": "RPAREN",
    "LBRACKET": "LBRACKET",
    "RBRACKET": "RBRACKET",
    "ASSIGN": "ASSIGN",
    "COMMA": "COMMA",
    "COLON": "COLON",
    "DOT": "DOT",
    "NO": "NO",
    "EQ": "EQ",
    "NE": "NE",
    "LT": "LT",
    "LE": "LE",
    "GT": "GT",
    "GE": "GE",
    "IDENTIFIER": "IDENTIFIER",
    "KEYWORD": "KEYWORD"
}

const KEYWORDS = [
    "VARIABLE",
    "Y", "O", "NO",
    "SI", "ENTONCES", "SINO", "FIN",
    "DESDE", "HASTA", "SIGUIENTE",
    "MIENTRAS", "HAZ", "TERMINAR",
    "LIMPIAR",
    "IMPRIME", "IMPRIMIR", 
    "ENTERO", "FLOTANTE", "CADENA",
    "ESENTERO", "ESFLOTANTE", "ESCADENA",
    "RAIZ", "ABSOLUTO", "SENO", "COSENO", "TANGENTE", "REDONDEO", "ARRIBA", "ABAJO",
    "LOGARITMO", "EXPONENCIAL", "POTENCIA",
    "FECHA", "TIEMPO",
    // POR DEFINIR
    "FUNCTION", "ENDFUNCTION", "RETURN",
    "NAMESPACE", "ENDNAMESPACE", "CLEAR",
    "CPRINT",
    "DUMP", "CDUMP",
    "RND",
    "LEFT", "RIGHT", "MID",
    "STROKECOLOR", "FILLCOLOR", "POINT", "LINE", "RECT", "LINEWIDTH",
    "INPUT",
    "STEP", 
    "LEN", "ASC", "CHAR",
    "SIGN",
]

class Token {
    constructor(tokentype, value, position) {
        this.tokentype = tokentype
        this.value = value
        this.position = position
    }
}