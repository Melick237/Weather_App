const APIKEY = "7eb89794063ff124eee3ab9fc63d3056"
const APISERVER = "https://api.openweathermap.org/data/2.5/forecast?"
let cityNameInput = document.getElementById("cityname")
let searchBtn = document.getElementById("search")
let cards = document.getElementById("card_container")
let title = document.getElementById("title")

searchBtn.addEventListener("click", () => {
    cards.classList.add("show")
    title.classList.add("show")
    let cityName
    if(cityNameInput.value === '' || isBlank(cityNameInput.value))
        cityName = "berlin"
    else
        cityName = cityNameInput.value

    fetchData(cityName)
    title.innerText = cityName

});

function fetchData(city){
    let request = APISERVER + "q="+city+"&appid="+APIKEY+"&lang=de&units=metric"
    fetch(request).then((promise) =>{
        promise.json().then((res)=>{
            let jsonData = res

            let dates = []
            dates[0] = getCurrentDate(0);
            dates[1] = getCurrentDate(1);
            dates[2] = getCurrentDate(2);
            dates[3] = getCurrentDate(3);
            dates[4] = getCurrentDate(4);
            dates[5] = getCurrentDate(5);

            let data = []
            data[0] = getElementsWithDate(jsonData.list, dates[0])[0]
            data[1] = getElementsWithDate(jsonData.list, dates[1])[3]
            data[2] = getElementsWithDate(jsonData.list, dates[2])[3]
            data[3] = getElementsWithDate(jsonData.list, dates[3])[3]
            data[4] = getElementsWithDate(jsonData.list, dates[4])[3]
            data[5] = getElementsWithDate(jsonData.list, dates[5])[3]
            console.log(data)

            for(let i=0; i < data.length; i++){
                document.getElementById("temp"+i).innerText= data[i].main.temp
                let deg =  document.createElement("span");
                deg.appendChild(document.createTextNode('c'));
                document.getElementById("temp"+i).appendChild(deg)

                document.getElementById("date"+i).innerText= dates[i]
                document.getElementById("minTemp"+i).innerText= data[i].main.temp_min
                document.getElementById("maxTemp"+i).innerText= data[i].main.temp_max
                document.getElementById("description"+i).innerText= data[i].weather[0].description
            }
         }).catch((err)=>{
            fetchData("berlin")
            title.innerText = "Berlin"
        })
    }).catch((err)=>{
        console.log(err)
    })
}


function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function getCurrentDate(gap){
    let today = new Date();
    today.setDate(today.getDate() + gap);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today
}

function getElementsWithDate(list , date){
    let dateList = []
    list.forEach((e)=>{
        if(e.dt_txt.includes(date))
            dateList.push(e)
    })

    return dateList
}
