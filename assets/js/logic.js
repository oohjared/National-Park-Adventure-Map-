var statesEl = $('#states')
var parksList = $('#parks')
var states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE",
"NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]
var npsAPI = "https://developer.nps.gov/api/v1/parks?api_key=DfZ6BCJAVwqNxkRBiJWorSPvEKU307arUCacFidE&limit=467&start=0";


for (var i = 0; i < states.length; i++) {
    var optionEl = $('<option>');
    optionEl.text(states[i]);
    optionEl.val(states[i]);
    statesEl.append(optionEl);
}

function searchNPS () {
        fetch(npsAPI + "&stateCode=CO")
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data){
                    data.data.forEach(function (park) {
                        displayCard(park);
                    })
                })
            }
        })
}


function displayCard () {
        var parkLi = $('<li>')
        var parkImg = $('<img>')
        var parkTitle = $('<h5>')
        parkTitle.text(park.fullName)
        parkImg.attr('src', park.images[0].url).attr('alt', park.images[0].altText)

        parksList.append(parkLi)
        parkLi.append(parkImg, parkTitle)
    }

searchNPS();