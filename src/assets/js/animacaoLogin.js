// function random(max, min) {
//     return Math.ceil(Math.random() * (max - min) + min)
// }

// function cascata() {
//     const main = document.querySelector('main')


//     for (let i = 1; i <= random(70, 50); i++) {

//         let div = document.createElement('div')
//         // div.style.width = `${ale}px`
//         // div.style.height = `${ale}px`
//         // div.style.position = 'absolute'
//         // div.style.bottom = '0px'
//         // div.style.background = '#fff2'
//         // div.style.left = `${random(0, 100)}%`
//         div.classList.add("animateLogin")
//         main.appendChild(div)
//     }


//     const divs = document.querySelectorAll('.animateLogin')
//     divs.forEach(div => {
//         let ale = random(120, 40)

//         div.style.width = `${ale}px`
//         div.style.height = `${ale}px`
//         div.style.position = 'absolute'
//         div.style.bottom = '0px'
//         div.style.background = '#fff2'
//         div.style.left = `${random(0, 100)}%`
//         div.classList.add("animateLogin")

//     })


// }
// cascata()