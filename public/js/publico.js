//  Referencias 
const tick1     = document.querySelector('#lblTicket1')
const esc1      = document.querySelector('#lblEscritorio1')
const tick2     = document.querySelector('#lblTicket2')
const esc2      = document.querySelector('#lblEscritorio2')
const tick3     = document.querySelector('#lblTicket3')
const esc3      = document.querySelector('#lblEscritorio3')
const tick4     = document.querySelector('#lblTicket4')
const esc4      = document.querySelector('#lblEscritorio4')



const socket = io();

socket.on('estado-actual', ( payload ) => {
    
    //  Reproducir Timbre cuando se genere un Ticket
    const audio = new Audio('./audio/new-ticket.mp3')
    audio.play()

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if( ticket1 ){

        tick1.innerText = 'Ticket' + ticket1.numero
        esc1.innerText  = ticket1.escritorio
    }
    if( ticket1 ){

        tick2.innerText = 'Ticket' + ticket2.numero
        esc2.innerText  = ticket2.escritorio
    }
    if( ticket1 ){

        tick3.innerText = 'Ticket' + ticket3.numero
        esc3.innerText  = ticket3.escritorio
    }
    if( ticket1 ){
        
        tick4.innerText = 'Ticket' + ticket4.numero
        esc4.innerText  = ticket4.escritorio
        
    }
})