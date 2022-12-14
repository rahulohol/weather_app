const container = document.querySelector(".left");
const search = document.querySelector("#search");
const left = document.querySelector("main > .container > .left");
// let light =true;

// if(light){
//   // document.getElementsByTagName("html")[0].style.backgroundColor = "white"
//   document.getElementsByTagName("main")[0].style.border = "1px solid white"
//   document.getElementsByTagName("main")[0].style.backgroundColor = "white"
//   document.getElementsByTagName("main")[0].style.height = "100vh"


//   document.getElementsByTagName("body")[0].style.border = "white"

//   // background: var(--gradient-box-w);
//   // box-shadow: var(--shadow-white-3);
// }

search.addEventListener("submit",get_weather);

let apiKey = "e9afa43786b9f2e76c0c0ccfdf049043"; 
async function get_weather(e) {
    e.preventDefault();
  try {
    let city = document.querySelector("#city").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    if(data.coord){
      display_data(data);
    forcast_data(data.coord.lon,data.coord.lat);
    }else{
      display_error(city);
    }
    document.querySelector("#city").value="";
  } catch (error) {
    console.log(error);
  }
}


function display_data(data) {
  document.querySelector(".container").style.transform = "scale(1)";
  document.querySelector(".error").style.transform="scale(0)";
  document.querySelector(".error").innerHTML=null;
  container.innerHTML = null;

   
  let name = document.createElement("h2");
  let country;
  data.sys.country?country=data.sys.country:country="";
  name.innerHTML =`<i class="fa-solid fa-location-dot"></i> ${data.name}, ${country}`;

  let icon = document.createElement("h1");

  if(data.weather[0].main=="Clouds"){
    icon.innerHTML=`<i class='bx bx-cloud bx-tada' ></i>`;  
    left.style.backgroundImage = 'url("https://images.pexels.com/photos/814449/pexels-photo-814449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
  }else if(data.weather[0].main=="Clear"){
    icon.innerHTML=`<i class="bx bxs-sun bx-tada"></i>`;
    left.style.backgroundImage = 'url("https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
  }else if(data.weather[0].main=="Thunderstorm"){
    icon.innerHTML=`<i class='bx bx-cloud-lightning bx-tada' ></i>`;
    left.style.backgroundImage = 'url("https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
  }else if(data.weather[0].main=="Drizzle"){
    icon.innerHTML=`<i class='bx bx-cloud-drizzle bx-tada' ></i>`;
    left.style.backgroundImage = 'url(https://images.pexels.com/photos/7002970/pexels-photo-7002970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
  }else if(data.weather[0].main=="Rain"){
    icon.innerHTML=`<i class='bx bx-cloud-rain bx-tada' ></i>`;
    left.style.backgroundImage = 'url("https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
  }else if(data.weather[0].main=="Snow"){
    icon.innerHTML=`<i class='bx bx-cloud-snow bx-tada' ></i>`;
    left.style.backgroundImage = 'url("https://images.pexels.com/photos/773953/pexels-photo-773953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
  }else{
    icon.innerHTML=`<i class='bx bx-wind bx-tada' ></i>`;
    left.style.backgroundImage = 'url("https://images.pexels.com/photos/4353210/pexels-photo-4353210.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")';
  }

  let type = document.createElement("h3");
  type.innerText=data.weather[0].description;

  let temp = document.createElement("h1");
  temp.innerHTML =`${data.main.temp}<sup>o</sup>C`;

  let div1 = document.createElement("div");
  
  let min = document.createElement("p");
  min.innerHTML=`<span>Min temp </span> ${data.main.temp_min}<sup>o</sup>C`;
  let max = document.createElement("p");
  max.innerHTML=`<span> Max temp </span> ${data.main.temp_max}<sup>o</sup>C`;

  div1.append(min,max);

  let div2 = document.createElement("div");
  let wind = document.createElement("p");
  wind.innerHTML=`<i class="bx bxl-tailwind-css bx-fade-left"></i> ${data.wind.speed}m/s`;
  let humidity = document.createElement("p");
  humidity.innerHTML=` <i class='bx bxs-droplet bx-burst' ></i>${data.main.humidity}%`;

  div2.append(wind,humidity);

  let div3 = document.createElement("div");

  let rise = document.createElement("p");
        let sunrise = new Date(data.sys.sunrise*1000);
        let time = sunrise.toLocaleTimeString();
  rise.innerHTML=`Sunrise at ${time}`;

  let set = document.createElement("p");
  let sunset = new Date(data.sys.sunset*1000);
  let time2 = sunset.toLocaleTimeString();
  set.innerHTML=`Sunset at ${time2}`;


 div3.append(rise,set);
  

  let map = document.querySelector("iframe");
  map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

  container.append(name,icon,type, temp, div1,div2,div3);
}


const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const time = new Date();
const today = time.getDay()+1;

async function forcast_data(lon,lat){
  let url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&exclude=hourly,minutely,alerts,current&units=metric`;

  let res = await fetch(url);
  let data =await res.json();
  display_forecast(data.daily);
}

function display_forecast(data){
  document.querySelector(".extended").style.transform="scale(1)";
  document.querySelector(".extended > h2").style.color="#fff";
  document.querySelector(".forecast").innerHTML=null;
  data.map(function(elem,index){

    let div = document.createElement("div");
    div.style.borderRadius="4px";
    // div.style.border="1px solid #2d2e3d";
// light?div.style.background= "linear-gradient(to right, #e3e9ed, transparent)":null;
// light?div.style.boxShadow= "var(--shadow-white-3)":null;

// light?div.style.color= "black":null;

    // background: var(--gradient-box-w);
    // box-shadow: var(--shadow-white-3);


    let day= document.createElement("h2");

    day.innerText=days[(today+index)%7];

    let img = document.createElement("img");
    img.src=`https://openweathermap.org/img/w/${elem.weather[0].icon}.png`;

    let desc = document.createElement("h4");
    desc.innerText=elem.weather[0].description;

    let temp= document.createElement("h2");
    temp.innerHTML=`${elem.temp.day}<sup>o</sup>C`;

    let div2= document.createElement("div");

    let p1 = document.createElement("p");
    p1.innerHTML=`${elem.temp.min}<sup>o</sup>C`;
    let p2 = document.createElement("p");
    p2.innerHTML=`/${elem.temp.max}<sup>o</sup>C`;

    div2.append(p1,p2);

    div.append(day,img,desc,temp,div2);
    document.querySelector(".forecast").append(div);
  })
}


function display_error(data){
  container.innerHTML = null;
  document.querySelector(".forecast").innerHTML=null;
  document.querySelector(".container").style.transform = "scale(0)";
  document.querySelector(".extended > h2").style.color="transparent";
  document.querySelector(".error").style.transform="scale(1)";
  document.querySelector(".error").innerHTML=`No result found for ${data}`;
}