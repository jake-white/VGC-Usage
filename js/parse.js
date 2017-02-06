var names = [], usages = [];

var moves = [], abilities = [], items = [];

var currentMon = 1;

var formes = {"porygon-z":"474",
"jangmo-o":"782", 
"hakamo-o":"783", 
"kommo-o":"784", 
"oricorio-pom-pom":"741-1",
"oricorio-pa'u":"741-2",
"oricorio-sensu":"741-3",
"type:null":"772",
"lycanroc-midnight":"745-1",
"lycanroc-midday":"745",
"zygarde-10%":"718-1",
"zygarde-complete":"718-4",};

$( document ).ready(function() {
    rateChange();
});

var rateChange = function(){
  month = $('#month').val();
  var monthFile = month + '.txt';
  var monthMoveFile = month + '-moves.txt'
  $.get(monthFile, function(data) {
    var dataset = data.split('\n');
    parseMons(dataset) 
  }, 'text');

  $.get(monthMoveFile, function(data) {
    parseMoves(data)
  }, 'text');
}

var parseMons = function(data){
 	var rank = 0;
  $('#tbl1.tbl-body ').empty();
 	for(var i = 5; i < data.length-2; ++i){
 		++rank;
 		var name_start = 10, name_end = 28;
 		var usage_start = 31, usage_end = 40;
 		names[i] = data[i].substring(name_start, name_end).trim();
 		usages[i] = data[i].substring(usage_start, usage_end).trim();
    var shorten = names[i].replace(/ /g,'').toLowerCase();
    if(shorten.includes("-alola")){
      shorten = shorten.substring(0, 
      shorten.indexOf("-alola"));
      dexNumber = dexNums[shorten].num +"-1";
    }
    else if(formes[shorten] != undefined) {
      dexNumber = formes[shorten];
    }
    else if(shorten.includes("silvally")){
      shorten = "silvally";
      dexNumber = dexNums[shorten].num;
    } 
    else dexNumber = dexNums[shorten].num;

    usages[i] = parseFloat(usages[i]).toFixed(2);
 		$('#tbl1.tbl-body ').append("<tr id = " + rank + " class = trChild>\
          <td class = rankTD>" + rank + "</td>\
          <td class = nameTD><img style = 'vertical-align: middle' src=sprites/" + dexNumber + ".png>" + names[i] + "</img></td>\
          <td class = percentTD>" + usages[i] + "</td>\
        	</tr>");
    var id = rank
    handleElement(id);
 	}
}

function handleElement(id) {
    $('#'+id).children().click(function(){
      display(id);
    })
}

var parseMoves = function(data){
 	var rank = 0;
  abilities = parseThing(data, "Abilities");
  moves = parseThing(data, "Moves");
  items = parseThing(data, "Items");
  spreads = parseThing(data, "Spreads");
  teammates = parseThing(data, "Teammates");
  display(currentMon);
}

var parseThing = function(data, splitter){
  things = [];
  data = data.split(splitter);
  for(var i = 1; i < data.length; ++i){
    data[i] = data[i].substring(data[i].indexOf("\n") + 1, data[i].indexOf("+----------------------------------------+"));
    data[i] = data[i].split('\n');
    things[i] = [];
    for(var j = 0; j < data[i].length; ++j){
      var name_start = 2, name_end = 42;
      things[i][j] = data[i][j].substring(name_start, name_end).trim();
    }
  }
  return things;
}


var display = function(mon){
  $('#'+currentMon).css("background-color","");
  $('#'+mon).css("background-color","#e64946");
  currentMon = mon;
  $('#tbl2.tbl-body').html("");
  var lengths = [moves[mon].length, abilities[mon].length, items[mon].length, spreads[mon].length, teammates[mon].length]; //I am lazy and need the longest list
  lengths.sort(function(a, b){return a-b});
  for(var i =0; i < lengths[lengths.length-1] - 1; ++i){
  if(moves[mon][i] == undefined) moves[mon][i] = "";
  if(abilities[mon][i] == undefined) abilities[mon][i] = "";
  if(items[mon][i] == undefined) items[mon][i] = "";
  if(spreads[mon][i] == undefined) spreads[mon][i] = "";
  if(teammates[mon][i] == undefined) teammates[mon][i] = "";
   $('#tbl2.tbl-body').append("<tr>\
            <td>" + moves[mon][i] + "</td>\
            <td>" + abilities[mon][i] + "</td>\
            <td>" + items[mon][i] + "</td>\
            <td>" + spreads[mon][i] + "</td>\
            <td>" + teammates[mon][i] + "</td>\
            </tr>");
  }
}