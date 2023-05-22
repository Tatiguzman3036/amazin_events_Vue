const {createApp} = Vue;

const app = createApp ({//recibe propiedades 
    data(){//es un metodos que retorna otro objeto // propiedades reactivas
            return {
                arrayEventos: [],
                arrayEventosFuturos : [],
                newArrayCategory: [],
                checked: [],
                buscador: "",
                filtrarDoble: [],
            }
    },
    created(){ // es un metodo que queremos que se ejecute una sola vez creada la aplicacion
 
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(res => res.json())
        .then (data => {
            /* console.log(data); */
            this.arrayEventos = data
            /* console.log(this.arrayEventos); */
            this.arrayEventosFuturos = this.arrayEventos.events.filter(evento => evento.date > this.arrayEventos.currentDate )
            /* console.log(this.arrayEventosPasados); */
            this.checkboxCategory = this.arrayEventosFuturos.map( evento => evento.category)
            /* console.log(this.checkboxCategory); */
            this.checkboxSet = new Set(this.checkboxCategory) 
            /* console.log(this.checkboxSet); */
            this.newArrayCategory = Array.from (this.checkboxSet)
        })
        .catch(error => console.log(error))
    },
    computed: {
        filtro(){
            this.filtrarDoble = this.arrayEventosFuturos.filter((tarjeta) => tarjeta.name.toLowerCase().includes(this.buscador.toLowerCase()) && ( this.checked.includes(tarjeta.category) || this.checked.length == 0))  
        }   
    }
})
app.mount ('#app')