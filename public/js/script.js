let valoresAlea = [];
for(let i = 1; i <= 6; i++){

    let alea = Math.round(Math.random());
    valoresAlea.push(alea)
    
}

let hexaAleatorio = Math.random().toString().slice(2);
// numero do hexadecimal aleatorios
let hexaAlea = [];
for(let i = 1; i <= 6; i++){
    let y = i + 1;
    let inteiro = Math.round(hexaAleatorio.slice(i, y));
    hexaAlea.push(inteiro)
}

let aleatorio = [];
aleatorio[0] = Array('a', 'b', 'c', 'd', 'e', 'f', 'a', 'b', 'c', 'd');
aleatorio[1] = Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');

// cor gerada
let cor = aleatorioHexadecimal(
    aleatorio[valoresAlea[0]][hexaAlea[0]],
    aleatorio[valoresAlea[1]][hexaAlea[1]],
    aleatorio[valoresAlea[2]][hexaAlea[2]],
    aleatorio[valoresAlea[3]][hexaAlea[3]],
    aleatorio[valoresAlea[4]][hexaAlea[4]],
    aleatorio[valoresAlea[5]][hexaAlea[5]],
);

function aleatorioHexadecimal(um, dois, tres, quatro, cinco, seis){
    let hexa = `#${um}${dois}${tres}${quatro}${cinco}${seis}`;
    return hexa
}



