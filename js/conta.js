const usuarios = JSON.parse(localStorage.getItem("usuarios"))||[];

const form = document.getElementById(`formConta`);

const logado = localStorage.getItem(`logado`);
if (logado) {
    alert(`Usuario ${logado} logado!`)
    location.href = `recados.html`;
};

const cadastrar = (event) => {
    event.preventDefault();

    let email = document.getElementById(`email`).value;
    let password = document.getElementById(`senha`).value;
    let confirmPassword = document.getElementById(`confirmeSenha`).value;

    if (email.length < 5) {
        alert(`Preencha o campo com um e-mail válido!`);
        form.email.focus();
        return;
    }
    if (password.length < 4) {
        alert(`Preencha a senha com no mínimo 4 digitos!`);
        form.senha.focus();
        return;
    }
    if (confirmPassword.length < 4 || confirmPassword != password) {
        alert(`Os campos senha e confirmação precisam ser iguais!`);
        form.confirmeSenha.focus();
        return;
        
    }
        
    if (usuarios.find(usuario => usuario.login == email)) {
        alert(`Usuario já existe!`)
        return;
    }

    let user = {
        login: email,
        senha: password,
        recados: []
    }
    usuarios.push(user);
    localStorage.setItem(`usuarios`, JSON.stringify(usuarios));
    
    alert(`Conta criada com sucesso!`);
    location.href = `index.html`;
    
    
    // salvarConta ({
    //     login: email,
    //     senha: password,
    //     recados: []
    // });
    
}

form === null || form === void 0 ? void 0 : form.addEventListener(`submit`, cadastrar)