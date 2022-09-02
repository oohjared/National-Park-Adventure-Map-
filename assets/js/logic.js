var statesEl = $('#states')
var statesOption = $('option')
var parksList = $('#parks')
var parksEl = $('#parks-el')
var states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE",
"NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]
var npsAPI = "https://developer.nps.gov/api/v1/parks?api_key=DfZ6BCJAVwqNxkRBiJWorSPvEKU307arUCacFidE&limit=467&start=0";
var parksArray = []

for (var i = 0; i < states.length; i++) {
    var optionEl = $('<option>');
    optionEl.text(states[i]);
    optionEl.val(states[i]);
    statesEl.append(optionEl);
}

function searchNPS () {
        fetch(npsAPI + "&stateCode=" + statesEl.val())
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data){
                    parksList.empty();
                    data.data.forEach(function (park) {
                        displayCard(park);
                        
                    })
                })
            }
        })
}


function displayCard (park) {
    var parkLi = $('<li>').addClass('list-inline-item p-1')
    var parkImgDiv = $('<div>').addClass('position-relative park-div rounded')
    var parkImg = $('<img>').addClass('park-image rounded')
    var parkTitle = $('<h6>').addClass('park-title text-center text-white text-wrap overflow-auto p-1')
    parkTitle.text(park.fullName).attr('data-code', park.parkCode)
    parkImg.attr('src', park.images[0].url).attr('alt', park.images[0].altText)
    
    parksList.append(parkLi)
    parkLi.append(parkImgDiv)
    parkImgDiv.append(parkImg, parkTitle)
}

function addPark (event) {
    event.stopPropagation();
    var parkCode = event.target.dataset.code

    fetch(npsAPI + '&parkCode=' + parkCode)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    var parkTitle = data.data[0].fullName
                    var parkLat = data.data[0].latitude
                    var parkLong = data.data[0].longitude
                    var parkInfo = {
                        title: parkTitle,
                        lat: parkLat,
                        long: parkLong
                        }

                    if (!parksArray.includes(parkInfo)){
                        parksArray.push(parkInfo);
                    } 

                    console.log(parksArray)
                    console.log(parkInfo)
                    
                    localStorage.setItem('parkInfo', JSON.stringify(parksArray))
                    
                    // parkRender();
                })
            }
        })
}

function parkRender () {
    var park = JSON.parse(localStorage.getItem("parkInfo"))
    console.log(park)
    
}

parksEl.on('click', '.park-div', addPark)
statesEl.on('click', searchNPS);


// localStorage.setItem('lat', JSON.stringify(parkLat)),
// localStorage.setItem('long', JSON.stringify(parkLong))