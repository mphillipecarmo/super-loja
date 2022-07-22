const conteiner_produtos = document.querySelector('#produtos');
   
let artigos = [
    {"imgs":"imgs/ar-puro.png", "titulo":"1 Saco de Ar Puro","texto":"Ea delenit ut iaceo quidem. Duis transverbero blandit tation te minim commoveo t."},
    {"imgs":"imgs/ar-puro.png", "titulo":"2 Saco de Ar Puro","texto":"Ea delenit ut iaceo quidem. Duis transverbero blandit tation te minim commoveo t."},
    {"imgs":"imgs/ar-puro.png", "titulo":"3 Saco de Ar Puro","texto":"Ea delenit ut iaceo quidem. Duis transverbero blandit tation te minim commoveo t."}
]
 
function colocaCard() {
    let card = ""
    for (let element of artigos) {
        card += '<article><img src="' + element.imgs+'"><h3>'+element.titulo+'</h3><p>'+element.texto+'</p></article>'

    }
    conteiner_produtos.innerHTML += card    
}

colocaCard()