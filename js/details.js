const {createApp} = Vue;

const app = createApp ({//recibe propiedades 
    data(){
        return{
            arrayEventos: [],
            parametros: [],
            capturarId: [],
            buscarId:[],
        }
    },
    created(){

        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(res => res.json())
        .then (data => {
            this.arrayEventos = data.events
            /* console.log(this.arrayEventos); */
            this.parametros = new URLSearchParams (location.search)
            /* console.log(this.parametros); */
            this.capturarId = this.parametros.get("_id")
            /* console.log(this.capturarId); */
            this.buscarId = this.arrayEventos.find(item => item._id == this.capturarId)
        })
        .catch(error => console.log(error))
    },
})
.mount ('#app')
