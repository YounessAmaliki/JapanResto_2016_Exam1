function createDoc(){
	
	var meal = $("#meal :selected").text();
	var amount = $("#amount").val();
	var tablenumber = $("#tablenumber").val();
	var remarks = $("#remarks").val();
	var date = new Date();
	var datestring = date.toLocaleString();
		
	var doc = {};
	
	doc.meal = meal;
	doc.amount = parseInt(amount);
	doc.tablenumber = parseInt(tablenumber);
	doc.remarks = remarks;
	doc.datestring = datestring;
	var json = JSON.stringify(doc);
		
	console.log(json);
	
	$.ajax({
		type:	'PUT',
		url:	'../../' + meal + datestring,
		data:	json,
		contentType: 'application/json',
		async:	true,
		success:function(data){
			buildOutput();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown); 
		}
	});
}

function buildOutput(){
	
	var html = '<table border="1">';
	$.ajax({
		type:	'GET',
		url:	'../../_all_docs?include_docs=true',
        async:  true,
        success:function(data){         	
        	var arr = JSON.parse(data).rows;
        	
        	for(var i=0; i<arr.length; i++){
        		
        		if(arr[i].id.indexOf('_design') == -1){
        			var doc = arr[i].doc;
        			html += '<tr><td>' + doc.meal + '</td><td>' + doc.amount + '</td><td>' + doc.tablenumber + '</td><td>'+ doc.remarks + '</td><td>' + doc.datestring + '</td></tr>';
        		}
        	}
        	html += '</table>';
        	//console.log(html);
        	$('#output').html(html);
        },
		error: function(XMLHttpRequest, textStatus, errorThrown){ 
			console.log(errorThrown); 
		}
	});
}