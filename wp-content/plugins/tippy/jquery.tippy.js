(function($){$.fn.tippy=function(options){var tippy_state={};var tippy_positions={};var tippy_showing=false;var opts=$.extend({},$.fn.tippy.defaults,options);var countTips=0;var topTipIndex=100;return this.each(function(){countTips++;var tipId='tippy_'+countTips;tippy_state[tipId]={};tippy_state[tipId].options=$.extend({},opts,$(this).data());$(this).hide();$(this).attr('id',tipId);var tippyLink;if(typeof tippy_state[tipId].options.anchor!='undefined'){tippyLink=$(tippy_state[tipId].options.anchor);}else{tippyLink=$('<a></a>');}
tippyLink.addClass('tippy_link').attr('id',tipId+'_link');if(typeof tippy_state[tipId].options['class']!='undefined'){tippyLink.addClass(tippy_state[tipId].options['class']);}
if(typeof tippy_state[tipId].options.name!='undefined'){tippyLink.attr('name',tippy_state[tipId].options.name)}
if(tippy_state[tipId].options.showtitle){tippyLink.attr('title',tippy_state[tipId].options.title);}
if(typeof tippy_state[tipId].options.img!='undefined'){tippyLink.css('display','inline-block').css('position','relative');var tippyImg=$('<img />');tippyImg.attr('src',tippy_state[tipId].options.img);if(tippy_state[tipId].options.showtitle){tippyImg.attr('alt',tippy_state[tipId].options.title);}
tippyLink.append(tippyImg);tippy_state[tipId].img=tippyImg;tippy_state[tipId].imgsrc=tippy_state[tipId].options.img;if(typeof tippy_state[tipId].options.swapimg!='undefined'){var tippySwapImg=$('<img />').attr('src',tippy_state[tipId].options.swapimg).addClass('tippy_swap').css('display','none');if(tippy_state[tipId].options.showtitle){tippySwapImg.attr('alt',tippy_state[tipId].options.title);}
tippyLink.append(tippySwapImg);tippy_state[tipId].swapimg=tippySwapImg;}}else if(typeof tippy_state[tipId].options.title!='undefined'){tippyLink.html(tippy_state[tipId].options.title);}
if(typeof tippy_state[tipId].options.title=='undefined'&&typeof tippy_state[tipId].options.headertitle=='undefined'){tippy_state[tipId].options.showheader=false;}
if(typeof tippy_state[tipId].options.href!='undefined'){tippyLink.attr('href',tippy_state[tipId].options.href);if(typeof tippy_state[tipId].options.target!='undefined'){tippyLink.attr('target',tippy_state[tipId].options.target);}}
if(tippy_state[tipId].options.hoverpopup){tippyLink.mouseover(function(event){showTooltip(tipId,event);});if(tippy_state[tipId].options.alttrigger!='undefined'){$(tippy_state[tipId].options.alttrigger).mouseover(function(event){showTooltip(tipId,event);});}}else{tippyLink.click(function(event){showTooltip(tipId,event);});if(tippy_state[tipId].options.alttrigger!='undefined'){$(tippy_state[tipId].options.alttrigger).click(function(event){showTooltip(tipId,event);});}}
if(tippy_state[tipId].options.autoclose){tippyLink.mouseout(function(){hideTooltip(tipId);});if(tippy_state[tipId].options.alttrigger!='undefined'){$(tippy_state[tipId].options.alttrigger).mouseout(function(){hideTooltip(tipId);});}}
if(typeof tippy_state[tipId].options.anchor=='undefined'){$(this).before(tippyLink);}
tippy_state[tipId].link=tippyLink;if(tippy_state[tipId].options.autoshow){createTooltip(tipId);positionTip(tipId);doShowTooltip(tipId,true);}});function createTooltip(tipId)
{var tipBox,tipHeader,tipClose,tipBody;tipBox=$('<div></div>').hide().css('height','auto').css('display','none').addClass('tippy_tip').addClass('domTip_Tip').attr('id',tipId+'_box').mouseover(function(){freezeTooltip(tipId);}).click(function(){$(this).css('z-index',topTipIndex);topTipIndex++;});tippy_state[tipId].tipBox=tipBox;if(!tippy_state[tipId].options.container){$('#'+tipId).before(tippy_state[tipId].tipBox);}else{$(tippy_state[tipId].options.container).append(tipBox);}
if(typeof tippy_state[tipId].options['class']!='undefined'){tipBox.addClass(tippy_state[tipId].options['class']+'_tip')}
switch(tippy_state[tipId].options.position){case 'link':case 'mouse':tipBox.css('position','absolute');break;default:tipBox.css('position',tippy_state[tipId].options.position);}
if(tippy_state[tipId].options.autoclose){tipBox.mouseout(function(){hideTooltip(tipId);});}
if(tippy_state[tipId].options.showheader){tipHeader=$('<div></div>').css('height','auto').addClass('tippy_header').addClass('domTip_tipHeader');var headerTitle;if(typeof tippy_state[tipId].options.headertitle!='undefined'){headerTitle=tippy_state[tipId].options.headertitle;}else{headerTitle=tippy_state[tipId].options.title;}
if(typeof tippy_state[tipId].options.headerhref!='undefined'){var headerLink=$('<a></a>').attr('href',tippy_state[tipId].options.headerhref).attr('title',headerTitle).html(headerTitle);if(typeof tippy_state[tipId].options.target!='undefined'){headerLink.attr('target',tippy_state[tipId].options.target);}
tipHeader.append(headerLink);}else{tipHeader.html(headerTitle);}
tipHeader.appendTo(tipBox);}
tipBody=$('<div></div>').css('height','auto').addClass('tippy_body').addClass('domTip_tipBody').appendTo(tipBox);if(tippy_state[tipId].options.htmlentities==false){$('#'+tipId).appendTo(tipBody).show();}
if(tippy_state[tipId].options.hasnested==true){tipBody.css('overflow','visible');}
if(tippy_state[tipId].options.height!=false){tipBody.css("height",tippy_state[tipId].options.height+"px");tipBody.css("min-height",tippy_state[tipId].options.height+"px");tipBody.css("max-height",tippy_state[tipId].options.height+"px");}
if(tippy_state[tipId].options.showclose){tipClose=$('<div></div>').addClass('tippy_closelink').click(function(){doHideTooltip(tipId);}).html(tippy_state[tipId].options.closetext);if(tippy_state[tipId].options.showheader){tipHeader.append(tipClose);}else{tipBody.prepend(tipClose);}}
if(tippy_state[tipId].options.width!=false){if(tippy_state[tipId].options.showheader){headerDiff=tipBox.width()-tipHeader.width();tipHeader.css('width',(tippy_state[tipId].options.width-headerDiff)+'px');}
bodyDiff=tipBox.width()-tipBody.width();tipBox.css('width',tippy_state[tipId].options.width+'px');tipBody.css('width',(tippy_state[tipId].options.width-bodyDiff)+'px');}
if(typeof tippy_state[tipId].options.bodystyle!='undefined'){tipBody.attr('style',tipBody.attr('style')+' '+tippy_state[tipId].options.bodystyle);}
if(tippy_state[tipId].options.draggable){if(tippy_state[tipId].options.dragheader&&tippy_state[tipId].options.showheader){tipBox.draggable({handle:'.tippy_header'});tipHeader.addClass('tippy_draggable');}else{tipBox.draggable();tipBox.addClass('tippy_draggable');}}}
function getPositions(tipId,event)
{if(!event){event=window.event;}
tippy_positions.scrollPageX=$(window).scrollLeft();tippy_positions.scrollPageY=$(window).scrollTop();tippy_positions.viewScreenX=$(window).width();tippy_positions.viewScreenY=$(window).height();tippy_positions.curPageX=event.clientX+tippy_positions.scrollPageX;tippy_positions.curPageY=event.clientY+tippy_positions.scrollPageY;tippy_positions.viewPageX=event.clientX;tippy_positions.viewPageY=event.clientY;tippy_positions.tipLinkHeight=$('#'+tipId+'_link').height();if(tippy_state[tipId].options.calcpos=='document'){tippy_positions.tipLinkX=$('#'+tipId+'_link').offset().left;tippy_positions.tipLinkY=$('#'+tipId+'_link').offset().top;}else{tippy_positions.tipLinkX=$('#'+tipId+'_link').position().left;tippy_positions.tipLinkY=$('#'+tipId+'_link').position().top;}};function positionTip(tipId,event)
{tipBox=tippy_state[tipId].tipBox;getPositions(tipId,event);var tipHeight=tipBox.height();var tipWidth=tipBox.width();var tipHorSide="left",tipVertSide="top";var tipXloc,tipYloc=0;if(tippy_state[tipId].options.position=='link'){tipXloc=tippy_positions.tipLinkX;tipYloc=tippy_positions.tipLinkY+tippy_positions.tipLinkHeight;}else if(tippy_state[tipId].options.position=='mouse'){tipXloc=tippy_positions.curPageX;tipYloc=tippy_positions.curPageY;}else{if(typeof tippy_state[tipId].options.top=='undefined'&&typeof tippy_state[tipId].options.bottom=='undefined'){tipYloc=0;}else if(typeof tippy_state[tipId].options.top!='undefined'){tipYloc=tippy_state[tipId].options.top;}else{tipVertSide="bottom"
tipYloc=tippy_state[tipId].options.bottom;}
if(typeof tippy_state[tipId].options.left=='undefined'&&typeof tippy_state[tipId].options.right=='undefined'){tipXloc=0;}else if(typeof tippy_state[tipId].options.left!='undefined'){tipXloc=tippy_state[tipId].options.left;}else{tipHorSide="right"
tipXloc=tippy_state[tipId].options.right;}}
if(tippy_state[tipId].options.position=='link'||tippy_state[tipId].options.position=='mouse'){tipXloc+=tippy_state[tipId].options.offsetx;tipYloc+=tippy_state[tipId].options.offsety;}
if((tipXloc-tippy_positions.scrollPageX)+5+tipWidth>tippy_positions.viewScreenX){pageXDiff=((tipXloc-tippy_positions.scrollPageX)+5+tipWidth)-tippy_positions.viewScreenX;tipXloc-=pageXDiff;}
if((tipYloc-tippy_positions.scrollPageY)+5+tipHeight>tippy_positions.viewScreenY){pageYDiff=((tipYloc-tippy_positions.scrollPageY)+5+tipHeight-tippy_positions.viewScreenY);tipYloc-=pageYDiff;}
if(tipHeight>tippy_positions.viewScreenY){tipYloc=tippy_positions.scrollPageY+5;}
tipBox.css(tipHorSide,tipXloc+"px");tipBox.css(tipVertSide,tipYloc+"px");}
function showTooltip(tipId,event)
{if(typeof tippy_state[tipId].tipBox=='undefined'){createTooltip(tipId);}
if(tippy_state[tipId].state=='showing'||tippy_state[tipId].state=='displaying'){if(tippy_state[tipId].options.autoclose){freezeTooltip(tipId);}}else{tippy_state[tipId].state='displaying';positionTip(tipId,event);tippy_state[tipId].timer=setTimeout(function(){doShowTooltip(tipId,false);},tippy_state[tipId].options.showdelay);}}
function doShowTooltip(tipId,instashow)
{tippy_state[tipId].state='showing';if(typeof tippy_state[tipId].options.swapimg!='undefined'&&typeof tippy_state[tipId].options.img!='undefined'){tippy_state[tipId].img.animate({opacity:0},500);tippy_state[tipId].swapimg.fadeIn(500);}else if(typeof tippy_state[tipId].options.swaptitle!='undefined'&&typeof tippy_state[tipId].options.title!='undefined'){tippy_state[tipId].link.html(tippy_state[tipId].options.swaptitle);}
if(typeof tippy_state[tipId].options.swaptitle!='undefined'&&typeof tippy_state[tipId].options.title!='undefined'){tippy_state[tipId].link.html(tippy_state[tipId].options.swaptitle);}
if(!tippy_state[tipId].options.multitip&&tippy_showing){doHideTooltip(tippy_showing);}
if(tippy_state[tipId].options.htmlentities==true){var convertMarkup=$("<div/>").html($('#'+tipId).html()).text();$('.tippy_body',tippy_state[tipId].tipBox).html(convertMarkup).show();}
if(instashow){tippy_state[tipId].tipBox.show();}else{tippy_state[tipId].tipBox.fadeIn(tippy_state[tipId].options.showspeed);}
tippy_showing=tipId;if(tippy_state[tipId].tipBox.mediaelementplayer){jQuery('video,audio',tippy_state[tipId].tipBox).mediaelementplayer().load();}}
function showSwapImg(tipId,event)
{if(typeof tippy_state[tipId].options.swapimg!='undefined'&&typeof tippy_state[tipId].options.img!='undefined'){tippy_state[tipId].img.animate({opacity:0},500);tippy_state[tipId].swapimg.fadeIn(500);}}
function hideSwapImg(tipId)
{if(typeof tippy_state[tipId].options.swapimg!='undefined'&&typeof tippy_state[tipId].options.img!='undefined'){tippy_state[tipId].img.animate({opacity:1},500);tippy_state[tipId].swapimg.fadeOut(500);}}
function hideTooltip(tipId)
{if(tippy_state[tipId].state=='displaying'){tippy_state[tipId].state='hidden';clearTimeout(tippy_state[tipId].timer);}else{tippy_state[tipId].timer=setTimeout(function(){doHideTooltip(tipId);},tippy_state[tipId].options.hidedelay);}}
function doHideTooltip(tipId)
{tippy_showing=false;tippy_state[tipId].state='hidden';clearTimeout(tippy_state[tipId].timer);hideSwapImg(tipId);if(typeof tippy_state[tipId].options.swaptitle!='undefined'&&typeof tippy_state[tipId].options.title!='undefined'){tippy_state[tipId].link.html(tippy_state[tipId].options.title);}
tippy_state[tipId].tipBox.fadeOut(tippy_state[tipId].options.hidespeed,function(){if(tippy_state[tipId].options.htmlentities==true){$('.tippy_body',tippy_state[tipId].tipBox).html('');}});}
function freezeTooltip(tipId)
{clearTimeout(tippy_state[tipId].timer);tippy_state[tipId].tipBox.stop();tippy_state[tipId].tipBox.css("opacity",100);}
function getTipId(manualId)
{console.log("Finding...");if(tippy_ids[manualId]!="undefined"){return tippy_ids[manualId];}else{return false;}}
function triggerTippy(manualId,event)
{console.log("Enter...");tipId=getTipId(manualId);console.log("Got "+tipId);if(tipId){showTooltip(tipId,event);}}};$.fn.tippy.defaults={showtitle:false,offsetx:10,offsety:10,hoverpopup:true,multitip:false,showdelay:100,showspeed:200,hidedelay:1000,hidespeed:200,showheader:true,showclose:true,closetext:'close',autoclose:true,container:false,position:'link',height:false,width:false,draggable:false,dragheader:true,autoshow:false,calcpos:'parent',htmlentities:false,hasnested:false}}(jQuery));