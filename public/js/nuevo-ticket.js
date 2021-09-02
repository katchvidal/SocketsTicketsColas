

console.log('Nuevo Ticket HTML');


const span01 = document.querySelector('#lblNuevoTicket')
const but01 = document.querySelector('button')
console.log(but01);
console.log(span01);

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    but01.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    but01.disabled = true;
});

/*
socket.on('ultimo-ticket', ( ultimo ) => {
    span01.innerText = 'Ticket' + ultimo 
})
*/

but01.addEventListener( 'click', () => {

    socket.emit('siguiente-ticket', null, ( ticket ) => {
        span01.innerText = ticket; 
    });

});
