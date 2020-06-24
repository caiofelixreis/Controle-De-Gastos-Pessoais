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

    console.log(usuario)

    modal(`
    <i id="fechar" class="far fa-times-circle"></i>
    
    <div class="control">
        <label>Nome</label>
        <input value=${usuario[0].nome}>
    </div>
    <div class="control">
        <label>Email</label>
        <input value=${usuario[0].email}>
    </div>
    <div class="control">
        <label>Senha</label>
        <input type="password" value=${usuario[0].senha}>
    </div>
    <div class="control">
        <button>Editar</button>
    </div>
    `)

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


document.querySelector('#lancameto').addEventListener('click', () => {
    const inputs = document.querySelectorAll('[name=ganho]')



    const logado = localStorage.getItem('logado')
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))

    const userDono = usuarios.findIndex(user => user.email == logado)

    if (!localStorage.getItem('lancamentos')) {
        localStorage.setItem('lancamentos', '[]')
    }

    const lancamentos = JSON.parse(localStorage.getItem('lancamentos'))

    lancamentos.push({
        usuario: userDono,
        valor: inputs[0].value,
        descricao: inputs[1].value,
        categoria: inputs[2].value
    })

    localStorage.setItem('lancamentos', JSON.stringify(lancamentos))

    modal('Prontinho ...', 'alert')

    setTimeout(()=>{
        window.location.reload()
    },2350)
    
})

document.querySelector('#gastoClick').addEventListener('click', () => {
    const inputs = document.querySelectorAll('[name=gasto]')



    const logado = localStorage.getItem('logado')
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))

    const userDono = usuarios.findIndex(user => user.email == logado)

    if (!localStorage.getItem('gasto')) {
        localStorage.setItem('gasto', '[]')
    }

    const gasto = JSON.parse(localStorage.getItem('gasto'))

    gasto.push({
        usuario: userDono,
        valor: inputs[0].value,
        descricao: inputs[1].value,
        categoria: inputs[2].value
    })

    localStorage.setItem('gasto', JSON.stringify(gasto))

    modal('Prontinho ...', 'alert')

    setTimeout(()=>{
        window.location.reload()
    },2350)

})

function saldo() {


    const logado = localStorage.getItem('logado')
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const userDono = usuarios.findIndex(user => user.email == logado)

    const lancamentos = JSON.parse(localStorage.getItem('lancamentos'))


    const lancamentosUsuario = lancamentos.map(item => {
        if (item.usuario == userDono) {
            return item.valor
        }
    })

    const gasto = JSON.parse(localStorage.getItem('gasto'))

    const gastoUsuario = gasto.map(item => {
        if (item.usuario == userDono) {
            return item.valor
        }
    })


    const saldo = lancamentosUsuario.reduce((accumulator, currentValue) => accumulator + currentValue) - gastoUsuario.reduce((accumulator, currentValue) => accumulator + currentValue)
    console.log(saldo)
    document.querySelector('#saldo').innerHTML += `R$ ${saldo.toFixed(2)}`

}

saldo()

render()
estaLogado()