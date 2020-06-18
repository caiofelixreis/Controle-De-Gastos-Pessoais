function estaLogado() {
    if (!localStorage.getItem('logado')) {
        window.location.href = 'index.html'
    }
}

function render() {
    const selectVerde = document.querySelector('#selectCategoriaVerde')
    const selectVermelho = document.querySelector('#selectCategoriaVermelho')

    if (!localStorage.getItem('categorias')) {
        localStorage.setItem('categorias', '[]')
    }

    const categorias = JSON.parse(localStorage.getItem('categorias'))
    console.log(categorias)

    selectVerde.innerHTML += categorias.map(categoria => ` <option value=${categoria}>${categoria}</option> `).join('')
    selectVermelho.innerHTML += categorias.map(categoria => ` <option value=${categoria}>${categoria}</option> `).join('')


    const logado = localStorage.getItem('logado')
    const div = document.querySelector('#perfil')
    div.innerHTML += logado

    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const usuarioLogado = usuarios.filter(usuario => checkLogado(usuario))

    function checkLogado(usuario = {}) {
        if (usuario.email == logado) {
            return usuario
        }
    }

    document.querySelector('#abrePerfil').addEventListener('click', () => { abrePerfil(usuarioLogado) })

    console.log(usuarioLogado)

}

document.querySelector('#addCategoria').addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        if (!localStorage.getItem('categorias')) {
            localStorage.setItem('categorias', '[]')
        }

        const data = e.target.value
        const categorias = JSON.parse(localStorage.getItem('categorias'))
        console.log(categorias)

        categorias.push(data)
        localStorage.setItem('categorias', JSON.stringify(categorias))

        modal('Categoria adicionada!! : )', 'alert')

        e.target.value = ''
        render()

    }
})

function abrePerfil(usuario) {
    const modalBox = document.querySelector('#modal')
    // modalBox.classList.remove('sumir')


    modal(`<i id="fechar" class="far fa-times-circle"></i><h1>${usuario[0].email}</h1>`)

    const fechar = document.querySelector('#fechar')
    fechar.addEventListener('click', () => {

        modalBox.classList.add('sumir')

        setTimeout(() => {
            modalBox.innerHTML = ''
            modalBox.style.display = 'none'
        }, 300)
        
    })

}

function modal(html, tipo) {
    const modal = document.querySelector('#modal')
    modal.style.display = 'flex'
    modal.classList.remove('sumir')
    modal.classList.add('aparecer')

    modal.innerHTML =
        `
        <div class='modal-body'>
            ${html}
        </div>
    `

    if (tipo == 'alert') {
        setTimeout(() => {
            modal.classList.add('sumir')
        }, 2000)
        setTimeout(() => {
            modal.innerHTML = ''
            modal.style.display = 'none'
        }, 2300)
    }
}


render()
estaLogado()