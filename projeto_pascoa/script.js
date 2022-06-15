lista = [];

function buscarListaProduto() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "https://projeto-pascoa.herokuapp.com/");
    ajax.send();
    ajax.onload = function() {
        lista = JSON.parse(this.response);
        replicar();
    }
}

function replicar() {
    let i = 0;
    for (const p of lista) {
        p.qt = 0;
        let id = i;
        valor = p.valor.toString().replaceAll('.', ',');;
        let produto = document.querySelector(".produto").cloneNode(true);
        produto.querySelector(".valorR").innerHTML = valor.substr(0, 2);
        produto.querySelector(".valorC").innerHTML = valor.substr(2, 3);
        produto.querySelector(".titulo").innerHTML = p.nome;
        produto.querySelector(".descricao").innerHTML = p.descricao;
        produto.querySelector("img").src = `${p.imagem}`;

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
let total = 0;

function mostrarPedido() {
    msgModal = "";
    msgWhatsapp = "";
    let subTotal = 0;

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
    pix();
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

function pix() {
    if (document.getElementById("pagamento").value == "PIX") {

        var CPF = "02848846186";
        var descricao = "Pagamento do pedido 123456";
        var nome = "Kacio de Sousa";
        var cidade = "BRASILIA";
        var id = "WDEV1234";
        var valor = parseFloat(total.toFixed(2));
        const pix = new Pix(CPF, descricao, nome, cidade, id, valor);
        const payload = pix.getPayload();

        document.querySelector(".pix").style.display = "block";
        document.querySelector("#cp").style.display = "block";
        document.querySelector(".chavaPiX").innerHTML = payload;
    } else {
        document.querySelector(".chavaPiX").innerHTML = ""
        document.querySelector("#cp").style.display = "none";
        document.querySelector(".pix").style.display = "none";
    }
}

function copiar() {
    var copyText = document.getElementById("pix");
    var textArea = document.createElement("textarea");
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
}