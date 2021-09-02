const { v4: uuidv4 } = require('uuid');
const TicketControl = require('../models/ticketControl');


const ticketControl = new TicketControl();

const socketController = (socket) => { 


    //  Cuando un Cliente Se Conecte 
    socket.emit('ultimo-ticket', ticketControl )
    socket.emit('estado-actual', ticketControl.ultimos4 )
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length )

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguienteTicket();
        callback( siguiente )
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length )

    })

    //  Regresar Ticket al Escritorio para que sea atendido -> Regresa un ticket por orden de espera 
    socket.on( 'atender-ticket', (  { escritorio }, callback ) => {
        //  Si el Escritorio No Viene 
       if ( !escritorio ){
           return callback({
               
               ok : false,
               msg : 'Escritorio es obligatorio'

           })
       }

       const ticket = ticketControl.atenderEscritorio( escritorio )

       //   Notificar que los ultimos 4 estan cambiando -> 
       socket.broadcast.emit('estado-actual', ticketControl.ultimos4 )
       socket.emit( 'tickets-pendientes', ticketControl.tickets.length )
       socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length )


       //   Validaciones
       if ( !ticket ){
           callback({
               ok : false,
               msg : ' Ya no hay Tickets Pendientes '
           })
       }else{
           callback({
               ok : true,
               ticket
           })
       }
    })
}



module.exports = {
    socketController
}

