function setExample(){
    const text = getText(document.getElementById("examples").value)
    document.getElementById("input").value = text
}
function getText(example){
    switch (example) {
        case "1":
            return `variable a,b
a = "Hola"
b = " mundo"
imprime a
imprimir b`
        case "2":
            return `variable a,b,c,d
a = 3
b = 2.2
c = "cad1"
d = "cad2"
imprimir a+b
imprimir potencia(b,a)
imprimir escadena(c)
imprimir esentero(d)`
        case "3":
            return `si 0 entonces imprimir "true" sino imprimir "false"
si 1 entonces imprimir "true" sino imprimir "false"
si 0
imprimir "true"
sino
imprimir "false"
fin`
        case "4":
            return `variable a
a=10
mientras a>5
    imprimir a
    a = a - 0.5
terminar`
        case "5":
            return `variable k, i, j
k = 7500
desde i=1.0 hasta 8.0
    imprimir k, " entre ", i, " = ", k / i
siguiente
`
        default:
            return ""
    }
}