window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temp_desc = document.querySelector('.temperature-description');
    let temp_degree = document.querySelector('.temperature-degrees');
    let location_timezone = document.querySelector('.location-timezone');
    let temp_section = document.querySelector('.degree-section');
    const temp_span = document.querySelector('.degree-section span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&
            exclude=minutely,hourly,daily&appid=5c375abe61fc08ba4046affd5734f9e8`;

            fetch(api)
            .then(responce => {
                return responce.json();
            })
            .then(data => {
                console.log(data);
                const {temp, weather} = data.current;
                const {description, icon} = data.current.weather[0];
                let degree_celcius = (temp - 273.15);

                //Set DOM elements from the API
                temp_degree.textContent = parseFloat(degree_celcius).toFixed(2);
                temp_desc.textContent = description;
                location_timezone.textContent = data.timezone;
                document.getElementById('icon').innerHTML='<img src=\'http://openweathermap.org/img/wn/' + icon +'@2x.png\'>'

                //Measurement Selector
                temp_section.addEventListener('click', ()=> {
                    if(temp_span.textContent === 'C'){
                        temp_span.textContent = 'F';
                        let degree_farh = (degree_celcius * 9/5) + 32;
                        temp_degree.textContent = parseFloat(degree_farh).toFixed(2);
                    } else {
                        temp_span.textContent = 'C';
                        temp_degree.textContent = parseFloat(degree_celcius).toFixed(2);
                    }
                });
            });
        });
    } else {
        h1.textContent = 'Unable To Find Current Location'
    }

});