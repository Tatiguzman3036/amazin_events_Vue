
const {createApp} = Vue;

const app = createApp ({//recibe propiedades 
    data(){//es un metodos que retorna otro objeto // propiedades reactivas
            return {
                arrayEventos: [],
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
            console.log(data);
            this.arrayEventos = data.events
            console.log(this.arrayEventos);
            this.checkboxCategory = this.arrayEventos.map( evento => evento.category)
            this.checkboxSet = new Set(this.checkboxCategory) 
            this.newArrayCategory = Array.from (this.checkboxSet)
            console.log(this.newArrayCategory);
        })
        .catch(error => console.log(error))
    },
    computed: {
        filtro(){
            this.filtrarDoble = this.arrayEventos.filter((tarjeta) => tarjeta.name.toLowerCase().includes(this.buscador.toLowerCase()) && ( this.checked.includes(tarjeta.category) || this.checked.length == 0))  
        }   
    }
})
.mount ('#app')
