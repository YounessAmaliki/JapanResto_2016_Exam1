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
	doc.flag = "Not Done";
	var json = JSON.stringify(doc);
		
	console.log(json);
	
	$.ajax({
		type:	'PUT',
		url:	'../../' + meal + " " + datestring,
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
        			html += '<tr><td>' + doc.meal + '</td><td>' + doc.amount + '</td><td>' + doc.tablenumber + '</td><td>'+ doc.remarks + '</td><td>' + doc.datestring + '</td><td>' + doc.flag + '</td>' + '<td><button type="button" class="btn btn-success" onClick="editDoc(\'' + doc._id + '\',\'' + doc._rev + '\',\''  + doc.amount + '\',\'' + doc.tablenumber + '\',\'' + doc.remarks + '\',\'' + doc.datestring + '\',\'' + doc.flag +  '\')">Edit</button></td></tr>';;
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

function editDoc(id, rev, meal, amount, tablenumber, remarks, datestring, flag){
	
	$('#output').hide();
	$('#edit').show();
	
	var html = '';
	
	// Build edit form
	html += '<h3>Edit?</h3><table class="table table-hover">';
	html += '<input type="hidden" id="_id" value="' + id + '"/>';
	html += '<input type="hidden" id="_rev" value="' + rev + '"/>';
	html += '<tr><td>Opgeleverd ?</td><td><select id="flag"><option value="1">Done</option><option value="1">Not Done</option></td></tr>';
	html += '<tr><td colspan="2" align="center"><button type="button" class="btn btn-primary" onClick="updateDoc()">Ok</button></td></tr>';
	
	$('#edit').html(html);
}


function updateDoc(){
	
	var id = $("#_id").val();
	var rev = $("#_rev").val();
	var flag = $("#flag :selected").text();
	var meal = $("#meal :selected").text();
	var amount = $("#amount").val();
	var tablenumber = $("#tablenumber").val();
	var remarks = $("#remarks").val();
	var datestring =  $("#datestring").val();
	




	var doc = {};

	doc._id = id;
	doc._rev = rev;
	doc.flag = flag;
	doc.meal = meal;
	doc.amount = amount;
	doc.tablenumber = tablenumber;
	doc.remarks = remarks;
	doc.datestring = datestring;
	var json = JSON.stringify(doc);

	$.ajax({
		type : 'PUT',
		url : '../../' + id,
		data : json,
		contentType : 'application/json',
		async : true,
		success : function(data){
			$('#edit').hide();
			$('#output').show();
			buildOutput();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}


