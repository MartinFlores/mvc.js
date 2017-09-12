/**
* @fileoverview Library mvcjs
*
* @author Martin Flores Sepulveda
* @version 2
* Github: https://github.com/MartinFlores/mvcjs
*/

var view = {};
var controller = {};


/**
* Load a view
* @param {String} "nameView" name of view
* @param {String} "data" object of var to view
* @returns {object} the object of view
*/
view = function(nameView) {
	if (view.views == undefined) {
		view.views = [];
	}
	if (nameView == undefined) {
		return console.error("View undefined");
	}

	return {

		/**
		* Show a view and render
		* @param {String} "data" vars for view
		* @returns {bool} if susccess return true
		*/
		render: function (data){
			$('body').scrollTop(0);
			view.import(nameView, data);
			return true;
		},


		/**
		* hide view
		*/
		hide: function (){
			view.current = null;
			$('#'+nameView+'-view').hide();
		}
	}	
}


/**
* Set a empty view
*/
view.current = null;


/**
* Set a empty view views
*/
view.views = [];


/**
* Import View
* @returns {string} the view html in string
*/
view.import = function(v, data) {
    // console.log("data", data);	
	if (v != undefined) {
		v = v.replace('/', '-');
		$('#views>div').hide();
		if ($('#'+v+'-view').length == 0){
			$('#views').append('<div id="'+v+'-view"></div>');
			v = v.replace('-', '/');
			$.get('./app/views/'+v+'.html', function(html) {
				v = v.replace('/', '-');
				var vw = {id: v+'-view', html: html};
				view.views.push(vw);
				if (data != undefined) {
					var html = view.compile(html, data);
					$('#'+v+'-view').html(html).show();
				}else{
					$('#'+v+'-view').html(html).show();
				}
				view.current = v+'-view';
			    return true;
			});
		}else{
			$.each(view.views, function(index, val) {
				if (this.id == v+'-view') {
					if (data != undefined) {
						var html = view.compile(this.html, data);
						$('#'+v+'-view').html(html).show();
					}else{
						$('#'+v+'-view').html(this.html).show();
					}
					view.current = v+'-view';
					return true;
				}
			});
		}
	}else{
		return console.error('view not found');
	}
}


/**
* compile View
* @param {String} "html" html of view
* @param {object} "data" object of var to view
* @returns {string} the view html in string
*/
view.compile = function(html, data) {
		$.each(data, function(index, val) {
			if (typeof val == 'object') {
				//inicio each
				var size = index.length+7;
				var from = parseInt(html.indexOf('#each $'+index));
				var to   = from+size;

				//contenido a compilar
				var content = html;
				content = content.substr(to);


				//fin ecah-end
				var size_end = index.length+10;
				var from_end = parseInt(content.indexOf('#endeach $'+index));
				var to_end   = from_end+size_end;

				//tomando el contenido a compilar
				content = content.substr(0, from_end);
				// console.log('VVV CONTENT VVVVV!')
				// console.log(content)

				// console.log(val.length)

				//compilar contenido
				var txt_tmp    = content;
				var txt_fromat = ''; 
				//NO SE Q PDO DON EXTE
				// var thisLength = val.length;
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


				from_end = parseInt(content.indexOf('#endeach $'+index));
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

				console.log("html", html);
				html = html.split('$'+index).join(val);
			}
			// console.log(index+' => '+typeof val)
		});
		return html;
	}



/**
* Call a controller
* @param {String} "controller" name of controller
* @param {String} "fun" name function to execute
* @returns {object} the object of controller
*/
controller = function (_controller) {
	if (_controller == undefined) {
		return console.error("Controller undefined");
	}
	return {

		/**
		* Call a controller function
		* @param {String} "f" name of function. Default >> 'index'
		* @returns {bool} if susccess return true
		*/
		run: function (f){
			if (f == undefined) {
				f = 'index';
			}
			if ($('#'+_controller+'-controller').length == 0) {
				return controller.import(_controller, function() {
					try{
						controller.current = window[_controller+'Controller'];
						controller.current[f]();

					}catch(err){
						console.error('Error, function "'+f+'" not found in "./app/controllers/'+_controller+'.js" controller.');
					}
					return true;
				});
			}else{
				try{
					controller.current = window[_controller+'Controller'];
					controller.current[f]();
				}catch(err){
					console.error('Error, function "'+f+'" not found in "./app/controllers/'+_controller+'.js" controller.');
				}
				return true;
			}
		}
	}
}


/**
* Set a empty current controller
*/
controller.current = null;



/**
* Init
*/
controller.init = function (cb) {
	console.log(config);
	$.each(config.fixedControllers, function(index, val) {
		controller(val).run();
	});

	wait(function() {
		cb();
	},100);
}



/**
* Import controller
* @returns {object} the object of controller
*/
controller.import = function(c, f) {
	if (c != undefined) {
		$('#controllers').append('<script id="'+c+'-controller"></script>');
		$.getScript('./app/controllers/'+c+'.js', function(data) {
			$('#'+c+'-controller').html(data);
		    f();
		});
	}else{
		return console.log('c no found');
	}
}

function notFound() {
	window.location = '#/404';
}
// Hash-based routing
function processHash() {

	  	if (location.hash == "") {
	  		window.location.hash = '#/';
	  	}else{
	  // 		try{
			// 	nx.currentController.onExit();
			// }catch(err){
			// 	console.warn('onExit Function not found in Controller.');
			// }
		  	var hash = location.hash || '#';
		  	route(hash.slice(1))
		// Do something useful with the result of the route
	  	// document.body.textContent = route(hash.slice(1));
  	}
  
}


$(function() {
	$('body').append('<div id="controllers" style="display:none;"></div>');
	$('body').append('<div id="views"></div>');
	$('head').append('<script src="./app/routes.js"></script>');
	controller.init(function() {
		window.addEventListener('hashchange', processHash)
		processHash();
	});
	
});

window.onload = function(argument) {
}