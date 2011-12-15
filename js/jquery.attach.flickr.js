(function( $ ) {
	
	$.flickrClass = function(){};
	
	$.flickrClass.prototype.settings = {
		per_page:10,						//Photos per page
		user_id:'',							//Any user id from flickr
		tags:'',							//If you want to serach photos by tags
		api_key:'',							//You must have an API Key from flickr
		thumbnail_size:'',					//Thumbnail size sq (square), t (thumbnail), s (small), o (original), z (zoom)
		imageLink:true,						//if you want a link images to large Image from flickr
		description:false,					//if you want a image description from flickr
		clearContainer:false,				//If you want remove previous content in container
		template:'interspersed', 			//interspersed , continuous, first-description, first-images,
		tpl:'',							//template for locate images and description
		repeattpl:'', 	//repeat template for list images
		desCotentCSS:'content-css',			//css for content description span
		descCSS:'des-css',					//css for description span
		dateCSS:'date-css',					//css for date span
		tagCSS:'label notice',				//css for tags
		titleCSS:'title-css',				//css for Descrition Title
		linkTagCSS:	'link-css',				//css for link for images			
		titleImg:'title',					//if you want to change title attribute for anoither attribute (this is because i need this for my personal project)
		callback_end:function(){}			//callback function for 
	};
	
	
	
	$.flickr = {}
	
	$.flickr.counter = 0;
	
	$.flickr.APIFlickr = {
		'flickr.photos.search': {api_key:"",user_id:"",tags:"",tag_mode:"",text:"",min_upload_date:"",max_upload_date:"",min_taken_date:"",max_taken_date:"",license:"",sort:"",privacy_filter:"",bbox:"",accuracy:"",safe_search:"",content_type:"",machine_tags:"",machine_tag_mode:"",group_id:"",contacts:"",woe_id:"",place_id:"",media:"",has_geo:"",geo_context:"",lat:"",lon:"",radius:"",radius_units:"",is_commons:"",in_gallery:"",is_getty:"",extras:"",per_page:"",page:""}
	}
	
	$.flickr.methods = {
		init : function( options ) { 
		  // THIS 
		  $.extend($.flickr.settings, options);
		  
			return this.each(function(){
			  //console.log('init each');			  
			});

		},
		show : function( ) {
		  // IS
		  //console.log('show');	
		   $.extend($.flickr.settings, options);
		},
		hide : function( ) { 
		  // GOOD
		  //console.log('hide');
		   $.extend($.flickr.settings, options);
		},
		update : function( content ) { 
		  // !!! 
		  //console.log('update');
		   $.extend($.flickr.settings, options);
		},
		complete_panel: function(options){
			$.extend($.flickr.settings, options);			
			$.flickr.methods.__template(options);
	
			options.callback_end();
		},
		__template:function(options){
			$.extend($.flickr.settings, options);
			var tpl = options.template;
			
			//console.log(tpl);
			
			switch(tpl) {
				case 'interspersed':
					//console.log(options.images_description);
					
					$(options.photos).each(function(item,value){
						$(options._self).append(value);
					});
					
					$(options.images_description).each(function(item,value){
						var desc = $(options.images_description[item]);
						var descItemId = $(options.images_description[item]).attr('id');
						var id = descItemId.replace('-description','');
						var parent = $(options._self).find('#'+id).parent();
						
						desc.insertAfter(parent);
					});
					
					
					break
					
				case 'first-description':
					$(options.images_description).each(function(item,value){
						$(options._self).append(value);
					});
					$(options.photos).each(function(item,value){
						$(options._self).append(value);
					});
					break
					
				case 'first-images' :
					
					var newSelf = $(options._self);
					var newSelfDesc = $(options._self);
					
					if(options.tpl){
						$(options._self).append(options.tpl);
						
						var objSelf = $(options._self).parent().find('*:contains("{images}"):last');
						newSelf = objSelf;
					}	
					
					$(options.photos).each(function(item,value){
						$(newSelf).append(value);
					});
					
					
					if(options.tpl){
						var objSelfDesc = $(options._self).parent().find('*:contains("{description}"):last');
						newSelfDesc = objSelfDesc;
					}
					
					$(options.images_description).each(function(item,value){
						$(newSelfDesc).append(value);
					});
					
					
					if(options.tpl){
						var images_a = $(options._self).parent().find('*:contains("{images}")')
						var description_a =$(options._self).parent().find('*:contains("{description}")')
						
						$.merge( images_a, description_a ).each(function(){
								var __initHtml = $(this).html();
								var __endHtml = __initHtml.replace(/{images}/gi, '').replace(/{description}/gi, '');
								$(this).html(__endHtml);
						})
					}
					
					
					
					break
				
				case 'continuous' :
				case 'default' :
				
					$(options.photos).each(function(item,value){
						$(options._self).append(value);
					});
					$(options.images_description).each(function(item,value){
						$(options._self).append(value);
					});
					break
				
			}
		}
		,
		error: function(){
			$(options._self).append('Error de carga de datos: Revise su conexion de internet o su servicio de Flickr');	
		}
		,
		photosSearch: function(options){
			//
			

			
			//console.log('photosSearch');
			//console.log(this.selector);
			
			return this.each(function(){
			  //console.log('each');
			  
			  
			  
			  	var op = new $.flickrClass();
				$.flickr.counter++;
				
				var mySettings = new Object();
				$.extend(mySettings, op.settings);
				
				$.extend(mySettings, options);
	
			  	mySettings._self = this;
				op.settings = mySettings;
				$.flickr.methods._photos('flickr.photos.search',op.settings);
			});
		},
		photosInfo: function(options){
			//
			$.extend(options, options);
			//console.log('photosSearch');
			//console.log(this.selector);
			
			return this.each(function(){
			  //console.log('photosInfo each');
			  	options._self = this;
				$.flickr.methods.__clearContainer(options);
				
				$.flickr.methods._photos('flickr.photos.getInfo',options);
			});
			
			
		},
		__createObjectMethod:function(method,options){
			var optionsMethod = {};
			var obj = $.flickr.APIFlickr[method];
				for(var prop in obj){
					if(options[prop] != undefined){
						optionsMethod[prop] = options[prop];
					}
				}
			return optionsMethod;
		}
		,
		_photos:function(method,options){
						
			$.flickr.methods.__clearContainer(options);
			
			var URL = $.flickr.methods.__url(method,$.flickr.methods.__createObjectMethod(method,options));
			
			var html = '<!-- photos -->';
			var response = $.getJSON(URL, function(data) {
				var imageslist = [];
				if(data.photos){
					var photo = data.photos.photo;
					if(photo){
						$(photo).each(function(item, value){
							var src = $.flickr.methods.__src(value, options.thumbnail_size);
							var alt = value.title;
							var id = value.id;
							var title = '#'+value.id + '-description';
							var secret = value.secret;
							
							var img = new Image();
							img.src = src;
							img.alt = alt;
							img.id = id;
													
							$(img).attr(options.titleImg,title);
							$(img).attr('secret',secret);
							
							var element = img;
	
							if(options.imageLink){
								element = $.flickr.methods.__linkTag(value,src,options).append(img)
							}
							
							var newElement = element
							
							if(options.repeattpl){
								newElement = $.flickr.methods.__repeatTPL(newElement,options);
								//console.log('repeatTPL')
							}
							
							
							imageslist.push(newElement);

						});
					}
				}
				
				options.photos = imageslist;
				
							
			}).complete(function(){
				if(options.description){
					options.images_description = new Array();
					$.flickr.methods.getInfo('flickr.photos.getInfo',options);
				}else{
					$.flickr.methods.complete_panel(options);
				}
			}).error(function() { 
				$.flickr.methods.error();
			});
			
			var imagesList = options.photos;
			return imagesList;
		},
		getInfo: function(method,options){
			
			options.totalInfo = options.photos.length;
			options.totalInfoCompleted = 1;
			
			//console.log(options.totalInfo);
			
			$(options.photos).each(function(item,value){
				
				var photoId = '0';
				var secret = '0';
				
				if(options.imageLink || options.repeattpl){
					photoId = $(value).find('img').attr('id');
					secret = $(value).find('img').attr('secret');
				}else{
					photoId = value.id;
					secret = value.secret;
				}
				
				//http://www.flickr.com/services/api/flickr.photos.getInfo.html
				var optionsMethod = {};
				optionsMethod.api_key = options.api_key;
				optionsMethod.secret = secret;
				optionsMethod.photo_id = photoId;
				
				var URL = $.flickr.methods.__url(method, optionsMethod);
				var html = '<!-- photos -->';
				$.getJSON(URL, function(data) {
					
					if(data.photo){
						var title = data.photo.title._content;
						var description = data.photo.description._content;
						var dateTaken = data.photo.dates.taken;
						var tags = data.photo.tags.tag;
						
						var tpl = $('<div class="desc-content '+options.desCotentCSS+'" id="'+photoId+'-description"></div>');
						tpl.append('<h3 class="title '+options.titleCSS+'">'+title+'</h3>');
						tpl.append('<span class="desc '+options.descCSS+'">'+description+'</span>');
						tpl.append('<span class="date '+options.dateCSS+'">'+dateTaken+'</span>');

						var inTpl = '<div class="tags">';
						$(tags).each(function(item,value){
							inTpl += '<span class="tag '+options.tagCSS+'">'+value._content+'</span>';
						});
						inTpl += '</div>';
						
						tpl.append($(inTpl));

					}
					
					options.images_description.push(tpl);
				}).complete(function(){
					if(options.totalInfoCompleted == options.totalInfo){
						$.flickr.methods.complete_panel(options);
					}
					options.totalInfoCompleted++;
				});
				
			})
		}
		,
		__url: function(method, params) {
			
			//console.log('__url');
			
			var _url = 'http://api.flickr.com/services/rest/?method=' + method + '&format=json' + ($.flickr.methods.__isEmpty(params) ? '' : '&' + $.param(params)) + '&jsoncallback=?';
		  
		  	//console.log(_url);
		  
		  return _url; 
			
			
	
		},
		__isEmpty: function(obj) {
			
			
		  for (var i in obj) { return false }
		  return true;
		  
		},
		__src: function(photo, size) {
			
		  var translate_size = (size == undefined) ? '_s' : $.flickr.methods.__translate(size);
		  
		  //console.log('translate_size : '+translate_size);
		 
		  var src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server +'/' + photo.id + '_' + photo.secret + translate_size + '.jpg'
		   //console.log(src);
		  return src;
		},
		__translate: function(size) {
		  switch(size) {
			case 'sq': return '_s' // square
			case 't' : return '_t' // thumbnail
			case 's' : return '_m' // small
			case 'o' : return '_o' // original
			case 'z' : return '_z' // zoom
			case 'm' : return '' // medium
			default : return '' // medium
		  }
		},
		__linkTag: function(photo, href,options) {
		  if (href === undefined) href = ['http://www.flickr.com/photos', photo.owner, photo.id].join('/')
		  return $('<a href="' + href + '" title="' + photo.title + '" class="'+options.linkTagCSS+'"></a>');
		},
		__repeatTPL: function(obj,options) {
		  var str = options.repeattpl;
		  str.replace(/{images}/gi, '').replace(/{description}/gi, '');
		  
		  return $(str).append(obj);
		},
		__clearContainer: function(options){
			if(options.clearContainer){
				$(options.settings._self).html('');
			};
		}
	};
	
	
  $.fn.aFlickr = function(method) {	
	
    if ( $.flickr.methods[method] ) {
      return $.flickr.methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return $.flickr.methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }  


  };
})( jQuery );

var attachFlickr = (function() {});
window.attachFlickr = window.$attachFlickr = attachFlickr;