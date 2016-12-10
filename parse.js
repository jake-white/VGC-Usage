$.get('vgc2017-1760.txt', function(data) {
	var dataset = data.split('\n');
 	parseMons(dataset) }, 'text');

$.get('moveset-vgc2017-1760.txt', function(data) {
	var dataset = data.split("Moves");
	console.log(dataset);
 	parseMoves(dataset) }, 'text');

var names = [], usages = [];

 var parseMons = function(data){
 	var rank = 0;
 	for(var i = 5; i < data.length-2; ++i){
 		++rank;
 		var name_start = 10, name_end = 28;
 		var usage_start = 31, usage_end = 40;
 		names[i] = data[i].substring(name_start, name_end).trim();
 		usages[i] = data[i].substring(usage_start, usage_end).trim();
 		$('.tbl-body').append("<tr>\
          <td>" + rank + "</td>\
          <td>" + names[i] + "</td>\
          <td>" + usages[i] + "</td>\
        	</tr>");
 	}
 }

  var parseMoves = function(data){
 	var rank = 0;
 	for(var i = 5; i < data.length-2; ++i){
 		++rank;
 		var name_start = 10, name_end = 28;
 		var usage_start = 31, usage_end = 40;
 		names[i] = data[i].substring(name_start, name_end).trim();
 		usages[i] = data[i].substring(usage_start, usage_end).trim();
 		$('.tbl-body').append("<tr>\
          <td>" + rank + "</td>\
          <td>" + names[i] + "</td>\
          <td>" + usages[i] + "</td>\
        	</tr>");
 	}
 }