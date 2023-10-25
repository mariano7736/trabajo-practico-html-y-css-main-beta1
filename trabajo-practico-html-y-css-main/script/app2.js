window.addEventListener('load', ()=> {
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
   

    let vientoVelocidad = document.getElementById('viento-velocidad') 


    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( posicion => {
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude
           

           //ubicación por ciudad
           const url = `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&lang=es&units=metric&appid=47d75c96e41fc2eed5aeb1d315c351ae`

           

           fetch(url)
            .then( response => { return response.json()})
            .then( data => {
               
                
                let temp = Math.round(data.main.temp)
              
                temperaturaValor.textContent = `${temp} ° C`

                
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                
                vientoVelocidad.textContent = `${data.wind.speed} m/s`
                

                
            })
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})
