lista = [];

function buscarListaProduto() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "produtos.json");
    ajax.send();
    ajax.onload = function() {
        lista = JSON.parse(this.response);
        replicar();
    }
}

function replicar() {
    let i = 0;
    for (const p of lista) {
        let id = i;
        valor = p.valor.toString().replaceAll('.', ',');;
        let produto = document.querySelector(".produto").cloneNode(true);
        produto.querySelector(".valorR").innerHTML = valor.substr(0, 2);
        produto.querySelector(".valorC").innerHTML = valor.substr(2, 3);
        produto.querySelector(".titulo").innerHTML = p.nome;
        produto.querySelector(".descricao").innerHTML = p.descricao;
        produto.querySelector("img").setAttribute('src', p.img);

        produto.querySelector("#menos").addEventListener("click", function() {
            alterarQt(id, -1);
        })

        produto.querySelector("#mais").addEventListener("click", function() {
            alterarQt(id, 1);
        })

        document.querySelector(".lista").append(produto);
        i++;
    }
    document.querySelector(".produto").remove();

}

function alterarQt(id, qt) {
    let p = lista[id];
    p.qt += qt;
    if (p.qt < 0) p.qt = 0;
    document.getElementsByClassName("qt")[id].innerHTML = p.qt;

}

let msgModal = "";
let msgWhatsapp = "";

function mostrarPedido() {
    msgModal = "";
    msgWhatsapp = "";
    let subTotal = 0;
    let total = 0;
    for (const produto of lista) {
        if (produto.qt > 0) {
            subTotal = (produto.valor * produto.qt).toFixed(2);
            total += +subTotal;
            msgWhatsapp += `✅ - ${produto.qt} ${produto.nome.toUpperCase()} Valor = R$ ${produto.valor} Total = R$ ${subTotal}\n`;
            msgModal += `<tr><td>${produto.nome.toUpperCase()}</td><td>R$ ${produto.valor}</td><td class="tdQt">${produto.qt}</td><td>R$ ${subTotal}</td></tr>`;
        }
    }
    if (msgModal == "") {
        msgModal = "<tr><td>Nenhum produto selecionado.</td></tr>";
        document.querySelector("#btEnviar").disabled = "disabled";
    } else {
        msgWhatsapp += `\n\n*Total R$ ${total.toFixed(2)}*\n`;
        msgModal += `<h4 class="valorTotal"> Total R$ ${total.toFixed(2)}</h4>`;
        document.querySelector("#btEnviar").disabled = "";
    }
    document.querySelector(".modal-body").innerHTML = msgModal;
}


function enviar() {
    let fone = '556194214606';
    let nome = document.querySelector("#nome").value;
    let endereco = document.querySelector("#endereco").value;
    let pagamento = document.querySelector("#pagamento").value;
    msgWhatsapp += `\n*Nome:* ${nome}`;
    msgWhatsapp += `\n*Enderço:* ${endereco}`;
    msgWhatsapp += `\n*Forma de Pagamento:* ${pagamento}`;
    msgWhatsapp = encodeURI(msgWhatsapp);

    link = `https://api.whatsapp.com/send?phone=${fone}&text=${msgWhatsapp}`;
    window.open(link, '_blanck')
}

buscarListaProduto();