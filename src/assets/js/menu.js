
function estaLogado(){
    if(!sessionStorage.getItem('logado')){
        window.location.href = 'index.html'
        console.log('oi')
    }
}














estaLogado()