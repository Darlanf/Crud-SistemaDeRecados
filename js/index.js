const form = document.getElementById(`formLogin`);

const logado = localStorage.getItem(`logado`);
if (logado) {
    alert(`Usuario ${logado} logado!`)
    location.href = `recados.html`;
};

const logar = (event) => {
    event.preventDefault();
    const email = document.getElementById(`email`).value
    let password = document.getElementById(`senha`).value
    const account = buscarConta (email);
    
    if (!account) {
        alert(`Algo deu errado! Verique seu email ou senha.\nNão possui conta? Crie uma nova!`);
        return;
    }
    
    if (account) {
        if (account.senha !== password) {
            alert(`Algo deu errado! Verique seu email ou senha.\nNão possui conta? Crie uma nova!`);
            return;
        };

        salvarSessão (account.login);

        window.location.href = "recados.html";
    };
};

const salvarSessão = (data) => {
    localStorage.setItem(`logado`, data);
}

const buscarConta = (mail) => {
    const usuarios = JSON.parse(localStorage.getItem(`usuarios`));
    if (!usuarios) {
        return;
    }
    const usuarioValido = usuarios.find(usuario => usuario.login == mail);
    return usuarioValido;
} 

form === null || form === void 0 ? void 0 : form.addEventListener(`submit`, logar) 