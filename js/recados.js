// variaveis globais
const form  = document.getElementById('formRecados');
const tBody = document.getElementById('tbody');
const msgErro = document.getElementById(`msg-erro`);

const logado = localStorage.getItem(`logado`);
if (!logado) {
    alert(`Crie uma conta!`)
    location.href = `conta.html`;
};

// salvar recados
const salvarRecado = (event) => {
    event.preventDefault();
    
    msgErro.innerHTML = "";
    
    const description = form.descricao.value;
    const detail = form.detalhes.value;
    
    const errors = [];

    if (!description || description.length < 3) {
        errors.push(`<p>Descrição inválida!`)
        alert(`Descrição inválida!`);
    }
    if (!detail || detail.length < 3) {
        errors.push(`<p>Detalhamento inválido!`)
        alert(`Detalhamento inválido!`)
    }
    if (errors.length > 0) {
        msgErro.innerHTML = errors.join(" ");
        return;        
    }
    
    // salvar itens no Array
    recados.push({
        id: Math.floor(Date.now() / 1000),
        descricao: description,
        detalhes: detail,
    });

    // atualiza recados no localStorage
    atualizarLocalStorage(recados); 

    // // fill tabela

    mostrarTabela();

    alert(`Recado salvo com sucesso!`);

    // limpar formulário

    form.reset();

};

// salvar no localStorage
const atualizarLocalStorage = (recados) => {
    const usuarios = JSON.parse(localStorage.getItem(`usuarios`));
    usuarios.forEach(usuario => {
        if (usuario.login == logado){
            usuario.recados = recados       
        }        
    });
    localStorage.setItem(`usuarios`, JSON.stringify(usuarios));
};

// buscar os recados
const buscarRecados = () => {
    const usuarios = JSON.parse(localStorage.getItem(`usuarios`));
    const usuarioLogado = usuarios.find(usuario => usuario.login == logado);
    return usuarioLogado.recados;
}
let recados = buscarRecados()

//mostrar na página
const mostrarTabela = () => {

    tBody.innerHTML = ``;
    let num = 1;

    for (const recado of recados) {
        tBody.innerHTML += `
        <tr>
            <th>${num}</th>
            <td>${recado.descricao}</td>
            <td>${recado.detalhes}</td>
            <td class="btnAcoes">
                <input type="button" name="apagar" id="btnApagar" value="Apagar" onclick="apagarRecado(${recado.id})">
                <input type="button" name="editar" id="btnEditar" value="Editar" onclick="editarRecado(${recado.id})">
            </td>

        </tr>
        `;
        num++;
    }
};
mostrarTabela();

//apagar recados
const apagarRecado = (id) => {
    const vaiApagar = confirm(`Voce gostaria de apagar este recado?`);
    if (!vaiApagar) {
        return;
    };
    const indexRecado = recados.findIndex((recado) => recado.id === id);
    if(indexRecado < 0) {
        return;
    }
    recados.splice(indexRecado, 1);
    atualizarLocalStorage(recados);
    alert(`Recado removido!`);
    mostrarTabela();
};

//editar recados
const editarRecado = (id) => {
    const vaiEditar = confirm(`Voce gostaria de editar esse recado?`);
    if (!vaiEditar) {
        return;
    };

    const indexRecado = recados.findIndex((recado) => recado.id === id);
    if (indexRecado < 0) {
        return;
    };

    let description = prompt(`Edite a descrição do seu recado:`, `${recados[indexRecado].descricao}`);
    
    if (!description || description.length < 3) {
        alert(`Nova descrição inválida!`);
        return;
    };
    
    let detail = prompt(`Edite o detalhe do seu recado:`, `${recados[indexRecado].detalhes}`);
    
    if (!detail || detail.length < 3) {
        alert(`Novo detalhamento inválido!`);
        return;
    };
    recados[indexRecado].descricao = description;
    recados[indexRecado].detalhes = detail;

    atualizarLocalStorage(recados);
    mostrarTabela();
};

//sair da pagina e deslogar usuario.   
const logOut = document.getElementById(`btn-sair`);

logOut.addEventListener(`click`, (event) => {
    event.preventDefault();
    const vaiSair = confirm(`Deseja sair?`);
    if (!vaiSair) {
        return;
    }
    localStorage.removeItem(`logado`);
    location.href = `index.html`;
});


form === null || form === void 0 ? void 0 : form.addEventListener(`submit`, salvarRecado);
document.addEventListener(`DOMContentLoaded`, mostrarTabela);