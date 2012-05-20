dojo.provide("ttcon.fullscrn");dojo.require("dojo.window");dojo.require("dojo.number");
dojo.declare("ttcon.fullscrn",null,{constructor:function(a){this.VERSION="0.5.5";this.changeInProgress=this.isCssCapable=false;this.fadeDuration=500;if(this.isCssCapable=this._shouldUseCss()){this.imageNode=dojo.create("div",{id:"fullscrn-bg"},dojo.body(),"first");dojo.addClass(this.imageNode,"fullscrn-css-bg")}else{this.imageNode=dojo.create("img",{id:"fullscrn-bg"},dojo.body(),"first");dojo.connect(window,"onresize",this,"resize")}if(a!==undefined){this.fadeDuration=a.fadeDuration||this.fadeDuration;
this.setImage(a.image)}},onImageLoading:function(){},onImageChanged:function(){},onError:function(){},_shouldUseCss:function(){var a=false;if(dojo.isSafari>4||dojo.isFF>=3.6||dojo.isChrome>=4)a=true;return a},setImage:function(a){if(dojo.isString(a)&&!this.changeInProgress){this.changeInProgress=true;var c=dojo.window.getBox(),b=dojo.create("img",{style:{position:"absolute",left:c.w+"px",top:c.h+"px"}},dojo.body(),"last");c=null;dojo.connect(b,"onload",this,function(){var d=dojo.fadeOut({node:this.imageNode,
duration:this.fadeDuration});dojo.connect(d,"onEnd",this,function(){var f=dojo.fadeIn({node:this.imageNode,duration:this.fadeDuration});if(this.isCssCapable)dojo.style(this.imageNode,{backgroundImage:"url('"+a+"')"});else{var e=dojo.position(b);this.imageNode.src=b.src;dojo.marginBox(this.imageNode,{w:e.w,h:e.h,l:0,t:0});e=null;this.resize()}dojo.connect(f,"onEnd",this,function(){this.changeInProgress=false;this.onImageChanged(this.imageNode);dojo.publish("ttcon/fullscrn/changed",[this.imageNode]);
dojo.destroy(b);return true});f.play()});d.play()});dojo.connect(this.imageNode,"onerror",this,function(d){this.onError(d,"The image '"+a+"' can not be found!")});this.onImageLoading(a);dojo.publish("ttcon/fullscrn/loading",[a]);b.src=a}else return false},resize:function(){var a=dojo.window.getBox(),c=a.h/a.w,b;b=dojo.position(this.imageNode);if(c>b.h/b.w){c=a.h/b.h*b.w;b=a.h}else{c=a.w;b=a.w/b.w*b.h}dojo.marginBox(this.imageNode,{w:c,h:b,l:0-(c-a.w)/2,t:0-(b-a.h)/2})}});