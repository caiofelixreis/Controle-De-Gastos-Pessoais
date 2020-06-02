
// login
document.querySelector('#btnEntrar').addEventListener('click', () => {
    if(!localStorage.getItem('usuarios')){
        modal('Faça o cadastro!!!', 'alert')
    }
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const inputs = document.querySelectorAll('[name=login]')

    usuarios.forEach(usuario => {
        if(usuario.email === inputs[0].value){
            if(usuario.senha === inputs[1].value){
                
                modal('Logado!!' , 'alert')
                
                inputs.forEach(input => input.value = '')

                sessionStorage.setItem('logado','true')

                setTimeout(()=>{
                    irPara('menu.html')
                },2250)
                
            }else{
                modal('Erro' , 'alert')
            }
        }else{
            modal('Erro' , 'alert')
        }
    })
})

// cadastro
document.querySelector('#btnCadastrar').addEventListener('click', () => {
    if(!localStorage.getItem('usuarios')){
        localStorage.setItem('usuarios', '[]')
    }
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const inputs = document.querySelectorAll('[name=cadastrar]')
    
    usuarios.push({
        nome:inputs[0].value,
        telefone:inputs[1].value,
        cep:inputs[2].value,
        email:inputs[3].value,
        senha:inputs[4].value,
    })

    localStorage.setItem('usuarios',JSON.stringify(usuarios))
    modal('Cadastrado com sucesso !! : )', 'alert')

    inputs.forEach(input => input.value = '')
})


function modal(html, tipo){
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
    
    if(tipo == 'alert'){
        setTimeout(()=> {
            modal.classList.add('sumir')
        },2000)
        setTimeout(()=> {
            modal.innerHTML = ''
            modal.style.display = 'none'
        },2300)
    }
}

function irPara(caminho){
    window.location.href = caminho 
}