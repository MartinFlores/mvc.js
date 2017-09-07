function endFunction(nxLoad, cer, callback) {
	wait(function(){
	    	try{
	    		nxLoad.onLoad();
	    	}catch(err){
	    		console.warn('onLoad Function not found in '+cer+' Controller.');
	    	}

	    	try{
	    		if (nx.controllerOnInit)
	    			nx.currentController.onInit[vw]();
	    			
	    	}catch(err){
	    		console.warn('onLoad Function not found in '+cer+' Controller.');
	    	}

	    	

	    	if (callback != undefined)
	    		callback();
	    }, 50);
}



(function ($) {
$.fn.showView = function(url, data, callback) {
	var self = $(this);
	var sView = url.split("/"); 
	var cer = sView[0];
	var vw = sView[sView.length-1]; 
	sView = sView[sView.length-1]+'-view';
	$('.view').hide();
	
    nx.getView(url, function(d) {
    	nx.printView(self, sView, d, function() {
	    	var nxLoad = window[cer+'Controller'];
	    	nx.currentController = nxLoad;
	    	try{
		    	if (nx.currentController.internet == undefined) {
		    		endFunction(nxLoad, cer, callback);
		    	}else{
		    		if (nx.currentController.internet) {
		    			if (navigator.onLine) {
		    				endFunction(nxLoad, cer, callback);
		    			}else{
		    				hash('not_internet');
		    			}
		    		}else{
		    			endFunction(nxLoad, cer, callback);
		    		}
		    	}
	    	}catch(err){
	    		endFunction(nxLoad, cer, callback);
	    	}
	    	

    	});
    	self;
    }, data);
};
})(jQuery);







var nx = {
	views: [],
	header_use: false,
	currentController: null,
	params: null,
	controllerOnInit: false,
	hashBlock: false,
	init: function() {
		// $('body').append('<div id="header-app"></div>');
		$('body').append('<div id="app"></div>');	
		// $('body').append('<div id="select" class="trans3"><ul class="select_box shadow"><li>Día</li><li>01</li><li>02</li></ul></div>');	
		// $('body').append('<div id="footer-app"></div>');	
		// $('head').append('<script src="./js/stats.min.js"></script>');
		if (!nx.header_use) {
			// $('#app').showView('header');
			// $('#footer-app').showView('footer');

			header_use=true;
		}
	},

	login: function() {
		var login = localStorage.getItem('login');
		if (login == null || login == false || login == 'false') {
			return false;
		}else{
			return true;
		}
	},

	objUser: function() {
		var _objUser = localStorage.getItem('objUser');
		if (_objUser == null || _objUser == false || _objUser == 'false') {
			return {
				id: null,
				token: null,
				name: null,
				id_role: null,
				number_phone: null,
				birth_date: null
			};
		}else{
			return JSON.parse(_objUser);
		}
	},
	
	toast: function(text) {
		$('#toast').html(text).css('transform', 'translateY(0)').wait(3000).css('transform', 'translateY(70px)');
	},

	showLoading: function(){
		$('.hideOnLoad').hide();
		$('.showOnLoad').show();
	},

	hideLoading: function(){
		$('.hideOnLoad').show();
		$('.showOnLoad').hide();
	},

	printView: function(self, sView, d, f) {
		// console.log(self);
		if (self.find('#'+sView).length > 0 ) {
			self.find('#'+sView).html(d).show();
		}else{
			self.html(d).show();
		}
    	// self.find('#'+sView).html(d).show();
    	// console.log(self);
		f();
	},

	getView: function(url, f, data) {

		//ex: view/to/path --> path-view
		var sView = url.split("/"); 
		sView = sView[sView.length-1]+'-view';

		//insert if not exist
		if ($('#'+sView).length == 0){
			$('#app').append('<div id="'+sView+'" class="view"></div>');
			$.get('./app/views/'+url+'.html', function(html) {
				var vw = {id: sView, html: html};
				nx.views.push(vw);
				console.log('AJAX VIEW');
				nx.controllerOnInit = true;
				f(nx.compileView(html, data));
			});
		}else{
			var find = sView;
			$.each(nx.views, function(index, val) {
				if (this.id == find) {
					console.log('NO AJAX VIEW');
					nx.controllerOnInit = false;
					f(nx.compileView(this.html, data));
				}
			});
		}
	},

	importController: function(controller, cb) {
			if ($('#app').length == 0)
				nx.init();

			//insert if not exist
			if ($('#'+controller+'-controller').length == 0) {
				$('#controllers').append('<script id="'+controller+'-controller"></script>');
				var ctr = controller.replace('Controller', '');
				$.getScript('./app/controllers/'+ctr+'.js', function(data) {
					$('#'+controller+'-controller').html(data);
					console.log('AJAX CONTROLLER');
					
					cb();
				});
			}else{
				
				console.log('NO AJAX CONTROLLER');
				cb();
			}
	},


	compileView: function(html, data) {
		$.each(data, function(index, val) {
			if (typeof val == 'object') {
				//inicio each
				var size = index.length+7;
				var from = parseInt(html.indexOf('#each-$'+index));
				var to   = from+size;

				//contenido a compilar
				var content = html;
				content = content.substr(to);


				//fin ecah-end
				var size_end = index.length+10;
				var from_end = parseInt(content.indexOf('#endeach-$'+index));
				var to_end   = from_end+size_end;

				//tomando el contenido a compilar
				content = content.substr(0, from_end);
				// console.log('VVV CONTENT VVVVV!')
				// console.log(content)

				// console.log(val.length)

				//compilar contenido
				var txt_tmp    = content;
				var txt_fromat = ''; 
				var thisLength = val.length;
				var thisArr = val;
				if (typeof val == 'object') {
					try{
						for (var i = 0; i < val.length; i++) {
							var parentEach = index;
							var ctx = val[i];
							var txt_tempAux = txt_tmp;
							$.each(thisArr[i], function(index, val) {
								txt_tempAux = txt_tempAux.split('$'+parentEach+'.'+index).join(ctx[index]);
							});
							txt_fromat += txt_tempAux;
						}
					}catch(err){
						for (var i = 0; i < val.length; i++) {
							txt_fromat += txt_tmp.split('$'+index).join(val[i]);
						}
					}
				}else{
					for (var i = 0; i < val.length; i++) {
						txt_fromat += txt_tmp.split('$'+index).join(val[i]);
					}
				}



				
				// console.log(txt_fromat);
				//html compilado!
				// console.log(txt_fromat);

				//quitamos el texto cifrado
				content = html.substr(from);
				// console.log('FROM')
				// console.log(content)


				from_end = parseInt(content.indexOf('#endeach-$'+index));
				to_end   = from_end+size_end;
				content = content.substr(0, to_end);

				// console.log('TO')
				// console.log(content)
				html = html.replace(content, txt_fromat);

				


				//search each of this object
				// console.log('#each-$'+index);
				// console.log('DE: '+from+' A: '+to);

				// console.log('#endeach');
				// console.log('DE: '+from_end+' A: '+to_end);

			}else{
				html = html.split('$'+index).join(val);
			}
			// console.log(index+' => '+typeof val)
		});
		return html;
	}
};




//On all loaded
$(function() {
	$('body').append('<div id="controllers" style="display:none;"></div>');
	$('head').append('<script src="./app/routes.js"></script>');

	var route = Rlite(notFound, routes);

	function notFound() {
		return '<h1>404 Not found :/</h1>';
	}

	// Hash-based routing
	function processHash() {
		  	if (location.hash == "") {
		  		window.location.hash = '#/';
		  	}else{
				if (!nx.hashBlock) {
			  		try{
						nx.currentController.onExit();
					}catch(err){
						console.warn('onExit Function not found in Controller.');
					}
				  	var hash = location.hash || '#';
				  	route(hash.slice(1))
			  	}
			// Do something useful with the result of the route
		  	// document.body.textContent = route(hash.slice(1));
	  	}
	  
	}
	window.addEventListener('hashchange', processHash)
	
	processHash();
});
