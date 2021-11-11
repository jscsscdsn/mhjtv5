;(function($,window,document,undefined){'use strict';var Dialog=(function(){function Dialog(element,options){this.$element=$(element);this.settings=$.extend({},$.fn.dialog.defaults,options);}
Dialog.prototype={_init:function(){var self=this;clearTimeout(self.autoCloseTimer);self.isHided=false;self.tapBug=self._hasTapBug();self.platform=mobileUtil.platform;self.dislogStyle=self.settings.style==='default'?self.platform:self.settings.style;if($('#dialog-body-no-scroll').length===0){var styleContent='.body-no-scroll { position: absolute; overflow: hidden; width: 100%; }';$('head').append('<style id="dialog-body-no-scroll">'+styleContent+'</style>');}
self._renderDOM();self._bindEvents();},_renderDOM:function(){var self=this;self.settings.onBeforeShow();self._createDialogDOM(self.settings.type);self.settings.onShow();},_bindEvents:function(){var self=this;self.$confirmBtn.on(mobileUtil.tapEvent,function(ev){var callback=self.settings.onClickConfirmBtn();if(callback||callback===undefined){self.closeDialog();}}).on('touchend',function(ev){ev.preventDefault();});self.$cancelBtn.on(mobileUtil.tapEvent,function(ev){var callback=self.settings.onClickCancelBtn();if(callback||callback===undefined){self.closeDialog();}}).on('touchend',function(ev){ev.preventDefault();});self.$closeBtn.on(mobileUtil.tapEvent,function(ev){var callback=self.settings.onClickCloseBtn();if(callback||callback===undefined){self.closeDialog();}}).on('touchend',function(ev){ev.preventDefault();});if(self.settings.overlayClose){$(document).on(mobileUtil.tapEvent,'.dialog-overlay',function(ev){self.closeDialog();});}
if(self.settings.autoClose>0){self._autoClose();}
$(document).on('webkitAnimationEnd MSAnimationEnd animationend','.dialog-content',function(){if(self.isHided){self.removeDialog();if(self.tapBug){self._removeTapOverlayer();}}});if(self.settings.buttons.length){$.each(self.settings.buttons,function(index,item){self.$dialogContentFt.children('button').eq(index).on(mobileUtil.tapEvent,function(ev){ev.preventDefault();var callback=item.callback();if(callback||callback===undefined){self.closeDialog();}});});}
$(window).on("onorientationchange"in window?"orientationchange":"resize",function(){if(self.settings.contentScroll){setTimeout(function(){self._resetDialog();},200);}});$(document).on('touchmove',function(e){if(self.$dialog.find($(e.target)).length){return false;}else{return true;}});if(self.settings.contentScroll){self._contentScrollEvent();}
if(self.dislogStyle==='android'){$('.dialog-content-ft > .dialog-btn').ripple();}},_createDialogDOM:function(dialogType){var self=this;self.$dialog=$('<div class="dialog dialog-open '+self.settings.dialogClass+'" data-style="'+self.dislogStyle+'"></div>');self.$dialogOverlay=$('<div class="dialog-overlay"></div>');self.$dialogContent=$('<div class="dialog-content"></div>');self.$dialogTitle=$('<div class="dialog-content-hd"><h3 class="dialog-content-title">'+self.settings.titleText+'</h3></div>');self.$dialogContentFt=$('<div class="dialog-content-ft"></div>');self.$dialogContentBd=$('<div class="dialog-content-bd"></div>');self.$closeBtn=$('<div class="dialog-btn-close"><span>close</span></div>');self.$confirmBtn=$('<button class="dialog-btn dialog-btn-confirm '+self.settings.buttonClassConfirm+'">'+self.settings.buttonTextConfirm+'</button>');self.$cancelBtn=$('<button class="dialog-btn dialog-btn-cancel '+self.settings.buttonClassCancel+'">'+self.settings.buttonTextCancel+'</button>');switch(dialogType){case 'alert':self.$dialog.addClass('dialog-modal');if(self.settings.overlayShow){self.$dialog.append(self.$dialogOverlay);}
if(self.settings.titleShow){self.$dialogContent.append(self.$dialogTitle);}
if(self.settings.closeBtnShow){self.$dialogTitle.append(self.$closeBtn);}
self.$dialogContentBd.html(self.settings.content);self.$dialogContentFt.append(self.$confirmBtn);self.$dialogContent.append(self.$dialogContentBd).append(self.$dialogContentFt);self.$dialog.append(self.$dialogContent);$('body').append(self.$dialog);if(self.settings.bodyNoScroll){$('body').addClass('body-no-scroll');}
if(self.settings.contentScroll){self._setDialogContentHeight();}
break;case 'confirm':self.$dialog.addClass('dialog-modal');if(self.settings.overlayShow){self.$dialog.append(self.$dialogOverlay);}
if(self.settings.titleShow){self.$dialogContent.append(self.$dialogTitle);}
if(self.settings.closeBtnShow){self.$dialogTitle.append(self.$closeBtn);}
if(self.settings.buttons.length){var buttonGroupHtml='';$.each(self.settings.buttons,function(index,item){buttonGroupHtml+='<button class="dialog-btn '+item.class+'">'+item.name+'</button>';});self.$dialogContentFt.append(buttonGroupHtml).addClass(self.settings.buttonStyle);}else{self.$dialogContentFt.append(self.$cancelBtn).append(self.$confirmBtn).addClass(self.settings.buttonStyle);}
self.$dialogContentBd.html(self.settings.content);self.$dialogContent.append(self.$dialogContentBd).append(self.$dialogContentFt);self.$dialog.append(self.$dialogContent);$('body').append(self.$dialog);if(self.settings.contentScroll){self._setDialogContentHeight();}
if(self.settings.bodyNoScroll){$('body').addClass('body-no-scroll');}
break;case 'toast':self.$dialog.addClass('dialog-toast');if(self.settings.overlayShow){self.$dialog.append(self.$dialogOverlay);}
var toastContentHtml=$(self.settings.content);if(self.settings.infoIcon!==''&&self.settings.infoText!==''){toastContentHtml=$('<img class="info-icon" src="'+self.settings.infoIcon+'" /><span class="info-text">'+self.settings.infoText+'</span>');}else if(self.settings.infoIcon===''&&self.settings.infoText!==''){toastContentHtml=$('<span class="info-text">'+self.settings.infoText+'</span>');}else if(self.settings.infoIcon!==''&&self.settings.infoText===''){toastContentHtml=$('<img class="info-icon" src="'+self.settings.infoIcon+'" />');}
self.$dialogContentBd.append(toastContentHtml);self.$dialogContent.append(self.$dialogContentBd);self.$dialog.append(self.$dialogContent);$('body').append(self.$dialog);if(self.settings.bodyNoScroll){$('body').addClass('body-no-scroll');}
break;case 'notice':self.$dialog.addClass('dialog-notice');if(self.settings.position==='bottom'){self.$dialog.addClass('dialog-notice-bottom');}
if(self.settings.overlayShow){self.$dialog.append(self.$dialogOverlay);}
var noticeContentHtml=$(self.settings.content);if(self.settings.infoIcon!==''&&self.settings.infoText!==''){noticeContentHtml=$('<img class="info-icon" src="'+self.settings.infoIcon+'" /><span class="info-text">'+self.settings.infoText+'</span>');}else if(self.settings.infoIcon===''&&self.settings.infoText!==''){noticeContentHtml=$('<span class="info-text">'+self.settings.infoText+'</span>');}else if(self.settings.infoIcon!==''&&self.settings.infoText===''){noticeContentHtml=$('<img class="info-icon" src="'+self.settings.infoIcon+'" />');}
self.$dialogContentBd.append(noticeContentHtml);self.$dialogContent.append(self.$dialogContentBd);self.$dialog.append(self.$dialogContent);$('body').append(self.$dialog);if(self.settings.bodyNoScroll){$('body').addClass('body-no-scroll');}
break;default:console.log('running default');break;}},_setDialogContentHeight:function(){var self=this;setTimeout(function(){var dialogDefaultContentHeight=self.$dialogContentBd.height();var dialogContentMaxHeight=self._getDialogContentMaxHeight();self.$dialogContentBd.css({'max-height':dialogContentMaxHeight,}).addClass('content-scroll');if(dialogDefaultContentHeight>dialogContentMaxHeight){self.$dialogContentFt.addClass('dialog-content-ft-border');}else{self.$dialogContentFt.removeClass('dialog-content-ft-border');}},80);},_getDialogContentMaxHeight:function(){var self=this;var winHeight=$(window).height(),dialogContentHdHeight=self.$dialogTitle.height(),dialogContentFtHeight=self.$dialogContentFt.height(),dialogContentBdHeight=winHeight-dialogContentHdHeight-dialogContentFtHeight-60;dialogContentBdHeight=dialogContentBdHeight%2===0?dialogContentBdHeight:dialogContentBdHeight-1;return dialogContentBdHeight;},_resetDialog:function(){var self=this;self._setDialogContentHeight();},_contentScrollEvent:function(){var self=this;var isTouchDown=false;var position={x:0,y:0,top:0,left:0};$(document).on('touchstart mousedown','.content-scroll',function(ev){var touch=ev.changedTouches?ev.changedTouches[0]:ev;isTouchDown=true;position.x=touch.clientX;position.y=touch.clientY;position.top=$(this).scrollTop();position.left=$(this).scrollLeft();return false;}).on('touchmove mousemove','.content-scroll',function(ev){var touch=ev.changedTouches?ev.changedTouches[0]:ev;if(!isTouchDown){return false;}else{var moveTop=position.top-(touch.clientY-position.y);var moveLeft=position.left-(touch.clientX-position.x);$(this).scrollTop(moveTop).scrollLeft(moveLeft);}}).on('touchend mouseup','.content-scroll',function(ev){ev.preventDefault();isTouchDown=false;});},_autoClose:function(){var self=this;self.autoCloseTimer=setTimeout(function(){self.closeDialog();},self.settings.autoClose);},closeDialog:function(){var self=this;self.isHided=true;self.settings.onBeforeClosed();self.$dialog.addClass('dialog-close').removeClass('dialog-open');if(self.tapBug){self._appendTapOverlayer();}},removeDialog:function(){var self=this;self.$dialog.remove();self.isHided=false;self.settings.onClosed();self.settings=$.fn.dialog.defaults;if(self.settings.bodyNoScroll){$('body').removeClass('body-no-scroll');}},update:function(settings){var self=this;clearTimeout(self.autoCloseTimer);self.settings=$.extend({},$.fn.dialog.defaults,settings);if(self.settings.content!==''){self.$dialogContentBd.html(self.settings.content);}
var $infoIcon=self.$dialogContentBd.find('.info-icon');var $infoText=self.$dialogContentBd.find('.info-text');$infoIcon.attr({'src':self.settings.infoIcon});$infoText.html(self.settings.infoText);self._bindEvents();},_hasTapBug:function(){return mobileUtil.isAndroid&&(mobileUtil.version<4.4);},_appendTapOverlayer:function(){var self=this;self.$tapBugOverlayer=$('.solve-tap-bug');if(!self.$tapBugOverlayer.length){self.$tapBugOverlayer=$('<div class="solve-tap-bug" style="margin:0;padding:0;border:0;background:rgba(0,0,0,0);-webkit-tap-highlight-color:rgba(0,0,0,0);width:100%;height:100%;position:fixed;top:0;left:0;"></div>');$('body').append(self.$tapBugOverlayer);}},_removeTapOverlayer:function(){var self=this;setTimeout(function(){self.$tapBugOverlayer.remove();},350);}};return Dialog;})();var mobileUtil=(function(window){var UA=window.navigator.userAgent,isAndroid=/android|adr/gi.test(UA),isIOS=/iphone|ipod|ipad/gi.test(UA)&&!isAndroid,isMobile=isAndroid||isIOS,platform=isIOS?'ios':(isAndroid?'android':'default'),isSupportTouch="ontouchend"in document?true:false;var reg=isIOS?(/os [\d._]*/gi):(/android [\d._]*/gi),verinfo=UA.match(reg),version=(verinfo+"").replace(/[^0-9|_.]/ig,"").replace(/_/ig,".");return{isIOS:isIOS,isAndroid:isAndroid,isMobile:isMobile,platform:platform,version:parseFloat(version),isSupportTouch:isSupportTouch,tapEvent:isMobile&&isSupportTouch?'tapEvent':'click'};})(window);$.fn.dialog=function(options){var self=this;return this.each(function(){var $this=$(this),instance=window.jQuery?$this.data('dialog'):$.fn.dialog.lookup[$this.data('dialog')];if(!instance){var obj=new Dialog(this,options);obj._init();if(window.jQuery){$this.data('dialog',obj);}else{$.fn.dialog.lookup[++$.fn.dialog.lookup.i]=obj;$this.data('dialog',$.fn.dialog.lookup.i);instance=$.fn.dialog.lookup[$this.data('dialog')];}}else{var obj=new Dialog(this,options);obj._init();}
if(typeof options==='string'){instance[options]();}
self.close=function(){obj.closeDialog();};self.update=function(settings){obj.update(settings);};});};if(!window.jQuery){$.fn.dialog.lookup={i:0};}
$.fn.dialog.defaults={type:'alert',style:'default',titleShow:true,titleText:'提示',bodyNoScroll:false,closeBtnShow:false,content:'',contentScroll:true,dialogClass:'',autoClose:0,overlayShow:true,overlayClose:false,buttonStyle:'side',buttonTextConfirm:'确定',buttonTextCancel:'取消',buttonClassConfirm:'',buttonClassCancel:'',buttons:[],infoIcon:'',infoText:'',position:'center',onClickConfirmBtn:function(){},onClickCancelBtn:function(){},onClickCloseBtn:function(){},onBeforeShow:function(){},onShow:function(){},onBeforeClosed:function(){},onClosed:function(){}};})(window.jQuery||window.Zepto,window,document);;(function($,window,document,undefined){'use strict';$(document).ready(function(){var startX,startY,endX,endY,startTime,element;$(document).on('touchstart',function(e){var e=e.originalEvent||e;var touch=e.changedTouches[0];element=$('tagName'in touch.target?touch.target:touch.target.parentNode);startTime=new Date();startX=touch.clientX;startY=touch.clientY;endX=touch.clientX;endY=touch.clientY;}).on('touchmove',function(e){var e=e.originalEvent||e;var touch=e.changedTouches[0];endX=touch.clientX;endY=touch.clientY;}).on('touchend',function(e){var e=e.originalEvent||e;var touch=e.changedTouches[0];var endTime=new Date();if(endTime-startTime<300){if(Math.abs(endX-startX)+Math.abs(endY-startY)<30){element.trigger('tapEvent');}}
startTime=0;startX=0;startY=0;endX=0;endY=0;});});;['tapEvent'].forEach(function(eventName){$.fn[eventName]=function(callback){return this.on(eventName,callback);};});})(window.jQuery||window.Zepto,window,document);