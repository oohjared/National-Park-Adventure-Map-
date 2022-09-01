var statesEl = $('#states')
var states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE",
"NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]

for (var i = 0; i < states.length; i++) {
    var optionEl = $('<option>');
    optionEl.text(states[i]);
    optionEl.val(states[i]);
    statesEl.append(optionEl);
}

