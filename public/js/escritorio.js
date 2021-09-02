//  Referencias HTML
const lblescritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblticket = document.querySelector('small')
const divalerta = document.querySelector('.alert')
const lblPendientes = document.querySelector('#lblPendientes')

const SearchParams = new URLSearchParams( window.location.search );


if ( !SearchParams.has( 'escritorio' ) ){
    window.location = 'index.html'
    throw new Error ( 'Escritorio es Obligartorio')
}


const escritorio = SearchParams.get( 'escritorio' )
lblescritorio.innerText = escritorio

divalerta.style.display = 'none'

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});


socket.on('tickets-pendientes', ( pendientes  ) => {

    if( pendientes === 0){

        lblPendientes.style.display = 'none'

    }else {

        lblPendientes.innerText = pendientes 
        lblPendientes.style.display = ''

    }
})


btnAtender.addEventListener( 'click', () => {

    
    //  Recibimos del Backend Toda la informacion que emite 
    socket.emit('atender-ticket', { escritorio},  ( { ok, ticket, msg  } ) => {
        
        if ( !ok ){
            return divalerta.style.display = ''
            //Si queremos que  lblticket.innerText=` No hay mas Ticket Por Atender `
        }

        lblticket.innerText=`Ticket ${ticket.numero}`
    })

});
