/**
 * ttcon.fullscrn.js
 * 
 * A Dojo-plugin for displaying images as full-screen backgrounds in browsers.
 * (c)2010. Csizmadia Tamas, TTcon Kft.
 *
 **/
dojo.provide("ttcon.fullscrn");
dojo.require("dojo.window");
dojo.require("dojo.number");
dojo.declare("ttcon.fullscrn", null, {
	constructor: function(/*Object*/ args){
		// summary:
		//		Constructor of the fullscrn module.
		// VERSION: [const] String
		//		Version of the module
		// isCssCapable: Boolean
		//		Tells the user agent supports CSS3-rules needed by the module
		// changeInProgress: Boolean
		// 		A simple semaphore, if it is true, no another setImage methods are allowed
		// fadeDuration: int
		//		the duration (in milisecs) of the fadeIn/fadeOut animations	
		this.VERSION = "0.5.5";
		this.isCssCapable = false;
		this.changeInProgress = false;
		this.fadeDuration = 500;
		
		this.isCssCapable = this._shouldUseCss();
		
		
		if(this.isCssCapable){
			this.imageNode = dojo.create("div", { id: "fullscrn-bg" }, dojo.body(), "first");
			dojo.addClass(this.imageNode, "fullscrn-css-bg");
		}else{
			this.imageNode = dojo.create("img", { id: "fullscrn-bg" }, dojo.body(), "first");

			dojo.connect(window, "onresize", this, "resize");
		}
		
		if(args !== undefined){
			this.fadeDuration = args.fadeDuration || this.fadeDuration;
			this.setImage(args.image);
		}
	},
	onImageLoading: function(/*String*/ src){
		// summary:
		//			Called when loading of an image has begun
		// tags:
		//			callback
	},
	onImageChanged: function(/*Object*/ imageNode){
		// summary:
		//			Called when the image has been changed and placed gracefully
		// tags:
		// 			callback
	},
	onError: function(/*Event*/ event, /*String*/ message){
		// summary:
		//			Called when an error occurs during the image loading/placement
		// tags:
		//			callback
	},
	_shouldUseCss: function() {
		// summary:
		//			Return true, if the module can use CSS-rules to do the work.
		// description:
		// 			The constructor calls this private method to decide the business logic
		//			for placing, scaling the image
		// isCapable: Boolean
		//			The method will return this value.
		var isCapable = false;
		
		if(dojo.isSafari > 4 || dojo.isFF >= 3.6 || dojo.isChrome >= 4){
			isCapable = true;
		}
		
		return isCapable; //Boolean
	},
	setImage: function(/*String*/ image){
		// summary:
		// 			Set an image as a full-screen background.
		// description:
		//			This method do the hard work for the module. It takes an image-URL as parameter
		//			and applies necessary CSS-rules (if supported) or do the calculations for
		//			resizing and placing the image with dojo.marginBox()
		// tempImage: Object
		//			temporary image node for preloading the image and determine it's size
		// viewPort: Object
		//			used for getting the actual size of viewport
		// tempImageDimension: Object
		//			used for getting the real size of the image 
		// animOut: Object
		//			used for referencing the fade out animation
		// animIn: Object
		//			used for referencing the fade in animation (after the image loaded)
		if(dojo.isString(image) && !this.changeInProgress){
			this.changeInProgress = true;
			
			var viewPort = dojo.window.getBox();
			
			//Create a temporary image to trigger onload event
			var tempImage = dojo.create("img", {
				style: { 
					position: "absolute", 
					left: viewPort.w + "px", 
					top: viewPort.h + "px" 
				}
			}, dojo.body(), "last");
			
			viewPort = null;
			
			dojo.connect(tempImage, "onload", this, function(event){
				var animOut = dojo.fadeOut({
					node: this.imageNode,
					duration: this.fadeDuration
				});
					
				//Fade the new image when it is fully loaded
				dojo.connect(animOut, "onEnd", this, function(event){
					var animIn = dojo.fadeIn({
						node: this.imageNode,
						duration: this.fadeDuration
					});
					
					if(this.isCssCapable){
						dojo.style(this.imageNode, { backgroundImage: "url('" + image + "')" });
					}else{
						var tempImageDimension = dojo.position(tempImage);

						this.imageNode.src = tempImage.src;
												
						dojo.marginBox(this.imageNode, {
							w: tempImageDimension.w, 
							h: tempImageDimension.h, 
							l: 0, 
							t: 0
						});
						
						tempImageDimension = null;						
						this.resize();
					}

					dojo.connect(animIn, "onEnd", this, function(){
						this.changeInProgress = false;
						this.onImageChanged(this.imageNode);
						dojo.publish("ttcon/fullscrn/changed", [this.imageNode]);
						
						dojo.destroy(tempImage);
						
						return true; //Boolean
					});
					
					animIn.play();
				});
				
				animOut.play();
			});
			
			//Catch that nasty errors!
			dojo.connect(this.imageNode, "onerror", this, function(event){
				this.onError(event, "The image '" + image + "' can not be found!");
			});
			
			//Fire the onImageLoading event, because we're about to load the new img
			this.onImageLoading(image);
			dojo.publish("ttcon/fullscrn/loading", [image]);
			
			tempImage.src = image;
		}else{
			return false; //Boolean
		}
	},
	resize: function(){
		// summary:
		//			Resizes and positions the div used for the background.
		// description:
		//			If the CSS rules are not supported by the browser, we fall back to resize
		//			and position it with JavaScript. This will work in every browser.
		// viewPort: Object
		//			used for the dimensions of the current viewport
		// backgroundRation: Float
		//			used for calculating the correct size of the image
		// calculatedImageWidth: Float
		//			the calculated width for the image
		// calculatedImageHeight: Float
		//			the calculated height for the image
		// imageDimension: Object
		//			used for getting the original dimensions of the image
		var viewPort = dojo.window.getBox();
		var backgroundRatio = viewPort.h / viewPort.w;			
		var calculatedImageWidth, calculatedImageHeight;
		var imageDimension = dojo.position(this.imageNode);
		
		//Calculate the new dimensions
		if(backgroundRatio > (imageDimension.h / imageDimension.w)){
			calculatedImageWidth = ((viewPort.h / imageDimension.h) * imageDimension.w);
			calculatedImageHeight = viewPort.h;
		}else{
			calculatedImageWidth = viewPort.w;
			calculatedImageHeight = ((viewPort.w / imageDimension.w) * imageDimension.h);
		}
		
		//Resize and center the image
		dojo.marginBox(this.imageNode, {
			w: calculatedImageWidth, 
			h: calculatedImageHeight,
			l: (0 - ((calculatedImageWidth - viewPort.w)) / 2),
			t: (0 - ((calculatedImageHeight - viewPort.h)) / 2)
		});
	}
});