let numeroAleatorio = Math.round(Math.random());
let hexaAleatorio = Math.random().toString().slice(2);
let indiceAleatorio = Math.round(hexaAleatorio.slice(0, 1));
let num1 = Math.round(hexaAleatorio.slice(0, 1));
let num2 = Math.round(hexaAleatorio.slice(1, 2));
let num3 = Math.round(hexaAleatorio.slice(2, 3));
let num4 = Math.round(hexaAleatorio.slice(3, 4));
let num5 = Math.round(hexaAleatorio.slice(4, 5));
let num6 = Math.round(hexaAleatorio.slice(5, 6));


let aleatorio = [];
aleatorio[0] = Array('a', '1', 'c', '2', 'e', '5', 'a', '7', 'c', '8');
aleatorio[1] = Array('0', 'a', 'f', '8', '4', '5', '6', '7', '8', '5');
aleatorio[2] = Array('a', '1', 'a', 'a', 'e', '5', 'a', '7', 'c', '7');
aleatorio[3] = Array('0', 'b', '2', '5', 'f', 'a', '6', '7', '8', '9');
aleatorio[4] = Array('a', '1', 'c', '8', 'e', 'f', 'a', 'a', 'c', '1');
aleatorio[5] = Array('0', 'c', '2', '7', '4', '5', 'f', '7', '8', 'a');
aleatorio[6] = Array('a', '1', 'e', '8', 'e', '5', 'a', 'f', 'c', '2');
aleatorio[7] = Array('0', 'd', '2', '8', '4', '5', '6', '7', 'f', '8');
aleatorio[8] = Array('a', '1', 'c', 'e', 'e', '5', 'a', '7', 'c', 'f');
aleatorio[9] = Array('0', 'e', '2', '5', '4', '5', '6', '7', '8', '3');

var cor = aleatorioHexadecimal(
    aleatorio[numeroAleatorio][num1],
    aleatorio[numeroAleatorio][num2],
    aleatorio[numeroAleatorio][num3],
    aleatorio[numeroAleatorio][num4],
    aleatorio[numeroAleatorio][num5],
    aleatorio[numeroAleatorio][num6],
);
function aleatorioHexadecimal(um, dois, tres, quatro, cinco, seis){
    let hexa = `#${um}${dois}${tres}${quatro}${cinco}${seis}`;
    return hexa
}