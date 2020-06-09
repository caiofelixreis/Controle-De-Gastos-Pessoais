
function estaLogado(){
    if(!localStorage.getItem('logado')){
        window.location.href = 'index.html'
    }
}














estaLogado()