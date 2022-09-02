var statesEl = $('#states');
var statesOption = $('option');
var parksList = $('#parks');
var parksEl = $('#parks-el');
var parksSelectEl = $('#parks-selected');
var mapButtonEl = $('#mapButton')
var startingInput = $('#startingInput')
var parksSelectList = $('.selected');
var states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE",
"NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
var npsAPI = "https://developer.nps.gov/api/v1/parks?api_key=DfZ6BCJAVwqNxkRBiJWorSPvEKU307arUCacFidE&limit=467&start=0";
var parksArray = [];

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
    var parkLi = $('<li>').addClass('list-inline-item p-1');
    var parkImgDiv = $('<div>').addClass('position-relative park-div rounded');
    var parkImg = $('<img>').addClass('park-image rounded');
    var parkTitle = $('<h6>').addClass('park-title text-center text-white text-wrap overflow-auto p-1');
    parkTitle.text(park.fullName).attr('data-code', park.parkCode);
    parkImg.attr('src', park.images[0].url).attr('alt', park.images[0].altText);
    
    parksList.append(parkLi);
    parkLi.append(parkImgDiv);
    parkImgDiv.append(parkImg, parkTitle);
}

function addPark (event) {
    event.stopPropagation();
    var parkCode = event.target.dataset.code;

    fetch(npsAPI + '&parkCode=' + parkCode)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function (data) {
                    parksSelectList.empty();
                    console.log(data);
                    var parkTitle = data.data[0].fullName;
                    var parkAddress = `${data.data[0].addresses[0].line1} ${data.data[0].addresses[0].city}, ${data.data[0].addresses[0].stateCode}`
                    var parkInfo = {
                        title: parkTitle,
                        address: parkAddress,
                        code: parkCode
                        };
                    localStorage.setItem(JSON.stringify(parkCode), JSON.stringify(parkInfo));
                    parkRender();
                })
            }
        })
}

function parkRender () {
    parksArray = []
    var parkCodes = Object.keys(localStorage)
    for (i = 0; i < parkCodes.length; i++) {
        console.log(parkCodes[i])
        if(parkCodes[i] != '"startPoint"'){
            var parkSelect = JSON.parse(localStorage.getItem(parkCodes[i]));
            var parkObj = {
                title: parkSelect.title,
                code: parkSelect.code
            }
            parksArray.push(parkObj);
        }
    }
       
    parksArray.forEach (function (park) {
        var parkLi = $('<li>').attr('data-index', park.code).addClass('park-select list-unstyled ui-state-default rounded m-1 p-2');
        var removePark = $('<button>').attr('type', 'button').addClass('remove bg-danger m-2 text-bold rounded');
        parkLi.text(park.title);
        removePark.text('X');
        
        parksSelectList.append(parkLi);
        parkLi.append(removePark);
    }
    )
}

function removePark (event) {
    event.stopPropagation();
    console.log('yup, you clicked it');
    var index = event.target.parentElement.getAttribute('data-index');
    parksArray.splice(index, 1);
    localStorage.removeItem(JSON.stringify(index));
    event.target.parentElement.remove(index);
}

function mapIt (event) {
    event.stopPropagation();

    var startingAdd = startingInput.val()
    localStorage.setItem(JSON.stringify('startPoint'), JSON.stringify(startingAdd))
    window.location.href = './index.html'
}

$( function() {
    $(parksSelectList).sortable();
  } );

parksEl.on('click', '.park-div', addPark);
statesEl.on('click', searchNPS);
parksSelectEl.on('click', '.remove', removePark);
mapButtonEl.on('click', '.map', mapIt)

parkRender();