(function( $ ) {
	
	
	$.attachFlickr = {};
	
	$.attachFlickr.settings = {
		per_page:10,						//Photos per page
		user_id:'',							//Any user id from flickr
		tags:'',							//If you want to serach photos by tags
		api_key:'',							//You must have an API Key from flickr
		thumbnail_size:'',					//Thumbnail size sq (square), t (thumbnail), s (small), o (original), z (zoom)
		imageLink:true,						//if you want a link images to large Image from flickr
		description:false,					//if you want a image description from flickr
		clearContainer:false,				//If you want remove previous content in container
		template:'interspersed', 			//interspersed , continuous, first-description, first-images,
		tpl:null,							//template for locate images and description
		repeattpl:'<span>{images}</span>', 	//repeat template for list images
		desCotentCSS:'content-css',			//css for content description span
		descCSS:'des-css',					//css for description span
		dateCSS:'date-css',					//css for date span
		tagCSS:'label notice',				//css for tags
		titleImg:'title',					//if you want to change title attribute for anoither attribute (this is because i need this for my personal project)
		callback_end:function(){}			//callback function for 
	};
	
	$.attachFlickr.APIFlickr = {
		'flickr.photos.search': {api_key:"",user_id:"",tags:"",tag_mode:"",text:"",min_upload_date:"",max_upload_date:"",min_taken_date:"",max_taken_date:"",license:"",sort:"",privacy_filter:"",bbox:"",accuracy:"",safe_search:"",content_type:"",machine_tags:"",machine_tag_mode:"",group_id:"",contacts:"",woe_id:"",place_id:"",media:"",has_geo:"",geo_context:"",lat:"",lon:"",radius:"",radius_units:"",is_commons:"",in_gallery:"",is_getty:"",extras:"",per_page:"",page:""}
	}
	
	$.attachFlickr.methods = {
		init : function( options ) { 
		  // THIS 
		  $.attachFlickr.settings._self = this;
		  
		  $.extend($.attachFlickr.settings, options);
		  
			return this.each(function(){
			  //console.log('init each');			  
			});

		},
		show : function( ) {
		  // IS
		  //console.log('show');	
		   $.extend($.attachFlickr.settings, options);
		},
		hide : function( ) { 
		  // GOOD
		  //console.log('hide');
		   $.extend($.attachFlickr.settings, options);
		},
		update : function( content ) { 
		  // !!! 
		  //console.log('update');
		   $.extend($.attachFlickr.settings, options);
		},
		complete_panel: function(options){
			//console.log('complete_panel');
			$.extend($.attachFlickr.settings, options);			
			$.attachFlickr.methods.__template($.attachFlickr.settings);
	
			$.attachFlickr.settings.callback_end();
		},
		__template:function(options){
			$.extend($.attachFlickr.settings, options);
			var tpl = $.attachFlickr.settings.template;
			
			//console.log(tpl);
			
			switch(tpl) {
				case 'interspersed':
					$($.attachFlickr.settings.photos).each(function(item,value){
						var descItem = $.attachFlickr.settings.images_description[item];
						$($.attachFlickr.settings._self).append(value).append(descItem);
					});
					break
					
				case 'first-description':
					$($.attachFlickr.settings.images_description).each(function(item,value){
						$($.attachFlickr.settings._self).append(value);
					});
					$($.attachFlickr.settings.photos).each(function(item,value){
						$($.attachFlickr.settings._self).append(value);
					});
					break
					
				case 'first-images' :
					
					var newSelf = $($.attachFlickr.settings._self);
					var newSelfDesc = $($.attachFlickr.settings._self);
					
					if($.attachFlickr.settings.tpl){
						$($.attachFlickr.settings._self).append($.attachFlickr.settings.tpl);
						
						var objSelf = $($.attachFlickr.settings._self).parent().find('*:contains("{images}"):last');
						newSelf = objSelf;
					}	
					
					$($.attachFlickr.settings.photos).each(function(item,value){
						$(newSelf).append(value);
					});
					
					
					if($.attachFlickr.settings.tpl){
						var objSelfDesc = $($.attachFlickr.settings._self).parent().find('*:contains("{description}"):last');
						newSelfDesc = objSelfDesc;
					}
					
					$($.attachFlickr.settings.images_description).each(function(item,value){
						$(newSelfDesc).append(value);
					});
					
					
					if($.attachFlickr.settings.tpl){
						var images_a = $($.attachFlickr.settings._self).parent().find('*:contains("{images}")')
						var description_a =$($.attachFlickr.settings._self).parent().find('*:contains("{description}")')
						
						$.merge( images_a, description_a ).each(function(){
								var __initHtml = $(this).html();
								var __endHtml = __initHtml.replace(/{images}/gi, '').replace(/{description}/gi, '');
								$(this).html(__endHtml);
						})
					}
					
					
					
					break
				
				case 'continuous' :
				case 'default' :
				
					$($.attachFlickr.settings.photos).each(function(item,value){
						$($.attachFlickr.settings._self).append(value);
					});
					break
				
			}
		}
		,
		error: function(){
			$($.attachFlickr.settings._self).append('Error de carga de datos: Revise su conexion de internet o su servicio de Flickr');	
		}
		,
		photosSearch: function(options){
			//
			$.extend($.attachFlickr.settings, options);
			//console.log('photosSearch');
			//console.log(this.selector);
			
			return this.each(function(){
			  //console.log('each');
			  	$.attachFlickr.settings._self = this;
				$.attachFlickr.methods._photos('flickr.photos.search',options);
			});
			
			
		},
		photosInfo: function(options){
			//
			$.extend($.attachFlickr.settings, options);
			//console.log('photosSearch');
			//console.log(this.selector);
			
			return this.each(function(){
			  //console.log('photosInfo each');
			  	$.attachFlickr.settings._self = this;
				$.attachFlickr.methods.__clearContainer();
				
				$.attachFlickr.methods._photos('flickr.photos.getInfo',options);
			});
			
			
		},
		__createObjectMethod:function(method){
			
			var optionsMethod = {};
			
			var obj = $.attachFlickr.APIFlickr[method];
				for(var prop in obj){
					if($.attachFlickr.settings[prop] != undefined){
						optionsMethod[prop] = $.attachFlickr.settings[prop];
					}
				}
			
			return optionsMethod;
			
			
		}
		,
		_photos:function(method,options){
			$.extend($.attachFlickr.settings, options);
	
			$.attachFlickr.methods.__clearContainer();
			var URL = $.attachFlickr.methods.__url(method,$.attachFlickr.methods.__createObjectMethod(method));
			
			var html = '<!-- photos -->';
			var response = $.getJSON(URL, function(data) {
				var imageslist = [];
				if(data.photos){
					var photo = data.photos.photo;
					if(photo){
						$(photo).each(function(item, value){
							var src = $.attachFlickr.methods.__src(value, $.attachFlickr.settings.thumbnail_size);
							var alt = value.title;
							var id = value.id;
							var title = '#'+value.id + '-description';
							var secret = value.secret;
							
							var img = new Image();
							img.src = src;
							img.alt = alt;
							img.id = id;
													
							$(img).attr($.attachFlickr.settings.titleImg,title);
							$(img).attr('secret',secret);
							
							var element = img;
	
							if($.attachFlickr.settings.imageLink){
								element = $.attachFlickr.methods.__linkTag(value,src).append(img)
							}
							
							var newElement = element
							
							if($.attachFlickr.settings.repeattpl){
								newElement = $.attachFlickr.methods.__repeatTPL(element);
								console.log('repeatTPL')
							}
							
							imageslist.push(newElement);

						});
					}
				}
				$.attachFlickr.settings.photos = imageslist;
								
			}).complete(function(){
				if($.attachFlickr.settings.description){
					$.attachFlickr.settings.images_description = new Array();
					$.attachFlickr.methods.getInfo('flickr.photos.getInfo',$.attachFlickr.settings);
				}else{
					$.attachFlickr.methods.complete_panel();
				}
			}).error(function() { 
				$.attachFlickr.methods.error();
			});
			
			var imagesList = $.attachFlickr.settings.photos;
			return imagesList;
		},
		getInfo: function(method,options){
			$.extend($.attachFlickr.settings, options);
			
			$.attachFlickr.settings.totalInfo = $.attachFlickr.settings.photos.length;
			$.attachFlickr.settings.totalInfoCompleted = 1;
			
			//console.log($.attachFlickr.settings.totalInfo);
			
			$($.attachFlickr.settings.photos).each(function(item,value){
				
				var photoId = '0';
				var secret = '0';
				
				if($.attachFlickr.settings.imageLink){
					photoId = $(value).find('img').attr('id');
					secret = $(value).find('img').attr('secret');
				}else{
					photoId = value.id;
					secret = value.secret;
				}
				
				//http://www.flickr.com/services/api/flickr.photos.getInfo.html
				var optionsMethod = {};
				optionsMethod.api_key = $.attachFlickr.settings.api_key;
				optionsMethod.secret = secret;
				optionsMethod.photo_id = photoId;
				
				var URL = $.attachFlickr.methods.__url(method, optionsMethod);
				var html = '<!-- photos -->';
				$.getJSON(URL, function(data) {
					
					if(data.photo){
						var description = data.photo.description._content;
						var dateTaken = data.photo.dates.taken;
						var tags = data.photo.tags.tag;
						
						var tpl = $('<div class="desc-content '+$.attachFlickr.settings.desCotentCSS+'" id="'+photoId+'-description"></div>');
						tpl.append('<span class="desc '+$.attachFlickr.settings.descCSS+'">'+description+'</span>');
						tpl.append('<span class="date '+$.attachFlickr.settings.dateCSS+'">'+dateTaken+'</span>');

						var inTpl = '<div class="tags">';
						$(tags).each(function(item,value){
							inTpl += '<span class="tag '+$.attachFlickr.settings.tagCSS+'">'+value._content+'</span>';
						});
						inTpl += '</div>';
						
						tpl.append($(inTpl));

					}
					
					$.attachFlickr.settings.images_description.push(tpl);
				}).complete(function(){
					if($.attachFlickr.settings.totalInfoCompleted == $.attachFlickr.settings.totalInfo){
						$.attachFlickr.methods.complete_panel();
					}
					$.attachFlickr.settings.totalInfoCompleted++;
				});
				
			})
		}
		,
		__url: function(method, params) {
			
			//console.log('__url');
			
			var _url = 'http://api.flickr.com/services/rest/?method=' + method + '&format=json' + ($.attachFlickr.methods.__isEmpty(params) ? '' : '&' + $.param(params)) + '&jsoncallback=?';
		  
		  	//console.log(_url);
		  
		  return _url; 
			
			
	
		},
		__isEmpty: function(obj) {
			
			
		  for (var i in obj) { return false }
		  return true;
		  
		},
		__src: function(photo, size) {
			
		  var translate_size = (size == undefined) ? '_s' : $.attachFlickr.methods.__translate(size);
		  
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
		__linkTag: function(photo, href) {
		  if (href === undefined) href = ['http://www.flickr.com/photos', photo.owner, photo.id].join('/')
		  return $('<a href="' + href + '" title="' + photo.title + '"></a>');
		},
		__repeatTPL: function(obj) {
		  var str = $.attachFlickr.settings.repeattpl;
		  str.replace(/{images}/gi, '').replace(/{description}/gi, '');
		  
		  return $(str).append(obj);
		},
		__clearContainer: function(){
			if($.attachFlickr.settings.clearContainer){
				$($.attachFlickr.settings._self).html('');
			};
		}
	};
	
	
  $.fn.aFlickr = function(method) {	
	
    if ( $.attachFlickr.methods[method] ) {
      return $.attachFlickr.methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return $.attachFlickr.methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }  


  };
})( jQuery );