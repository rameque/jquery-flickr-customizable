(function($) {

	$.flickrClass = function() {
	};

	$.flickrClass.prototype.settings = {
		per_page : 10, //Photos per page
		user_id : '', //Any user id from flickr
		tags : '', //If you want to serach photos by tags
		api_key : '', //You must have an API Key from flickr
		thumbnail_size : '', //Thumbnail size sq (square), t (thumbnail), s (small), o (original), z (zoom)
		gallery_id : '', //If you want search by gallery.
		extras : '', //A comma-delimited list of extra information to fetch for each returned record. Currently supported fields are: description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_m, url_z, url_l, url_o
		imageLink : true, //if you want a link images to large Image from flickr
		description : false, //if you want a image description from flickr
		clearContainer : false, //If you want remove previous content in container
		template : 'none', //interspersed , continuous, first-description, first-images,embebed
		tpl : '', //template for locate images and description
		repeattpl : '', //repeat template for list images
		repeattpl_description: '', //repeat template for list description
		desCotentCSS : 'content-css', //css for content description span
		descCSS : 'des-css', //css for description span
		dateCSS : 'date-css', //css for date span
		tagCSS : 'label notice', //css for tags
		titleCSS : 'title-css', //css for Descrition Title
		linkTagCSS : 'link-css', //css for link for images
		titleImg : 'title', //if you want to change title attribute for anoither attribute (this is because i need this for my personal project)
		replaceTitle : false,
		callback_end : function() {
		}			//callback function for
	};

	$.flickr = {}

	$.flickr.counter = 0;

	$.flickr.APIFlickr = {
		'flickr.photos.search' : {
			api_key : "",
			user_id : "",
			tags : "",
			tag_mode : "",
			text : "",
			min_upload_date : "",
			max_upload_date : "",
			min_taken_date : "",
			max_taken_date : "",
			license : "",
			sort : "",
			privacy_filter : "",
			bbox : "",
			accuracy : "",
			safe_search : "",
			content_type : "",
			machine_tags : "",
			machine_tag_mode : "",
			group_id : "",
			contacts : "",
			woe_id : "",
			place_id : "",
			media : "",
			has_geo : "",
			geo_context : "",
			lat : "",
			lon : "",
			radius : "",
			radius_units : "",
			is_commons : "",
			in_gallery : "",
			is_getty : "",
			extras : "",
			per_page : "",
			page : ""
		},
		'flickr.galleries.getPhotos' : {
			api_key : "",
			gallery_id : "",
			extras : "",
			per_page : "",
			page : ""
		},
		'flickr.galleries.getList' : {
			api_key : "",
			user_id : "",
			per_page : "",
			page : ""
		},
		'flickr.photosets.getList' : {
			api_key : "",
			user_id : "",
			per_page : "",
			page : ""
		},
		'flickr.photosets.getPhotos' : {
			api_key : "",
			photoset_id : "",
			extras : "",
			privacy_filter : "",
			per_page : "",
			page : "",
			media : ""
		},
		'flickr.photos.getInfo' : {
			api_key : "",
			photo_id : "",
			secret : ""
		}
	}

	$.flickr.methods = {
		init : function(options) {
			// THIS
			$.extend($.flickr.settings, options);

			return this.each(function() {

			});
		},
		show : function() {
			// IS
			$.extend($.flickr.settings, options);
		},
		hide : function() {
			// GOOD
			$.extend($.flickr.settings, options);
		},
		update : function(content) {
			// !!!
			$.extend($.flickr.settings, options);
		},
		complete_panel : function(options) {
			$.extend($.flickr.settings, options);
			$.flickr.methods.__template(options);

			options.callback_end();
		},
		__template : function(options) {
			$.extend($.flickr.settings, options);
			var tpl = options.template;
			switch(tpl) {
				case 'embebed':

					$(options.photos).each(function(item, value) {
						$(options._self).append(value);
					});
					if(options.description) {

						$(options.images_description).each(function(item, value) {
							var desc = $(options.images_description[item]);
							var descItemId = $(options.images_description[item]).attr('id');
							var id = descItemId.replace('-description', '');
							var parent = $(options._self).find('#' + id).parent();

							parent.append(desc);
						});
					}

					break
				case 'interspersed':

					$(options.photos).each(function(item, value) {
						$(options._self).append(value);
					});

					$(options.images_description).each(function(item, value) {
						var desc = $(options.images_description[item]);
						
						
						
						var descItemId = $(options.images_description[item]).attr('id');
						var id = descItemId.replace('-description', '');
						var parent = $(options._self).find('#' + id).parent();

						desc.insertAfter(parent);
					});
					break

				case 'first-description':
					$(options.images_description).each(function(item, value) {
						$(options._self).append(value);
					});
					$(options.photos).each(function(item, value) {
						$(options._self).append(value);
					});
					break

				case 'first-images' :

					var newSelf = $(options._self);
					var newSelfDesc = $(options._self);

					if(options.tpl) {
						$(options._self).append(options.tpl);

						var objSelf = $(options._self).parent().find('*:contains("{images}"):last');
						newSelf = objSelf;
					}

					$(options.photos).each(function(item, value) {
						$(newSelf).append(value);
					});
					if(options.tpl) {
						var objSelfDesc = $(options._self).parent().find('*:contains("{description}"):last');
						newSelfDesc = objSelfDesc;
					}

					$(options.images_description).each(function(item, value) {
						$(newSelfDesc).append(value);
					});
					if(options.tpl) {
						var images_a = $(options._self).parent().find('*:contains("{images}")')
						var description_a = $(options._self).parent().find('*:contains("{description}")')

						$.merge(images_a, description_a).each(function() {
							var __initHtml = $(this).html();
							var __endHtml = __initHtml.replace(/{images}/gi, '').replace(/{description}/gi, '');
							$(this).html(__endHtml);
						})
					}

					break

				case 'continuous' :
				default:
					if(options.method != 'flickr.photos.getInfo'){
						$(options.photos).each(function(item, value) {
							$(options._self).append(value);
						});
					}
	
					$(options.images_description).each(function(item, value) {
						$(options._self).append(value);
					});
					break

			}
		},
		error : function() {
			$(options._self).append('Error de carga de datos: Revise su conexion de internet o su servicio de Flickr');
		},
		/*Fix for the latest version*/
		photosSearch : function(options) {
			return this.each(function() {
				options._self = this;
				options.method = "flickr.photos.search";
				$.flickr.methods.functionReplace(options);
			});
		},
		flickr_photos_search : function(options) {
			return this.each(function() {
				options._self = this;
				$.flickr.methods.functionReplace(options);
			});
		},
		flickr_galleries_getList : function(options) {
			return this.each(function() {
				options._self = this;
				$.flickr.methods.functionReplace(options);
			});
		},
		flickr_photosets_getList : function(options) {
			return this.each(function() {
				options._self = this;
				$.flickr.methods.functionReplace(options);
			});
		},
		flickr_galleries_getPhotos : function(options) {
			return this.each(function() {
				options._self = this;
				$.flickr.methods.functionReplace(options);
			});
		},
		flickr_photosets_getPhotos : function(options) {
			return this.each(function() {
				options._self = this;
				$.flickr.methods.functionReplace(options);
			});
		},
		flickr_photos_getInfo : function(options) {
			return this.each(function() {
				options._self = this;
				$.flickr.methods.functionReplace(options);
			});
		},
		functionReplace : function(options) {
			var op = new $.flickrClass();
			$.flickr.counter++;

			var mySettings = new Object();
			$.extend(mySettings, op.settings);

			$.extend(mySettings, options);
			op.settings = mySettings;

			switch(options.method) {
				case 'flickr.photos.getInfo':
					$.flickr.methods._getInfo(op.settings);
					break
				default:
					$.flickr.methods._photos(op.settings);
			}
		},
		photosInfo : function(options) {
			//
			return this.each(function() {
				options._self = this;
				options.method = "flickr.photos.getInfo";
				$.flickr.methods.functionReplace(options);
			});
		},
		__createObjectMethod : function(options) {
			var optionsMethod = {};
			var obj = $.flickr.APIFlickr[options.method];
			
			for(var prop in obj) {
				if(options[prop] != undefined) {
						optionsMethod[prop] = options[prop];
				}
			}
			return optionsMethod;
		},
		_photos : function(options) {

			$.flickr.methods.__clearContainer(options);
	
			var URL = $.flickr.methods.__url(options.method,$.flickr.methods.__createObjectMethod(options));

			var html = '<!-- photos -->';
			var response = $.getJSON(URL, function(data) {
				var imageslist = [];
				if(data.photos) {
					var photo = data.photos.photo;

				} else if(data.photoset) {
					var photo = data.photoset.photo;
				}

				if(photo) {
					
					$(photo).each(function(item, value) {
						var src = $.flickr.methods.__src(value, options.thumbnail_size);
						var alt = value.title;
						var id = value.id;
						var title = '#' + value.id + '-description';
						var secret = value.secret;

						var img = new Image();
						img.src = src;
						img.alt = alt;
						img.id = id;

						$(img).attr(options.titleImg, title);
						$(img).attr('secret', secret);

						if(options.replaceTitle) {
							$(img).attr('title', alt);
						}

						var element = img;

						if(options.imageLink) {
							element = $.flickr.methods.__linkTag(value, src, options).append(img)
						}

						var newElement = element

						if(options.repeattpl) {
							newElement = $.flickr.methods.__repeatTPL(newElement, options);
						}
						imageslist.push(newElement);
						$(options._self).append(newElement);

					});
				}			
				options.photos = imageslist;
	
			}).complete(function() {
				if(options.description) {
					options.method = 'flickr.photos.getInfo';
					
					$(options.photos).each(function(item,value){
						
						var photoId = '0';
						var secret = '0';
						
						if(options.imageLink || options.repeattpl) {
							photoId = $(value).find('img').attr('id');
							secret = $(value).find('img').attr('secret');
						} else {
							photoId = value.id;
							secret = value.secret;
						}
						options.photo_id = photoId;
						options.secret = secret;
						
						$.flickr.methods._getInfo(options);
					})
					
					
					
					
				} else {
					$.flickr.methods.complete_panel(options);
				}
			}).error(function() {
				$.flickr.methods.error();
			});
			var imagesList = options.photos;
			return imagesList;
		},
		_getInfo : function(options) {
			var photoId = options.photo_id;
			var URL = $.flickr.methods.__url(options.method,$.flickr.methods.__createObjectMethod(options));
	
			if(options.images_description == undefined){
				options.images_description = new Array()
			}
			
			$.getJSON(URL, function(data) {
				
				
				
				if(data.photo) {
					var title = data.photo.title._content;
					var description = data.photo.description._content;
					var dateTaken = data.photo.dates.taken;
					var tags = data.photo.tags.tag;
					var tpl = '';
					
					if(options.repeattpl_description.length > 2){
						tpl=$(options.repeattpl_description);
						tpl.attr('id', photoId+'-description').addClass('desc-content ' + options.desCotentCSS);

						
					}else{
						tpl = $('<div class="desc-content ' + options.desCotentCSS + '" id="' + photoId + '-description"></div>');
					}

					
					tpl.append('<h3 class="title ' + options.titleCSS + '">' + title + '</h3>');
					tpl.append('<span class="desc ' + options.descCSS + '">' + description + '</span>');
					tpl.append('<span class="date ' + options.dateCSS + '">' + dateTaken + '</span>');

					var inTpl = '<div class="tags">';
					$(tags).each(function(item, value) {
						inTpl += '<span class="tag ' + options.tagCSS + '">' + value._content + '</span>';
					});
					inTpl += '</div>';

					tpl.append($(inTpl));
					
				}
				options.images_description.push(tpl);

			}).complete(function() {
				if(options.totalInfoCompleted == options.totalInfo) {
					$.flickr.methods.complete_panel(options);
				}
				options.totalInfoCompleted++;
			});
		},
		__url : function(method,params) {
			
			var str = '';
			for(var prop in params){
				str += prop +'='+ params[prop] + '&';
			}
			var _url = 'http://api.flickr.com/services/rest/?method=' + method + '&format=json' + ($.flickr.methods.__isEmpty(params) ? '' : '&' + str) + '&jsoncallback=?';
			return _url;

		},
		__isEmpty : function(obj) {

			for(var i in obj) {
				return false
			}
			return true;

		},
		__src : function(photo, size) {

			var translate_size = (size == undefined) ? '_s' : $.flickr.methods.__translate(size);

			var src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + translate_size + '.jpg'
			return src;
		},
		__translate : function(size) {
			switch(size) {
				case 'sq':
					return '_s' // square
				case 's':
					return '_m' // small
				case 't' :
					return '_t' // thumbnail
				case 'm' :
					return '' // medium
				case 'z' :
					return '_z' // zoom
				case 'b' :
					return '_b' // original
				case 'o' :
					return '_b' // original

				default :
					return '' // medium
			}
		},
		__linkTag : function(photo, href, options) {

			var thmb = $.flickr.methods.__translate(options.thumbnail_size);
			src2 = href.replace(thmb, '_b');

			if(href === undefined)
				href = ['http://www.flickr.com/photos', photo.owner, photo.id].join('/')
			return $('<a href="' + src2 + '" title="' + photo.title + '" class="' + options.linkTagCSS + '"></a>');
		},
		__repeatTPL : function(obj, options) {
			var str = options.repeattpl;
			str.replace(/{images}/gi, '').replace(/{description}/gi, '');

			return $(str).append(obj);
		},
		__clearContainer : function(options) {
			if(options.clearContainer) {
				$(options.settings._self).html('');
			};
		}
	};

	$.fn.aFlickr = function(mtd) {

		var method = mtd.replace(/\./gi, '_');
		var obj = new Object();
		obj.method = mtd;

		$.extend(arguments[1], obj);

		if($.flickr.methods[method]) {
			return $.flickr.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if( typeof method === 'object' || !method) {
			return $.flickr.methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}

	};
})(jQuery);

var attachFlickr = (function() {
});
window.attachFlickr = window.$attachFlickr = attachFlickr;
