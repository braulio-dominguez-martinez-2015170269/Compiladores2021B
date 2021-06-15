const TokenType = {
    "ENTERO": "ENTERO",
    "FLOTANTE": "FLOTANTE",
    "NUMERO": "NUMERO",
    "CADENA": "CADENA",
    "SUMA": "SUMA",
    "RESTA": "RESTA",
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
    "ID": "ID",
    "NO": "NO",
    "EQ": "EQ",
    "NE": "NE",
    "LT": "LT",
    "LE": "LE",
    "GT": "GT",
    "GE": "GE",
    "EOF": "EOF",
    "KEY": "KEY"
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
]
class Token {
    constructor(tokentype, value, position) {
        this.tokentype = tokentype
        this.value = value
        this.position = position
    }
}