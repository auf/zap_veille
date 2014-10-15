 
$(function() {
	/*$('.pdfview').each (function(i) {
    $(this)
    $(this).replaceWith('<h2><a href="'+$(this).attr('href')+'">'+$(this).text()+'</a></h2><iframe src="http://docs.google.com/viewer?url='+$(this).attr('href')+'&#038;embedded=true" width="500" height="250" style="border: none;"></iframe>');
});*/
	 $( "#mention_legal" ).enhanceWithin().popup();
	racine ="http://www.veille.univ-ap.info/media/";
	
	if(typeof(Storage) !== "undefined") {
   		 if(typeof(sessionStorage.recherche) == "undefined"){
			//Quand user clique sur le bouton recherche , recherche = true
		 	sessionStorage.recherche = false;
		 }
		 
		 if(typeof(sessionStorage.urlnews) == "undefined" || (sessionStorage.urlnews == 'null') ){
		 	sessionStorage.urlnews = "http://www.veille.univ-ap.info/news/api/?categorie=2&page=1&statut=Publié&ordering=-date_debut";
		 }

		if(typeof(sessionStorage.urlagenda) == "undefined" || (sessionStorage.urlagenda == 'null') ){
		 	sessionStorage.urlagenda = "http://www.veille.univ-ap.info/news/api/?categorie=5&page=1&statut=Publié&ordering=-date_debut";
		 }
		 
		 if(typeof(sessionStorage.urlappel) == "undefined" || (sessionStorage.urlappel == 'null') ){
		 	sessionStorage.urlappel = "http://www.veille.univ-ap.info/news/api/?categorie=6&page=1&statut=Publié&ordering=-date_fin";
		 }	
	 
	 
		 
		/* if(typeof(localStorage.premierefois)=="undefined"){
		 	localStorage.premierefois = true;
			document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block';
		 }*/
	} else {
   		 alert('Votre navigateur ne supporte pas les coockies');
	}
	// code insertion entete, bouton légale et logo
	if (navigator.appVersion.indexOf("Mac OS")!=-1){
		$('[data-role="header"]').prepend('<div style="background-color: #ababab;top:0px;" id="transparent_header" class="ios-detected">   &nbsp;</div>	<a href="#mention_legal" data-icon="grid" data-rel="popup" class="ui-btn-right ui-btn ui-icon-grid  ui-corner-all ui-btn-icon-notext" data-iconpos="right" data-transition="pop" style="position:absolute;top:30px"></a><div id=""><div class="logo"><img src="images/logo.png" />	</div></div> ');	
	}else{
		$('[data-role="header"]').prepend('<a href="#mention_legal" data-icon="grid" data-rel="popup" class="ui-btn-right ui-btn ui-icon-grid  ui-corner-all ui-btn-icon-notext" data-iconpos="right" data-transition="pop"></a><div id=""><div class="logo"><img src="images/logo.png" />	</div></div> ');
	}
	
	// code insertion popup
	//$('[data-role="page"]').prepend(legal).page();
	$(document).on("scrollstop",function(){
		page = $.mobile.activePage.attr("id");
		//alert(page);
		if (page == "agenda"){
			//alert($(document).scrollTop() + " " + $(document).height() + " " + $('#agenda').height());
			if ( $(window).scrollTop() + $(window).height() > $('#agenda').height() - 180 && !isLoading) {
			   //alert("go 11");
			   if(sessionStorage.urlagenda!='null'){
				ajaxNews(5); //get Agenda
			   }else{
				//$('#loadingagenda').html('<h2 >Aucune données à télécharger</h2>');
			   }
			}		
		}else 	if (page == "appel"){
			//alert($(window).scrollTop() + " " + $(window).height() + " " + $('#appel').height());
			//alert(typeof(sessionStorage.urlagenda) + " " + sessionStorage.urlagenda);
			if ($(window).scrollTop() + $(window).height() > $('#appel').height() - 180 && !isLoading) {
				//alert("go 11");
			   if(sessionStorage.urlappel!='null'){
				ajaxNews(6); //get Appel
			   }else{
				//$('#loadingappel').html('<h2 >Aucune données à télécharger</h2>');
			   }
			}		
		} else 	if (page == "index"){
			//alert($('#news').height() + ' - ' + $(window).scrollTop() + ' - ' +  $(window).height());
			if ($(window).scrollTop() + $(window).height() > $('#news').height() - 100 && !isLoading ) {
			
			  	sessionStorage.recherche = false;
				
			   if(sessionStorage.urlnews!='null'){
				ajaxNews(2); //get News
			   }else{
				   
				//$('#loading').html('<h2 >Aucune données à télécharger</h2>');
			   }
			}		
		}
	});


	var viewport = {
	    width  : $(window).width(),
	    height : $(window).height()
	};
	
	
	isLoading = false;
	//ajaxInit(2);
	ajaxNews(2);	ajaxNews(5);	ajaxNews(6);
	ajaxSA();
	
	
   $(document).on('tap','#listnews li ', function () {
           
		siteweb = $(this).attr('data-title');
		var frame ='<div class="scroll-wrapper"><IFRAME id="frameId" src="'+siteweb+'" width="100%"  scrolling=auto frameborder=1 > </IFRAME></div>';
		var theframe = $(frame);
		//theframe.appendTo($("#contenusite"));		
		$("#contenusite").html(theframe);
		$.mobile.initializePage();		
		$.mobile.changePage('#details', "up", true, true);
		$("#frameId").load(function() {
			$(this).height( viewport.height );
		});
		$('body').find('#details').page();
						
    });   
    
      $(document).on('tap','#listagenda li ', function () {
           
		siteweb = $(this).attr('data-title');
		var frame ='<div class="scroll-wrapper"><IFRAME id="frameId" src="'+siteweb+'" width="300"  scrolling=auto frameborder=1 > </IFRAME></div>';
		var theframe = $(frame);
		//theframe.appendTo($("#contenusite"));		
		$("#contenusite").html(theframe);
		$.mobile.initializePage();		
		$.mobile.changePage('#details', "up", true, true);
		$("#frameId").load(function() {
			$(this).height( viewport.height );
			//$(this).width( viewport.width );
		});
		$('body').find('#details').page();
						
    });   
    
    $(document).on('tap','#listappel li ', function () {
           
		siteweb = $(this).attr('data-title');
		var frame ='<div class="scroll-wrapper"><IFRAME id="frameId" src="'+siteweb+'" width="100%"  scrolling=auto frameborder=1 > </IFRAME></div>';
		var theframe = $(frame);
		//theframe.appendTo($("#contenusite"));		
		$("#contenusite").html(theframe);
		$.mobile.initializePage();		
		$.mobile.changePage('#details', "up", true, true);
		$("#frameId").load(function() {
			$(this).height( viewport.height );
		});
		$('body').find('#details').page();
						
    });       
    
    /*
   $(document).on('tap','.test1 li', function () {
           	if(sessionStorage.urlnews =='null'){
				sessionStorage.recherche = true; 
			}
			ajaxNews(2);
			ajaxSA();
		
        });   
 $('#enregistrer_repertoire').bind( "tap", add_membre );	
  */
	
});

function ajaxSA(){
	
	var url = 'http://www.veille.univ-ap.info/veille/api_sa/?format=jsonp';

	 $.ajax({
		type: 'GET',
		dataType: "jsonp",
		url: url,
		timeout:30000 ,
		crossDomain: true,
		jsonp: 'callback', 
		cache: false,
		success: function (responseData, textStatus, jqXHR) {			
		
			var data = responseData.results;
			
  			for(i=0;i<data.length;i++ ){
				
				var resultat = '<div> '+data[i].contenu_mobile+'</div>';
				data[i].pays = data[i].pays.replace(' ','').toLowerCase();
				
				$('#systeme_contenu_'+data[i].pays).html(resultat);
				$('body').find('#systeme_'+data[i].pays).page();
			
				
			}
				
			

		},
		error: function (responseData, textStatus, errorThrown) {
				
			if(textStatus == 'timeout')
			{     
				alert('Vérifiez votre connexion internet'); 
				//do something. Try again perhaps?
			}
		}
		});
}

function ajaxInit(categorieID){
	
	isLoading = true;
	//$("#loading").show();
	// url = urlnews+'&format=jsonp';	
	var url = sessionStorage.urlnews;
	url = "";
	if (categorieID==2){  //news	
		$("#loading").show();
		if((sessionStorage.urlnews =='null')){
			sessionStorage.urlnews = "http://www.veille.univ-ap.info/news/api/?ordering=-date_debut&statut=Publié&categorie=" + categorieID + "&page=1"; 
		}
		url = sessionStorage.urlnews;
	}
	
	if (categorieID==5){
		$("#loadingagenda").show();
		if((sessionStorage.urlagenda =='null')){
			sessionStorage.urlagenda = "http://www.veille.univ-ap.info/news/api/?ordering=-date_debut&statut=Publié&categorie=" + categorieID + "&page=1"; 
		}
		url = sessionStorage.urlagenda;
	}
	
	if (categorieID==6){
		$("#loadingappel").show();
		if((sessionStorage.urlappel =='null')){
			sessionStorage.urlappel = "http://www.veille.univ-ap.info/news/api/?ordering=-date_fin&statut=Publié&categorie=" + categorieID + "&page=1"; 
			
		}
		url = sessionStorage.urlappel;
	}
	
	var isRecherche = sessionStorage.recherche;
	var resultat = '';
	
	 $.getJSON(url, function(datas){
	 	var data =  datas.results;
		for(i=0;i<data.length;i++ ){
			extrait = data[i].extrait_contenu.split(' ',20);
			extrait = extrait.join(' ');
			titre = data[i].titre.split(' ',20);
			titre = titre.join(' ');
			
			if (categorieID==2){ //actulites
				if(data[i].images!=''){var img = '<img src="'+racine+data[i].images+'">';}else{var img ='<div > &nbsp;</div>';}
				resultat+= '<li data-title="'+data[i].lien_vers_site+'"><a href="#"   data-ajax="false">'+img+' <h2>'+titre+'</h2><h2 class="pour_grand_ecran">'+data[i].titre+'</h2><p >'+extrait+'</p></a> </li>';

			}else if (categorieID==5){ //Agenda
				resultat+= '<li data-title="'+data[i].lien_vers_site+'"><a href="#"   data-ajax="false">'+' <h2>'+titre+'</h2><h2 class="pour_grand_ecran">'+data[i].titre+'</h2><p >'+data[i].date_debut.substring(8,10)+ '-' +data[i].date_debut.substring(5,7)+ '-' + +data[i].date_debut.substring(0,4)+ '</p></a> </li>';

			}else if (categorieID==6){ //Appel d'offre
				resultat+= '<li data-title="'+data[i].lien_vers_site+'"><a href="#"   data-ajax="false">'+' <h2>'+titre+'</h2><h2 class="pour_grand_ecran">'+data[i].titre+'</h2><p >Date limite : '+data[i].date_fin.substring(8,10)+ '-' +data[i].date_fin.substring(5,7)+ '-' + +data[i].date_fin.substring(0,4)+ '</p></a> </li>';
			}
	
		}
		
		
		 	// $("#listnews").append(resultat).addClass('listnews');
			if (categorieID==2){
				$("#listnews").append(resultat).listview();
				$("#loading").hide();
				sessionStorage.urlnews =  datas.next;
				ajaxInit(5);
			}else if (categorieID==5){
				$("#listagenda").append(resultat).listview();
				$("#loadingagenda").hide();
				sessionStorage.urlagenda =  datas.next;
				ajaxInit(6);				
			}else if (categorieID==6){

				$("#listappel").append(resultat).listview();
				$("#loadingappel").hide();
				sessionStorage.urlappel =  datas.next;					
			}	
		 isLoading = false;		
		 sessionStorage.recherche = false;
	 });
}

function ajaxNews(categorieID){
	root = "http://www.veille.univ-ap.info/news/";
	isLoading = true;
	//$("#loading").show();
	// url = urlnews+'&format=jsonp';	
	var url = sessionStorage.urlnews;
	url = "";
	if (categorieID==2){  //news	
		$("#loading").show();
		if((sessionStorage.urlnews =='null')){
			sessionStorage.urlnews = "http://www.veille.univ-ap.info/news/api/?ordering=-date_debut&statut=Publié&categorie=" + categorieID + "&page=1"; 
		}
		url = sessionStorage.urlnews;
	}
	
	if (categorieID==5){
		$("#loadingagenda").show();
		if((sessionStorage.urlagenda =='null')){
			sessionStorage.urlagenda = "http://www.veille.univ-ap.info/news/api/?ordering=-date_debut&statut=Publié&categorie=" + categorieID + "&page=1"; 
		}
		url = sessionStorage.urlagenda;
	}
	
	if (categorieID==6){
		$("#loadingappel").show();
		if((sessionStorage.urlappel =='null')){
			sessionStorage.urlappel = "http://www.veille.univ-ap.info/news/api/?ordering=-date_fin&statut=Publié&categorie=" + categorieID + "&page=1"; 
			
		}
		url = sessionStorage.urlappel;
	}
	
	var isRecherche = sessionStorage.recherche;
	var resultat = '';
	
	 $.getJSON(url, function(datas){
	 	var data =  datas.results;
		for(i=0;i<data.length;i++ ){
			extrait = data[i].extrait_contenu.split(' ',20);
			extrait = extrait.join(' ');
			titre = data[i].titre.split(' ',20);
			titre = titre.join(' ');
			
			if (categorieID==2){ //actulites
				if(data[i].images!=''){var img = '<img src="'+racine+data[i].images+'">';}else{var img ='<img src="images/ico_news.png">';}
				if(data[i].type_news == 1){
				resultat+= '<li data-title="'+root+data[i].slug+'/"><a href="#"   data-ajax="false">'+img+' <h2>'+titre+'</h2><h2 class="pour_grand_ecran">'+data[i].titre+'</h2><p >'+extrait+'</p></a> </li>';
				}else{
				resultat+= '<li data-title="'+data[i].lien_vers_site+'"><a href="#"   data-ajax="false">'+img+' <h2>'+titre+'</h2><h2 class="pour_grand_ecran">'+data[i].titre+'</h2><p >'+extrait+'</p></a> </li>';

				}
			}else if (categorieID==5){ //Agenda
				resultat+= '<li data-title="'+data[i].lien_vers_site+'"><a href="#"   data-ajax="false">'+' <h2>'+titre+'</h2><h2 class="pour_grand_ecran">'+data[i].titre+'</h2><p >'+data[i].date_debut.substring(8,10)+ '-' +data[i].date_debut.substring(5,7)+ '-' + +data[i].date_debut.substring(0,4)+ '</p></a> </li>';
			}else if (categorieID==6){ //Appel d'offre
				resultat+= '<li data-title="'+data[i].lien_vers_site+'"><a href="#"   data-ajax="false">'+' <h2>'+titre+'</h2><h2 class="pour_grand_ecran">'+data[i].titre+'</h2><p >Date limite : '+data[i].date_fin.substring(8,10)+ '-' +data[i].date_fin.substring(5,7)+ '-' + +data[i].date_fin.substring(0,4)+ '</p></a> </li>';
			}
	
		}
		
		//$("#loading").hide();
		
		 if(isRecherche=='true' && categorieID==2){
			
		//	$("#listnews").html(resultat).addClass('listnews');
			$("#listnews").html(resultat).listview();
			$("#loading").hide();
		 }else{
		 	// $("#listnews").append(resultat).addClass('listnews');
			if (categorieID==2){
				$("#loading").hide();
				sessionStorage.urlnews =  datas.next;
				$("#listnews").append(resultat).listview();

			}else if (categorieID==5){
				$("#loadingagenda").hide();
				$("#listagenda").append(resultat).listview("refresh");
				//$("#listagenda").append(resultat).listview();
				sessionStorage.urlagenda =  datas.next;				
			}else if (categorieID==6){
				$("#loadingappel").hide();
				
				//$("#listappel").append(resultat).addClass('listappel');
				$("#listappel").append(resultat).listview("refresh");
				//$("#listappel").listview().listview("refresh");
				sessionStorage.urlappel =  datas.next;				
			}	
			
		 }
		 isLoading = false;		
		 sessionStorage.recherche = false;
	 });
	
}



function rechercher(){
	 
	 if ($('#searchinput1').val() != ''){
		sessionStorage.urlnews = 'http://www.veille.univ-ap.info/news/api/?ordering=-date_debut&statut=Publié&categorie=2&titre='+$('#searchinput1').val();
	}else{
		sessionStorage.urlnews = 'http://www.veille.univ-ap.info/news/api/?ordering=-date_debut&statut=Publié&categorie=2';	
	}
	 sessionStorage.recherche = true;
	 ajaxNews(2);

}
