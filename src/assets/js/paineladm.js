document.querySelector('#botaoMenu').addEventListener('click', abrirMenu)

function abrirMenu() {
    const botao = document.querySelector('#botaoMenu')
    const menu = document.querySelector('.menu')
    const clicado = botao.getAttribute('clicado')

    if (clicado === 'false') {
        botao.setAttribute('clicado', 'true')
        menu.style.display = 'flex'
    } else {
        botao.setAttribute('clicado', 'false')
        menu.style.display = 'none'
    }

    console.log(clicado)


}

function render() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const tabela = document.querySelector('#linhasUsuario')

    tabela.innerHTML = usuarios.map(usuario =>
        `<tr>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
            <td>${usuario.cep}</td>
            <td>${usuario.status}</td>
            <td>edit -- delete</td> 
        </tr>
        `
    ).join('')

}
render()