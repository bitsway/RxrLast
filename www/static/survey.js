
// -------------- If Not synced, Show login
/*function first_page(){
	if ((localStorage.synced!='YES')){
		var url = "#login";
		$.mobile.navigate(url);		
	}
	else{
		var url = "#pageHome";
		$.mobile.navigate(url);		
	}
}
*/


/*function get_login() {
	var url = "#login";
	$.mobile.navigate(url);
	}*/

							
//========================= Longin: Check user
function check_user() {
	
	var cid=$("#cid").val().toUpperCase();
	cid=$.trim(cid);

	//var  apipath_base_photo_dm='http://127.0.0.1:8000/mrepbiopharma/syncmobile_prescription_20170523/dmpath?CID='+cid +'&HTTPPASS=e99business321cba'
	
	var apipath_base_photo_dm='http://e2.businesssolutionapps.com/mrepbiopharma/syncmobile_prescription_rxr/dmpath?CID='+cid +'&HTTPPASS=e99business321cba'
  //var apipath_base_photo_dm ='http://e2.businesssolutionapps.com/welcome/dmpath_live_20150502/get_path?CID='+cid +'&HTTPPASS=e99business321cba'
	
	
	var user_id=$("#user_id").val();
	var user_pass=$("#user_pass").val();
	
	user_id=$.trim(user_id);
	
/*	var base_url='';
	var photo_url='';
	
		localStorage.base_url='';
		localStorage.photo_url='';
		localStorage.photo_submit_url='';
				
		localStorage.territoryListStr='';*/
		
	
	if (user_id=="" || user_id==undefined || user_pass=="" || user_pass==undefined){
		var url = "#login";      
		$.mobile.navigate(url);
		$("#error_login").html("Required User ID and Password");	
	}else{
		//-----------------
		/*localStorage.base_url='';
		localStorage.photo_url='';
		localStorage.photo_submit_url='';*/
		
		//alert(apipath_base_photo_dm);
		$("#loginButton").hide();
		//$("#wait_image_login").show();
		
		//----
		//$("#error_login").html(apipath_base_photo_dm);
			
		$.ajax({
			 type: 'POST',
			 url: apipath_base_photo_dm,
			 success: function(result) {
				 localStorage.result=result; 		
				if (localStorage.result==''){
					$("#wait_image_login").hide();
					$("#loginButton").show();
					$("#error_login").html('Base URL not available');						
				}else{
					var startIndex=localStorage.result.indexOf('<start>')
					var endIndex=localStorage.result.indexOf('<end>')
					var urlResult=localStorage.result.substring(startIndex+7,endIndex);
					localStorage.urlResult=urlResult;
					var resultArray = localStorage.urlResult.split('<fd>');		
					if(resultArray.length==3){
						localStorage.base_url=resultArray[0]
						//photo_url=resultArray[1]
						//photo_submit_url=resultArray[2]
						
						//-------------
						if(localStorage.base_url==''){	
							$("#wait_image_login").hide();
							$("#loginButton").show();
							$("#error_login").html('Base URL not available');	
						}else{
							//--------------------------
							$("#error_login").html("");		
							$("#loginButton").hide();
							
							localStorage.cid=cid;
							localStorage.user_id=user_id;
							localStorage.user_pass=user_pass;  
														
							//alert(localStorage.base_url+'check_user_pharma?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass);
							$.ajax({
									 type: 'POST',
									 url: localStorage.base_url+'check_user_pharma?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+localStorage.user_pass,
									 success: function(result) {
											localStorage.result=result;
											if (localStorage.result==''){
												$("#wait_image_login").hide();
												$("#loginButton").show();
												$("#error_login").html('Sorry Network not available');
												
											}else{							
												var resultArray = localStorage.result.split('<SYNCDATA>');
												localStorage.syncArray=resultArray[0]
												//alert(resultArray);												
												if (localStorage.syncArray=='FAILED'){
													$("#wait_image_login").hide();
													$("#loginButton").show();								
													//$("#error_login").html(resultArray[1]);
													
												}else if (localStorage.syncArray=='SUCCESS'){
													
													localStorage.territoryListStr=resultArray[1];
																	
												
												//	==============Territory List================\
												
												var territoryList=localStorage.territoryListStr.split('<rd>');
																	
												 var territory_str='<ul data-role="listview"  data-inset="true" >';
												  
												  for (i=0;i<territoryList.length;i++){
													  territoryLi=territoryList[i].split("<fd>")
													   var teId=territoryLi[0];												
													   var teName=territoryLi[1];
													   
													   territory_str+='<li style="margin-bottom:1px;" onClick="teWisePres(\''+teId+'\')" ><a>'+teId+'|'+teName+'</a></li>' 
													  						  
												  }	
												  territory_str+='</ul>';
												 						
												$('#territory_list').empty();
												$('#territory_list').append(territory_str).trigger('create');
												
												 var url = "#pageHome";
										 		 $.mobile.navigate(url);	
												}else{	
																								
													$("#wait_image_login").hide();
													$("#loginButton").show();
													$("#error_login").html('Network Timeout. Please try again.');							
												}
											}
											
										  }
								  });//end ajax
								}//base url check
						//alert ('nadira');
						//-------------		
					}else{						
						$("#wait_image_login").hide();
						$("#loginButton").show();
						$("#error_login").html('Login Failed. Please Check CID, UserID, Password.');	
					}
					
				}
			  },
			  error: function(result) {	  
				  $("#wait_image_login").hide();
				  $("#loginButton").show();
				  $("#error_login").html('Network  Timeout. Please Check Internet Connection');	
				
			  }
		});//end ajax
		
		//alert(base_url+','+photo_url+'2');
		
		
		  }//end else	
	}//function


function teWisePres(teId){
	
	localStorage.territoryID=teId;
	//alert(localStorage.base_url+'territory_wise_prescription?cid='+localStorage.cid+'&terriID='+localStorage.territoryID);
	$.ajax({
		 type: 'POST',
		 url: localStorage.base_url+'territory_wise_prescription?cid='+localStorage.cid+'&terriID='+localStorage.territoryID,
		 success: function(result) {
				localStorage.result=result;
				var resultArray = localStorage.result.split('<fd>');											
				if (resultArray[0]=='SUCCESS'){
					
					localStorage.todayCount=resultArray[1];
					localStorage.yesterdayCount=resultArray[2];
					localStorage.monthCount=resultArray[3];
					localStorage.pendingCount=resultArray[4];
					
					$("#todayCount").html(localStorage.todayCount);
					$("#yesterdayCount").html(localStorage.yesterdayCount);
					$("#monthCount").html(localStorage.monthCount);
					$("#pendingCount").html(localStorage.pendingCount);
					
					$("#pendingCount").val(localStorage.pendingCount);
					
					$("#terIdName").html(localStorage.territoryID);
					
					var url = "#page2";
					$.mobile.navigate(url);	
				}
		 }
	})
	
	
	
}
//http://107.167.187.177/biopharma_image/static/prescription_pic/Kst-130_1491392280278.jpg

function pendingBtn(){ 
	$("#terIdNameApp").html(localStorage.territoryID);   
	var pendingCount=$("#pendingCount").val();
	//alert(pendingCount);
	//alert(localStorage.base_url+'pending_prescription?cid='+localStorage.cid+'&territoryID='+localStorage.territoryID);
	$.ajax({
		 type: 'POST',
		 url: localStorage.base_url+'pending_prescription?cid='+localStorage.cid+'&territoryID='+localStorage.territoryID,
		 success: function(result) {
				
				var resultArray = result.split('<fd>');											
				if (resultArray[0]=='SUCCESS'){
					
					localStorage.presHeadId=resultArray[1];
					var presHeadSL=resultArray[2];
					localStorage.pendingImage=resultArray[3];
					localStorage.medStr=resultArray[4];
										
					$("#pendingImage").html("<img style='width:100%;' src='http://107.167.187.177/biopharma_image/static/prescription_pic/"+localStorage.pendingImage+"'/>");
					
					var medList=localStorage.medStr.split('<rd>');
													
					 var med_str='<ul data-role="listview" data-inset="true" class="ui-mini">';
					  
					  for (i=0;i<medList.length;i++){
						  medLi=medList[i].split("|")
						   var medID=medLi[0];												
						   var medName=medLi[1];
						   
						   med_str+='<li data-icon="false" style="margin-bottom:1px;" ><a>'+medID+'|'+medName+'</a></li>' 
												  
					  }	
					  med_str+='</ul>';
											
					$('#medicineID').empty();
					$('#medicineID').append(med_str).trigger('create');
					
					
				}else{
					$("#error").text("Please Check Your Network Connection");
				}
		 }
	})
		 
	var url = "#page3";
	$.mobile.navigate(url);	
};


function approve(){
	$("#reject_btn").hide();
	$("#wait_image_login").show();
	//alert(localStorage.base_url+'approvePrescription?cid='+localStorage.cid+'&territoryID='+localStorage.territoryID+'&id='+localStorage.presHeadId);
	$.ajax({
		 type: 'POST',
		 url: localStorage.base_url+'approvePrescription?cid='+localStorage.cid+'&territoryID='+localStorage.territoryID+'&id='+localStorage.presHeadId,
		 success: function(result) {
				
				//var resultArray = result.split('<fd>');											
				if (result=='SUCCESS'){
					$("#error").text("");
					
					pendingBtn();
					
					$("#reject_btn").show();
					$("#wait_image_login").hide();
				}else{
					$("#error").text("Please Check Your Network Connection");
				}
		 }
	})
}

function reject(){	
	var rejectCause=$("#rejectCause").val();
	if(rejectCause=='' || rejectCause==0){
		$("#error").text("Please Select Value")
	}else{
		
		$("#reject_btn").hide();
		$("#wait_image_login").show();
		
		$.ajax({
			 type: 'POST',
			 url: localStorage.base_url+'rejectPrescription?cid='+localStorage.cid+'&territoryID='+localStorage.territoryID+'&id='+localStorage.presHeadId+'&rejectCause='+localStorage.rejectCause,
			 success: function(result) {
					
					//var resultArray = result.split('<fd>');											
					if (result=='SUCCESS'){	
						$("#error").text("");
						
						pendingBtn();
						
						$("#reject_btn").show();
						$("#wait_image_login").hide();
					}else{
						$("#error").text("Please Check Your Network Connection");
					}
			 }
		})
	}
}


//==============================html script==========================

$(document).ready(function(){
	$("#wait_image_login").hide();
	
	$('#territory_list').empty();
		
	$("#todayCount").html(localStorage.todayCount);
	$("#yesterdayCount").html(localStorage.yesterdayCount);
	$("#monthCount").html(localStorage.monthCount);
	$("#pendingCount").html(localStorage.pendingCount);	
	$("#pendingCount").val(localStorage.pendingCount);	
	$("#terIdName").html(localStorage.territoryID);
	$("#terIdNameApp").html(localStorage.territoryID);   
	
	
	var territoryList=localStorage.territoryListStr.split('<rd>');
																	
	 var territory_str='<ul data-role="listview"  data-inset="true" >';
	  
	  for (i=0;i<territoryList.length;i++){
		  territoryLi=territoryList[i].split("<fd>")
		   var teId=territoryLi[0];												
		   var teName=territoryLi[1];
		   
		   territory_str+='<li style="margin-bottom:1px;" onClick="teWisePres(\''+teId+'\')" ><a>'+teId+'|'+teName+'</a></li>' 
								  
	  }	
	  territory_str+='</ul>';
							
	$('#territory_list').empty();
	$('#territory_list').append(territory_str).trigger('create');
	
	
	//=====================
	
	$("#pendingImage").html("<img style='width:100%;' src='http://107.167.187.177/biopharma_image/static/prescription_pic/"+localStorage.pendingImage+"'/>");
					
	var medList=localStorage.medStr.split('<rd>');
									
	 var med_str='<ul data-role="listview" data-inset="true" class="ui-mini">';
	  
	  for (i=0;i<medList.length;i++){
		  medLi=medList[i].split("|")
		   var medID=medLi[0];												
		   var medName=medLi[1];
		   
		   med_str+='<li data-icon="false" style="margin-bottom:1px;" ><a>'+medID+'|'+medName+'</a></li>' 
								  
	  }	
	  med_str+='</ul>';
							
	$('#medicineID').empty();
	$('#medicineID').append(med_str).trigger('create');
	
	$("#wait_image_login").hide();
	$("#reject_btn").show();			
	
})
	//------
	
