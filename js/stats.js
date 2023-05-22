 const {createApp} = Vue;

 const app = createApp({
    data(){
        return{
            info:[],
            eventosFuturos:[],
            eventosPasados: [],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(res => res.json())
        .then (data => {
            this.info = data,
            this.eventosFuturos = this.info.events.filter((evento) => evento.date > this.info.currentDate);
            this.eventosPasados = this.info.events.filter((evento) => evento.date < this.info.currentDate);
            
        })  
        .catch(error => console.log(error))
    },
 })
 .mount ('#app')