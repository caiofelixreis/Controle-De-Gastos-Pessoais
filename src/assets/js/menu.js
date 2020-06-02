
function estaLogado(){
    if(!sessionStorage.getItem('logado')){
        window.href('../../../index.html')
    }
}














estaLogado()