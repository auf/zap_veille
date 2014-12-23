 
$(function() {

	$( "#menuapp" ).enhanceWithin().popup();
	
	
	racine ="http://www.veille.univ-ap.info/media/";
	racineSiteWeb = "http://www.veille.univ-ap.info/";
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	current_date = year + "-" + month + "-" + day;
	
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
		 	sessionStorage.urlappel = "http://www.veille.univ-ap.info/news/api/?categorie=6&page=1&date_fin_gte="+current_date+"&ordering=-date_fin";
		 }

	} else {
   		 alert('Votre navigateur ne supporte pas les coockies');
	}
	// code insertion entete, bouton légale et logo
	if (navigator.appVersion.indexOf("Mac OS")!=-1){
		$('.headerpage').find('a').remove();
		$('[data-role="header"]').prepend('<div style="background-color: #ababab;top:0px;" id="transparent_header" class="ios-detected">   &nbsp;</div>	<a href="#menuapp" data-icon="grid" data-rel="popup" class="ui-btn-right ui-btn ui-icon-grid  ui-corner-all ui-btn-icon-notext" data-iconpos="right" data-transition="pop" style="position:absolute;top:30px"></a><div class="logo paddingleft"><img src="images/logo.png" />	</div> ');			
		$('.headerpage').append('<a style="position:absolute;top:30px"  data-role="button" data-rel="back" data-transition="slide" data-icon="arrow-l" data-iconpos="left" class="ui-btn-left ui-btn ui-icon-arrow-l  ui-corner-all ui-btn-icon-notext"  > Retour </a>');
		// mettre le logo a gauche.
		$('#apps-header .logo').removeClass('paddingleft');
		$('#headeragenda .logo').removeClass('paddingleft');
		$('#headerrepertoire .logo').removeClass('paddingleft');
		$('#headersystemevietnam .logo').removeClass('paddingleft');
		$('#headersystemecambodge .logo').removeClass('paddingleft');
		$('#headersystemelaos .logo').removeClass('paddingleft');
		$('#headersystemevanuatu .logo').removeClass('paddingleft');
		$('#headerdossier .logo').removeClass('paddingleft');
		
	}else{
		$('[data-role="header"]').prepend('<a href="#menuapp" data-icon="grid" style="margin-right:10px;" data-rel="popup" class="ui-btn-right ui-btn ui-icon-grid  ui-corner-all ui-btn-icon-notext" data-iconpos="right" data-transition="pop" ></a><div id=""><div class="logo paddingleft"><img src="images/logo.png" />	</div></div> ');
		$('#apps-header .logo').removeClass('paddingleft');
		$('#headeragenda .logo').removeClass('paddingleft');
		$('#headerrepertoire .logo').removeClass('paddingleft');
		$('#headersystemevietnam .logo').removeClass('paddingleft');
		$('#headersystemecambodge .logo').removeClass('paddingleft');
		$('#headersystemelaos .logo').removeClass('paddingleft');
		$('#headersystemevanuatu .logo').removeClass('paddingleft');	
		$('#headerdossier .logo').removeClass('paddingleft');		
	}
	
	
	// code insertion popup

	$(document).on("scrollstop",function(){
		page = $.mobile.activePage.attr("id");

		if (page == "agenda"){

			if ( $(window).scrollTop() + $(window).height() > $('#agenda').height() - 180 && !isLoading) {
			   //alert("go 11");
			   if(sessionStorage.urlagenda!='null'){
				ajaxNews(5,0); //get Agenda
			   }else{
				//$('#loadingagenda').html('<h2 >Aucune données à télécharger</h2>');
			   }
			}		
		}else 	if (page == "appel"){
			if ($(window).scrollTop() + $(window).height() > $('#appel').height() - 180 && !isLoading) {
				//alert("go 11");
			   if(sessionStorage.urlappel!='null'){
				ajaxNews(6,0); //get Appel
			   }else{
				//$('#loadingappel').html('<h2 >Aucune données à télécharger</h2>');
			   }
			}		
		} else 	if (page == "index"){
			if ($(window).scrollTop() + $(window).height() > $('#news').height() - 100 && !isLoading ) {
			
			  	sessionStorage.recherche = false;
				
			   if(sessionStorage.urlnews!='null'){
				ajaxNews(2,0); //get News
			   }else{

			   }
			}		
		}
	});


	var viewport = {
	    width  : $(window).width(),
	    height : $(window).height()
	};
	
	
	isLoading = false;
	
	ajaxNews(2,0);
	ajaxNews(5,0);
	ajaxNews(6,0);
	dossier_thematique();
	ajaxSA();
	
	$(document).on('tap','.listpdf li', function () {
        
		pdf = $(this).attr('data-title')+'&embedded=true';
		
		frame ='<div class="scroll-wrapper"><IFRAME id="framepdf" src="http://docs.google.com/gview?url='+pdf+'" width="100%"  scrolling=auto frameborder=0 > </IFRAME></div>';
		theframe = $(frame);

		$("#pdf_contenu").html(theframe);
		$.mobile.initializePage();		
		$.mobile.changePage('#pdfview', "up", true, true);

		
		$("#framepdf").load(function() {
			$(this).height( viewport.height );
		});
		$('body').find('#pdfview').page();
		
	});  
	
	$(document).on('tap','#listnews li', function () {
           
		siteweb = $(this).attr('data-title');
		var frame ='<div class="scroll-wrapper"><IFRAME id="frameId" src="'+siteweb+'" width="100%"  scrolling=auto frameborder=1 > </IFRAME></div>';
		var theframe = $(frame);
	
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
	
		$("#contenusite").html(theframe);
		$.mobile.initializePage();		
		$.mobile.changePage('#details', "up", true, true);
		$("#frameId").load(function() {
			$(this).height( viewport.height );
		});
		$('body').find('#details').page();
						
	});   
    
	
	$(document).on('tap','#listappel li ', function () {
           
		siteweb = $(this).attr('data-title');
		var frame ='<div class="scroll-wrapper"><IFRAME id="frameId" src="'+siteweb+'" width="100%"  scrolling=auto frameborder=1 > </IFRAME></div>';
		var theframe = $(frame);
	
		$("#contenusite").html(theframe);
		$.mobile.initializePage();		
		$.mobile.changePage('#details', "up", true, true);
		$("#frameId").load(function() {
			$(this).height( viewport.height );
		});
		$('body').find('#details').page();
						
	});
    
	$(document).on('tap','#listdossier li ', function () {
	
		// eviter on-click event declancher 2 fois
	        $('#ul_liste_article_dossier li ').css('pointer-events', 'none');
		$('#ul_liste_article_dossier ').css('pointer-events', 'none');
  
		setTimeout(function(){
			$('#ul_liste_article_dossier ').css('pointer-events', 'auto');}, 500);
			
		setTimeout(function(){
			$('#ul_liste_article_dossier li ').css('pointer-events', 'auto');}, 500);
			
		$('#liste_article_dossier').find('h1').html($(this).find('a').html());   
		ajaxNews(7,$(this).attr('data-title')); 
		
						
	}); 
    
	$(document).on('tap','#ul_liste_article_dossier li ', function () {
		// eviter on-click event declancher 2 fois et sur la page suivant
	        $('#contenue_details_article_dossier ').css('pointer-events', 'none');

		setTimeout(function(){
			$('#contenue_details_article_dossier ').css('pointer-events', 'auto');}, 500);		
		
		$('#header_details_article_dossier').find('h1').html($(this).find('h2').html());      
		load_article_thematique($(this).attr('data-title'));
				
    });       

});

function ajaxSA(){
	
	var url = racineSiteWeb+'veille/api_sa/?format=jsonp';

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
				loadpdf(data[i].id, data[i].pays);
				$('#systeme_contenu_'+data[i].pays).append(resultat);
				$('body').find('#systeme_'+data[i].pays).page();
				
				
			}
				
			

		},
		error: function (responseData, textStatus, errorThrown) {
				
			if(textStatus == 'timeout')
			{     
				alert('Vérifiez votre connexion internet'); 
			}
		}
		});
}



function ajaxNews(categorieID,categorieDossier){
	var root = "http://www.veille.univ-ap.info/news/";
	isLoading = true;

	
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth() + 1;
	var year = currentDate.getFullYear();
	current_date = year + "-" + month + "-" + day;	
	
	if (categorieID==2){  //news	
		$("#loading").show();
		if((sessionStorage.urlnews =='null')){
			sessionStorage.urlnews = root+ "api/?ordering=-date_debut&statut=Publié&categorie=" + categorieID + "&page=1"; 
		}
		url = sessionStorage.urlnews;
	}
	
	if (categorieID==5){ //agenda
		$("#loadingagenda").show();
		if((sessionStorage.urlagenda =='null')){
			sessionStorage.urlagenda = root+"api/?ordering=-date_debut&statut=Publié&categorie=" + categorieID + "&page=1"; 
		}
		url = sessionStorage.urlagenda;
	}
	
	if (categorieID==6){ // appel d'offre
		$("#loadingappel").show();
		if((sessionStorage.urlappel =='null')){
			sessionStorage.urlappel = root+ "api/?ordering=-date_fin&statut=Publié&categorie=" + categorieID + "&date_fin_gte="+current_date+"&page=1"; 
			
		}
		url = sessionStorage.urlappel;
	}
	if (categorieID==7){

		url = root+ "api/?ordering=-date_fin&statut=Publié&categorie=" + categorieID + "&page=1&page_size=50&categorie_dossier="+categorieDossier; 
	
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
			}else if (categorieID==7){ //dossier thematique
				//var datas={"contenuarticle":data[i].contenu};
				resultat+= '<li data-title ="'+data[i].id+'"><a href="#"   data-ajax="false">'+' <h2>'+data[i].titre+'</h2> <h2 class="pour_grand_ecran">'+data[i].titre+'</h2><p >'+extrait+'</p></a> </li>';
			}
	
		}
		
	
		 if(isRecherche=='true' && categorieID==2){
			
			$("#listnews").html(resultat).listview();
			$("#loading").hide();
		 }else{

			if (categorieID==2){
				$("#loading").hide();
				sessionStorage.urlnews =  datas.next;
				$("#listnews").append(resultat).listview();

			}else if (categorieID==5){
				$("#loadingagenda").hide();
				$("#listagenda").append(resultat).listview("refresh");
				sessionStorage.urlagenda =  datas.next;				
			}else if (categorieID==6){
				$("#loadingappel").hide();
				$("#listappel").append(resultat).listview("refresh");
				sessionStorage.urlappel =  datas.next;				
			}else if(categorieID==7){
				$.mobile.changePage('#liste_article_dossier', "slide", true, true);
				$("#ul_liste_article_dossier").html(resultat).listview("refresh");
				
				$('body').find('#liste_article_dossier').page();
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
	 ajaxNews(2,0);

}
function loadpdf(codesa,pays){
	var url =  "http://outils.vn.auf.org/veille/api_pj/?systeme_academique="+codesa+"&format=jsonp";
	
	$.ajax({
		type: 'GET',
		dataType: "jsonp",
		url: url,
		timeout:30000 ,
		crossDomain: true,
		jsonp: 'callback', 
		cache: false,
		success: function (responseData, textStatus, jqXHR) {			
			var racinePdf = 'http://www.veille.univ-ap.info/media/';
			var data = responseData.results;
			var listpdf ='';
  			for(i=0;i<data.length;i++ ){
				
				listpdf += '<li data-ajax="false" data-title="'+racinePdf+data[i].fichier+'"><a href="#" > '+data[i].titre+' </a></li>';
			}
			$('#listpdf'+pays).html(listpdf).listview('refresh');	
			

		},
		error: function (responseData, textStatus, errorThrown) {
				
			if(textStatus == 'timeout')
			{     
				alert('Vérifiez votre connexion internet'); 
			}
		}
		});
	
	
	
}
function dossier_thematique(){
	var url = racineSiteWeb+ "news/api_category_dossier/?format=jsonp";
	
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
			var listcategorie ='';
  			for(i=0;i<data.length;i++ ){
				 listcategorie += '<li data-title="'+data[i].id+'"><a  href="#">'+'<h2>'+data[i].titre+'</h2>' +'<h2  class="pour_grand_ecran">'+data[i].titre+'</h2> </a></li>';
			}
			$('#listdossier').html(listcategorie).listview('refresh');	
			

		},
		error: function (responseData, textStatus, errorThrown) {
				
			if(textStatus == 'timeout')
			{     
				alert('Vérifiez votre connexion internet'); 
			}
		}
		});
}
function load_article_thematique(idarticle){
	
	var url = racineSiteWeb + "news/api/?id="+idarticle;
	$.ajax({
		type: 'GET',
		dataType: "jsonp",
		url: url,
		timeout:30000 ,
		crossDomain: true,
		jsonp: 'callback', 
		cache: false,
		success: function (responseData, textStatus, jqXHR) {			
			var racinePdf = 'http://www.veille.univ-ap.info/media/';
			var data = responseData.results;
			var listpdf='';
			
  			$('#contenu_article_dossier').html(data[0].contenu);
			// insertion des pdf
			for(i=1; i<=10; i++){
				var titre = 'titre_fichier'+i;
				var fichier = 'fichier'+i;
				if(data[0][fichier]!=''){
				listpdf += '<li data-ajax="false" data-title="'+racinePdf+data[0][fichier]+'"><a href="#" > '+data[0][titre]+' </a></li>';
				}
			}
			$.mobile.changePage('#details_article_dossier', "slideleft", true, true);
			$('#listpdf_dossier').html(listpdf).listview('refresh');	
			$('#listpdf_dossier').addClass(listpdf);
			

		},
		error: function (responseData, textStatus, errorThrown) {
				
			if(textStatus == 'timeout')
			{     
				alert('Vérifiez votre connexion internet'); 
			}
		}
		});


}
