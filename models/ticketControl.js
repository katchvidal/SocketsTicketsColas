const path = require('path')
const fs = require('fs')


class Ticket {

    constructor( numero, escritorio ){

        this.numero = numero ;
        this.escritorio = escritorio ;

    }
}



class TicketControl {


    constructor(){

        this.ultimo     = 0;
        this.hoy        = new Date().getDay()
        this.tickets    = []
        this.ultimos4   = []

        this.init();

        this.guardarDB();

    }

    get toJSON(){
        return {

            ultimo      : this.ultimo,
            hoy         : this.hoy,
            tickets     : this.tickets,
            ultimos4    : this.ultimos4

        }
    }

    init () {

        const { hoy, ultimo, ultimos4, tickets } = require('../database/data.json')

        if ( hoy === this.hoy ){

            this.tickets = tickets
            this.ultimo = ultimo
            this.ultimos4 = ultimos4

        }else {

            this.guardarDB();
        }

    }

    guardarDB(){

        const dbPath= path.join(__dirname, '../database/data.json')
        fs.writeFileSync( dbPath, JSON.stringify( this.toJSON ))

    }

    siguienteTicket(){

        //  Siguiente Ticket es el ultimo de la base de datos + 1 
        this.ultimo += 1
        //  El Ticket -> Funcion Ticket( ticket.ultimo, escritorio -> null  )
        const ticket = new Ticket(this.ultimo, null )

        //  Subir a la base de datos [] -> Tickets -> Ingresale este Nuevo Ticket 
        this.tickets.push( ticket )

        //  Guardar en base de datos -> 
        this.guardarDB();

        return 'Ticket'+ ticket.numero + ' generado exitosamente '
    }

    atenderEscritorio( escritorio ){

        //  Si no tenemos Ticket - Validacion
        if ( this.tickets.length === 0){
            return null
        }

        //  Una vez asignado a Escritorio -> Remuevelo de la Cola para que nadie
            //  Mas lo pueda Volver a Tomar
        const ticket = this.tickets.shift()

        ticket.escritorio = escritorio

        //  Añadir a los Ultimos 4
        this.ultimos4.unshift( ticket )

        if ( this.ultimos4.length > 4 ){
            this.ultimos4.splice( -1, 1 )
        }

        this.guardarDB();

        return ticket;
       
    }

}


module.exports = TicketControl;