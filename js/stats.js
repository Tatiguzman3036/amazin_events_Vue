 const {createApp} = Vue;

 const app = createApp({
    data(){
        return{
            info:[],
            eventosFuturos:[],
            eventosPasados: [],
            categoriasFuturo: [],
            categoriasPasado:[],  
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(res => res.json())
        .then (data => {
            this.info = data,
            this.eventosFuturos = this.info.events.filter((evento) => evento.date > this.info.currentDate);
            this.eventosPasados = this.info.events.filter((evento) => evento.date < this.info.currentDate);
            this.categoriasFuturo = [ ...new Set(this.eventosFuturos.map((evento) => evento.category)),];
            this.categoriasPasado = [...new Set(this.eventosPasados.map((evento) => evento.category)),];
            })
        .catch(error => console.log(error))
    },
    methods: {
        eventoMayorGente() {
            const array = this.eventosPasados.slice();
            let porcentaje = (evento) =>
              (evento.assistance / evento.capacity) * 100;
            array.sort((itemA, itemB) => {
              return porcentaje(itemB) - porcentaje(itemA);
            });
            return `${array[0].name} : ${porcentaje(array[0]).toFixed(1)}%`;
          },
          eventoMenosGente() {
            let array = this.eventosPasados.slice();
            let porcentaje = (evento) =>
              (evento.assistance / evento.capacity) * 100;
            array.sort((itemA, itemB) => {
              return porcentaje(itemA) - porcentaje(itemB);
            });
            return `${array[0].name} : ${porcentaje(array[0]).toFixed(2)}%`;
          },
          eventoConMasCapacidad() {
            let array = this.info.events.slice()
            array.sort((itemA, itemB) => {
              return itemB.capacity - itemA.capacity;
            });
            return `${array[0].name} : ${array[0].capacity}`;
          },
          ////////SEGUNDA TABLA//////
          calcularRevenues(category) {
            let totalCategoria = 0;
            this.eventosFuturos.forEach((evento) => {
              if (evento.category === category) {
                let estimado = evento.estimate;
                let precio = evento.price;
                let producto = estimado * precio;
                totalCategoria += producto;
              }
            });
            return totalCategoria;
          },
          calcularPorcentajeAttendance(category) {
            let porcentajeTotal = 0;
            let eventos = this.eventosFuturos.filter(
              (evento) => evento.category === category
            );
            eventos.forEach((evento) => {
              let estimadoTotal = evento.estimate;
              let capacidadTotal = evento.capacity;
              let porcentajeEstimadoAsistencia =
                ((estimadoTotal / capacidadTotal) * 100) / eventos.length;
              porcentajeTotal += porcentajeEstimadoAsistencia;
            });
            return porcentajeTotal;
          },
          //////TERCER TABLA///////
          calcularRevenuesPasado(category) {
            let totalCategoria = 0;
            this.eventosPasados.forEach((evento) => {
              if (evento.category === category) {
                let asistencia = evento.assistance;
                let precio = evento.price;
                let producto = asistencia * precio;
                totalCategoria += producto;
              }
            });
            return totalCategoria;
          },
          calcularPorcentajeAttendancePasado(category) {
            let porcentajeTotal = 0;
            let eventos = this.eventosPasados.filter(
              (evento) => evento.category === category
            );
            eventos.forEach((evento) => {
              let asistenciaTotal = evento.assistance;
              let capacidadTotal = evento.capacity;
              let porcentajeAsistencia =
                ((asistenciaTotal / capacidadTotal) * 100) / eventos.length;
              porcentajeTotal += porcentajeAsistencia;
            });
            return porcentajeTotal;
          },
    }
 })
 .mount ('#app')
