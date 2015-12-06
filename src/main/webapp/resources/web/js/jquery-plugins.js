// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */
(function(a){a.fn.bgiframe=(a.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(d){d=a.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;"},d);var c='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+d.src+'"style="display:block;position:absolute;z-index:-1;'+(d.opacity!==false?"filter:Alpha(Opacity='0');":"")+"top:"+(d.top=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')":b(d.top))+";left:"+(d.left=="auto"?"expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')":b(d.left))+";width:"+(d.width=="auto"?"expression(this.parentNode.offsetWidth+'px')":b(d.width))+";height:"+(d.height=="auto"?"expression(this.parentNode.offsetHeight+'px')":b(d.height))+';"/>';return this.each(function(){if(a(this).children("iframe.bgiframe").length===0){this.insertBefore(document.createElement(c),this.firstChild)}})}:function(){return this});a.fn.bgIframe=a.fn.bgiframe;function b(c){return c&&c.constructor===Number?c+"px":c}})(jQuery);

/* Copyright (c) 2006 Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * $LastChangedDate: 2007-12-14 23:57:10 -0600 (Fri, 14 Dec 2007) $
 * $Rev: 4163 $
 *
 * Version: 3.0
 *
 * Requires: $ 1.2.2+
 */
(function($){$.event.special.mousewheel={setup:function(){var handler=$.event.special.mousewheel.handler;if($.browser.mozilla)$(this).bind('mousemove.mousewheel',function(event){$.data(this,'mwcursorposdata',{pageX:event.pageX,pageY:event.pageY,clientX:event.clientX,clientY:event.clientY});});if(this.addEventListener)this.addEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false);else
    this.onmousewheel=handler;},teardown:function(){var handler=$.event.special.mousewheel.handler;$(this).unbind('mousemove.mousewheel');if(this.removeEventListener)this.removeEventListener(($.browser.mozilla?'DOMMouseScroll':'mousewheel'),handler,false);else
    this.onmousewheel=function(){};$.removeData(this,'mwcursorposdata');},handler:function(event){var args=Array.prototype.slice.call(arguments,1);event=$.event.fix(event||window.event);$.extend(event,$.data(this,'mwcursorposdata')||{});var delta=0,returnValue=true;if(event.wheelDelta)delta=event.wheelDelta/120;if(event.detail)delta=-event.detail/3;if($.browser.opera)delta=-event.wheelDelta;event.data=event.data||{};event.type="mousewheel";args.unshift(delta);args.unshift(event);return $.event.handle.apply(this,args);}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel");},unmousewheel:function(fn){return this.unbind("mousewheel",fn);}});})(jQuery);


/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 * MA: Modified 10/15/2013
 */

;(function($){
    $.fn.superfish = function(op){

        var sf = $.fn.superfish,
            c = sf.c,
            $arrow = $(['<span class="',c.arrowClass,'"> <span class="visuallyHidden">&#187;</span></span>'].join('')),
            over = function(){
                var $$ = $(this), menu = getMenu($$);
                clearTimeout(menu.sfTimer);
                $$.showSuperfishUl().siblings().hideSuperfishUl();
            },
            out = function(){
                var $$ = $(this), menu = getMenu($$), o = sf.op;
                clearTimeout(menu.sfTimer);
                menu.sfTimer=setTimeout(function(){
                    o.retainPath=($.inArray($$[0],o.$path)>-1);
                    $$.hideSuperfishUl();
                    if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
                },o.delay);
            },
            getMenu = function($menu){
                var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
                sf.op = sf.o[menu.serial];
                return menu;
            },
            addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };

        return this.each(function() {
            var s = this.serial = sf.o.length;
            var o = $.extend({},sf.defaults,op);
            o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
                $(this).addClass([o.hoverClass,c.bcClass].join(' '))
                    .filter('li:has(ul)').removeClass(o.pathClass);
            });
            sf.o[s] = sf.op = o;

            $('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
                if (o.autoArrows) addArrow( $('>a:first-child',this) );
            })
                .not('.'+c.bcClass)
                .hideSuperfishUl();

            var $a = $('a',this);
            $a.each(function(i){
                var $li = $a.eq(i).parents('li');
                $a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
            });
            o.onInit.call(this);

        }).each(function() {
            var menuClasses = [c.menuClass];
            if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
            $(this).addClass(menuClasses.join(' '));
        });
    };

    var sf = $.fn.superfish;
    sf.o = [];
    sf.op = {};
    sf.IE7fix = function(){
        var o = sf.op;
        if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
            this.toggleClass(sf.c.shadowClass+'-off');
    };
    sf.c = {
        bcClass     : 'sf-breadcrumb',
        menuClass   : 'sf-js-enabled',
        anchorClass : 'sf-with-ul',
        arrowClass  : 'sf-sub-indicator',
        shadowClass : 'sf-shadow'
    };
    sf.defaults = {
        hoverClass	: 'sfHover',
        pathClass	: 'overideThisToUse',
        pathLevels	: 1,
        delay		: 800,
        animation	: {opacity:'show'},
        speed		: 'normal',
        autoArrows	: true,
        dropShadows : true,
        disableHI	: false,		// true disables hoverIntent detection
        onInit		: function(){}, // callback functions
        onBeforeShow: function(){},
        onShow		: function(){},
        onHide		: function(){}
    };
    $.fn.extend({
        hideSuperfishUl : function(){
            var o = sf.op,
                not = (o.retainPath===true) ? o.$path : '';
            o.retainPath = false;
            var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
                .find('>ul').hide().css('visibility','hidden');
            o.onHide.call($ul);
            return this;
        },
        showSuperfishUl : function(){
            var o = sf.op,
                sh = sf.c.shadowClass+'-off',
                $ul = this.addClass(o.hoverClass)
                    .find('>ul:hidden').css('visibility','visible');
            sf.IE7fix.call($ul);
            o.onBeforeShow.call($ul);
            $ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
            return this;
        }
    });

})(jQuery);


/*
 * hoverIntent by Brian Cherne
 */
(function($){
    /* hoverIntent by Brian Cherne */
    $.fn.hoverIntent = function(f,g) {
        // default configuration options
        var cfg = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        // override configuration options with user supplied object
        cfg = $.extend(cfg, g ? { over: f, out: g } : f );

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).unbind("mousemove",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
            var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
            while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
            if ( p == this ) { return false; }

            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // else e.type == "onmouseover"
            if (e.type == "mouseover") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).bind("mousemove",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "onmouseout"
            } else {
                // unbind expensive mousemove event
                $(ob).unbind("mousemove",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // bind the function to the two event listeners
        return this.mouseover(handleHover).mouseout(handleHover);
    };

})(jQuery);


/*
 * HTML Truncator for jQuery
 * by Henrik Nyh <http://henrik.nyh.se> 2008-02-28.
 * http://github.com/henrik/jquery.truncator.js/tree/master
 * Free to modify and redistribute with credit.
 *
 * modified by Mike Avello
 */
(function($) {

    var trailing_whitespace = true;

    $.fn.truncate = function(options) {

        var opts = $.extend({}, $.fn.truncate.defaults, options);

        $(this).each(function() {

            var content_length = $.trim(squeeze($(this).text())).length;
            if (content_length <= opts.max_length)
                return;  // bail early if not overlong

            var actual_max_length = opts.max_length - opts.more.length - 3;  // 3 for " ()"
            var truncated_node = recursivelyTruncate(this, actual_max_length);
            var full_node = $(this).hide();

            truncated_node.insertAfter(full_node);

            findNodeForMore(truncated_node).append(' <span class="truncateLink"><a class="truncateMore" href="#show more content">'+opts.more+'</a></span>');
            findNodeForLess(full_node).append(' <span class="truncateLink"><a class="truncateLess" href="#show less content">'+opts.less+'</a></span>');

            truncated_node.find('a:last').click(function() {
                truncated_node.hide(); full_node.show(); return false;
            });
            full_node.find('a:last').click(function() {
                truncated_node.show(); full_node.hide(); return false;
            });

        });
    }

    // Note that the " (�more)" bit counts towards the max length � so a max
    // length of 10 would truncate "1234567890" to "12 (�more)".
    $.fn.truncate.defaults = {
        max_length: 100,
        more: '�more',
        less: 'less'
    };

    function recursivelyTruncate(node, max_length) {
        return (node.nodeType == 3) ? truncateText(node, max_length) : truncateNode(node, max_length);
    }

    function truncateNode(node, max_length) {
        var node = $(node);
        var new_node = node.clone().empty();
        var truncatedChild;
        node.contents().each(function() {
            var remaining_length = max_length - new_node.text().length;
            if (remaining_length == 0) return;  // breaks the loop
            truncatedChild = recursivelyTruncate(this, remaining_length);
            if (truncatedChild) new_node.append(truncatedChild);
        });
        return new_node;
    }

    function truncateText(node, max_length) {
        var text = squeeze(node.data);
        if (trailing_whitespace)  // remove initial whitespace if last text
            text = text.replace(/^ /, '');  // node had trailing whitespace.
        trailing_whitespace = !!text.match(/ $/);
        var text = text.slice(0, max_length);
        // Ensure HTML entities are encoded
        // http://debuggable.com/posts/encode-html-entities-with-jquery:480f4dd6-13cc-4ce9-8071-4710cbdd56cb
        text = $('<div/>').text(text).html();
        return text;
    }

    // Collapses a sequence of whitespace into a single space.
    function squeeze(string) {
        return string.replace(/\s+/g, ' ');
    }

    // Finds the last, innermost block-level element
    function findNodeForMore(node) {
        var $node = $(node);
        var last_child = $node.children(":last");
        if (!last_child) return node;
        var display = last_child.css('display');
        if (!display || display=='inline') return $node;
        return findNodeForMore(last_child);
    };

    // Finds the last child if it's a p; otherwise the parent
    function findNodeForLess(node) {
        var $node = $(node);
        var last_child = $node.children(":last");
        if (last_child && last_child.is('p')) return last_child;
        return node;
    };

})(jQuery);



/*--------------------------------------------------------------------
 * JQuery Plugin: "EqualHeights" & "EqualWidths"
 * by:	Scott Jehl, Todd Parker, Maggie Costello Wachs (http://www.filamentgroup.com)
 *
 * Copyright (c) 2007 Filament Group
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Description: Compares the heights or widths of the top-level children of a provided element
 and sets their min-height to the tallest height (or width to widest width). Sets in em units
 by default if pxToEm() method is available.
 * Dependencies: jQuery library, pxToEm method	(article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/)
 * Usage Example: $(element).equalHeights();
 Optional: to set min-height in px, pass a true argument: $(element).equalHeights(true);
 * Version: 2.0, 07.24.2008
 * Changelog:
 *  08.02.2007 initial Version 1.0
 *  07.24.2008 v 2.0 - added support for widths
 --------------------------------------------------------------------*/

$.fn.equalHeights = function(px) {
    $(this).each(function(){
        var currentTallest = 0;
        $(this).children().each(function(i){
            if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
        });
        if (!px || !Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
        // for ie6, set height since min-height isn't supported
        if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'height': currentTallest}); }
        $(this).children().css({'min-height': currentTallest});
    });
    return this;
};

// just in case you need it...
$.fn.equalWidths = function(px) {
    $(this).each(function(){
        var currentWidest = 0;
        $(this).children().each(function(i){
            if($(this).width() > currentWidest) { currentWidest = $(this).width(); }
        });
        if(!px || !Number.prototype.pxToEm) currentWidest = currentWidest.pxToEm(); //use ems unless px is specified
        // for ie6, set width since min-width isn't supported
        if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'width': currentWidest}); }
        $(this).children().css({'min-width': currentWidest});
    });
    return this;
};


/*--------------------------------------------------------------------
 * javascript method: "pxToEm"
 * by:
 Scott Jehl (scott@filamentgroup.com)
 Maggie Wachs (maggie@filamentgroup.com)
 http://www.filamentgroup.com
 *
 * Copyright (c) 2008 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 *
 * Description: Extends the native Number and String objects with pxToEm method. pxToEm converts a pixel value to ems depending on inherited font size.
 * Article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/
 * Demo: http://www.filamentgroup.com/examples/pxToEm/
 *
 * Options:
 scope: string or jQuery selector for font-size scoping
 reverse: Boolean, true reverses the conversion to em-px
 * Dependencies: jQuery library
 * Usage Example: myPixelValue.pxToEm(); or myPixelValue.pxToEm({'scope':'#navigation', reverse: true});
 *
 * Version: 2.0, 08.01.2008
 * Changelog:
 *		08.02.2007 initial Version 1.0
 *		08.01.2008 - fixed font-size calculation for IE
 --------------------------------------------------------------------*/

Number.prototype.pxToEm = String.prototype.pxToEm = function(settings){
    //set defaults
    settings = jQuery.extend({
        scope: 'body',
        reverse: false
    }, settings);

    var pxVal = (this == '') ? 0 : parseFloat(this);
    var scopeVal;
    var getWindowWidth = function(){
        var de = document.documentElement;
        return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    };

    /* When a percentage-based font-size is set on the body, IE returns that percent of the window width as the font-size.
     For example, if the body font-size is 62.5% and the window width is 1000px, IE will return 625px as the font-size.
     When this happens, we calculate the correct body font-size (%) and multiply it by 16 (the standard browser font size)
     to get an accurate em value. */

    if (settings.scope == 'body' && $.browser.msie && (parseFloat($('body').css('font-size')) / getWindowWidth()).toFixed(1) > 0.0) {
        var calcFontSize = function(){
            return (parseFloat($('body').css('font-size'))/getWindowWidth()).toFixed(3) * 16;
        };
        scopeVal = calcFontSize();
    }
    else { scopeVal = parseFloat(jQuery(settings.scope).css("font-size")); };

    var result = (settings.reverse == true) ? (pxVal * scopeVal).toFixed(2) + 'px' : (pxVal / scopeVal).toFixed(2) + 'em';
    return result;
};


/* CENTER ELEMENT */
(function($) {
    $.fn.center = function() {
        var topCheck = ($(window).height() - this.height()) / 2 + $(window).scrollTop(),
            leftCheck = ($(window).width() - this.width()) / 2 + $(window).scrollLeft(),
            top = topCheck < 0 ? 0 : topCheck,
            left = leftCheck < 0 ? 0 : leftCheck;
        this.css({"position":"absolute", "top":top + "px", "left":left + "px"});
        return this;
    };
})(jQuery);




/*
 jquery.constrain plugin


 $.constrain usage:
 //limit field to having maximum of one 'p' and four '\'
 $("#myfield").constrain({
 limit: { "p":1 , "\\":4 }
 });

 //prohibit field from having alphabet chars
 $("#myfield").constrain({
 prohibit:	{ regex: "[a-zA-Z]" }
 });
 //prohibit field from having vowels
 $("#myfield").constrain({
 prohibit:	{ chars: "aeiouAEIOU" }
 });

 //allow field to only have alphabet chars
 $("#myfield").constrain({
 allow:	{ regex: "[a-zA-Z]" }
 });

 $.numeric usage:
 $("#myfield").numeric({ precision : { num: 1} }); //fixes precision on blur
 --or--
 $("#myfield").numeric({ precision : { num: 1,onblur:false} }); //fixes precision on keyup event

 Rev:$090508$
 */


(function($) {
    $.fn.constrain = function(opt) {
        opt = $.extend(true, {}, {
            limit: {}, //key/value pairs ie {"p":4,"\\":4}
            prohibit: { chars: "", regex: false },
            allow: { chars: "", regex: false }
        }, opt);

        function isProhibitedByLimit(input, e) {
            var prohibited = false;
            $.each(opt.limit, function(token, idx) {
                var max = this;
                if (token.charCodeAt(0) == e.which) {
                    prohibited = max < 0 ? false : max < $(input).val().split(token).length;
                    return false; //break 'each' iterator
                }
            });
            return prohibited;
        };

        //has prohibit or allow been configured by user?
        function isConfigured(item) {
            return item.chars.length > 0 || (item.regex && item.regex.length > 0);
        };

        //does the prohibit or allow collection find a match given the key?
        function match(item, input, e) {
            var arr = item.chars.split("");
            for (var i in arr) {
                var token = arr[i];
                if (token.charCodeAt(0) == e.which) {
                    return true;
                }
            }
            if (item.regex) {
                var re = new RegExp(item.regex);
                if (re.test(String.fromCharCode(e.which))) {
                    return true;
                }
            }

            return false;
        };

        function isProhibited(input, e) {
            if (e.which == 0 || e.which == 8 || e.which == 27) {//always permit space,tab, or escape
                return false;
            }

            var prohibit = isConfigured(opt.prohibit) ? match(opt.prohibit, input, e) : false;
            var allow = isConfigured(opt.allow) ? match(opt.allow, input, e) : true;
            var limited = isProhibitedByLimit(input, e);
            return prohibit || !allow || limited;
        };

        return this.each(function() {
            $(this).keypress(function(e) {
                if (isProhibited(this, e)) {
                    e.preventDefault();
                }
            });

        });
    };
    //todo use number formatring script from http://www.xaprb.com/blog/2007/07/15/javascript-number-formatting-library-v13-released/
    $.fn.numeric = function(opt) {
        opt = $.extend(true, {}, {
            onblur: true,
            format: ""	//"0,0.0" for thousand sep (52,456,34.49) or "0.0" for no thousands sep
        }, opt);

        var parts = opt.format.split(".");
        var precision = parts.length > 1 ? parts[1].length : false;
        return this.each(function() {
            var allowRe = "\\d";

            if (opt.format.indexOf(".") > -1) {
                allowRe += "\\.";
            }
            if (opt.format.indexOf(",") > -1) {
                allowRe += ",";
            }
            var constraintOptions = {
                allow: { regex: "[" + allowRe + "]" },
                limit: { ".": 1 }
            };

            $(this).constrain(constraintOptions);

            if (precision) {
                //on the field's blur event, correct the value to the configured precision, rounding if necessary
                //so if precision.num is set to '1', then 14.2563 would be changed to 14.3 on the blur event
                $(this).blur(function(e) {
                    var n = parseFloat($(this).val());
                    if (!isNaN(n)) {
                        var val = $(this).val();
                        $(this).val($.formatNumber(val, opt.format));
                    }
                });
                if (!opt.onblur) {
                    //on the field's keyup event, correct the value to the configured precision right away
                    //this is a bit jarring as the number they just entered is removed if it exceeds the precision value

                    var prec = new RegExp("\\d+\\.*\\d{0," + precision + "}");
                    $(this).keyup(function(e) {
                        //since keyup e.which is considering numberkeys differently
                        if ((e.which < 48 && e.which > 57) || //number keys
                            (e.which < 96 && e.which > 105)) { //number keypad
                            return;
                        }
                        var val = $(this).val();
                        $(this).val(val.match(prec)); //we can't invoke format fn here
                    });
                }
            }

        });
    };

})(jQuery);

/* formatNumber function for extension directly on jQuery namespace */
(function($) {
    $.numericFormat = $.numericFormat || {}; $.numericFormat.formats = $.numericFormat.formats || new Array();

    $.extend({
        formatNumber: function(num, format) {

            //hide our internals so the createNewFormat function can recurse on it without requiring the user to ignore the 'context' arg
            function _numberFormat(num, format, context) {

                function createNewFormat(format, formatName) {

                    var code = "var " + formatName + " = function(num){\n";

                    //todo: internationalization concerns will need to be met here by sanitizing the correct thousands separator out
                    code += "num = num.replace(/,/,'');";

                    // Decide whether the function is a terminal or a pos/neg/zero function
                    var formats = format.split(";");
                    switch (formats.length) {
                        case 1:
                            code += createTerminalFormat(format);
                            break;
                        case 2:
                            code += "return (num < 0) ? _numberFormat(num,\""
                                + escape(formats[1])
                                + "\", 1) : _numberFormat(num,\""
                                + escape(formats[0])
                                + "\", 2);";
                            break;
                        case 3:
                            code += "return (num < 0) ? _numberFormat(num,\""
                                + escape(formats[1])
                                + "\", 1) : ((num == 0) ? _numberFormat(num,\""
                                + escape(formats[2])
                                + "\", 2) : _numberFormat(num,\""
                                + escape(formats[0])
                                + "\", 3));";
                            break;
                        default:
                            code += "throw 'Too many semicolons in format string';";
                            break;
                    }

                    return code + "};";

                };

                function createTerminalFormat(format) {
                    // If there is no work to do, just return the literal value
                    if (format.length > 0 && format.search(/[0#?]/) == -1) {
                        return "return '" + escape(format) + "';\n";
                    }
                    // Negative values are always displayed without a minus sign when section separators are used.

                    var code = "var val = (context == null) ? new Number(num) : Math.abs(num);\n";
                    var thousands = false;
                    var lodp = format;
                    var rodp = "";
                    var ldigits = 0;
                    var rdigits = 0;
                    var scidigits = 0;
                    var scishowsign = false;
                    var sciletter = "";
                    // Look for (and remove) scientific notation instructions, which can be anywhere
                    m = format.match(/\..*(e)([+-]?)(0+)/i);
                    if (m) {
                        sciletter = m[1];
                        scishowsign = (m[2] == "+");
                        scidigits = m[3].length;
                        format = format.replace(/(e)([+-]?)(0+)/i, "");
                    }
                    // Split around the decimal point
                    var m = format.match(/^([^.]*)\.(.*)$/);
                    if (m) {
                        lodp = m[1].replace(/\./g, "");
                        rodp = m[2].replace(/\./g, "");
                    }
                    // Look for %
                    if (format.indexOf('%') >= 0) {
                        code += "val *= 100;\n";
                    }
                    // Look for comma-scaling to the left of the decimal point
                    m = lodp.match(/(,+)(?:$|[^0#?,])/);
                    if (m) {
                        code += "val /= " + Math.pow(1000, m[1].length) + "\n;";
                    }
                    // Look for comma-separators
                    if (lodp.search(/[0#?],[0#?]/) >= 0) {
                        thousands = true;
                    }
                    // Nuke any extraneous commas
                    if ((m) || thousands) {
                        lodp = lodp.replace(/,/g, "");
                    }
                    // Figure out how many digits to the l/r of the decimal place
                    m = lodp.match(/0[0#?]*/);
                    if (m) {
                        ldigits = m[0].length;
                    }
                    m = rodp.match(/[0#?]*/);
                    if (m) {
                        rdigits = m[0].length;
                    }

                    // Scientific notation takes precedence over rounding etc
                    if (scidigits > 0) {
                        code += "var sci = toScientific(num,val,"
                            + ldigits + ", " + rdigits + ", " + scidigits + ", " + scishowsign + ");\n"
                            + "var arr = [sci.l, sci.r];\n";
                    }
                    else {
                        // If there is no decimal point, round to nearest integer, AWAY from zero
                        if (format.indexOf('.') < 0) {
                            code += "val = (val > 0) ? Math.ceil(val) : Math.floor(val);\n";
                        }
                        // Numbers are rounded to the correct number of digits to the right of the decimal
                        //code += "var arr = val.round(" + rdigits + ").toFixed(" + rdigits + ").split('.');\n";
                        code += "var arr = round(val," + rdigits + ").toFixed(" + rdigits + ").split('.');\n";
                        // There are at least "ldigits" digits to the left of the decimal, so add zeros if needed.
                        code += "arr[0] = (val < 0 ? '-' : '') + leftPad((val < 0 ? arr[0].substring(1) : arr[0]), "
                            + ldigits + ", '0');\n";
                    }
                    // Add thousands separators
                    if (thousands) {
                        code += "arr[0] = addSeparators(arr[0]);\n";
                    }

                    // Insert the digits into the formatting string.  On the LHS, extra digits are copied
                    // into the result.  On the RHS, rounding has chopped them off.
                    code += "arr[0] = reverse(injectIntoFormat(reverse(arr[0]), '" + escape(reverse(lodp)) + "', true));\n";
                    if (rdigits > 0) {
                        code += "arr[1] = injectIntoFormat(arr[1], '" + escape(rodp) + "', false);\n";
                    }
                    if (scidigits > 0) {
                        code += "arr[1] = arr[1].replace(/(\\d{" + rdigits + "})/, '$1" + sciletter + "' + sci.s);\n";
                    }

                    return code + "return arr.join('.');\n";
                };

                function toScientific(num, val, ldigits, rdigits, scidigits, showsign) {
                    var result = { l: "", r: "", s: "" };
                    var ex = "";
                    // Make ldigits + rdigits significant figures
                    var before = Math.abs(val).toFixed(ldigits + rdigits + 1).trim('0');
                    // Move the decimal point to the right of all digits we want to keep,
                    // and round the resulting value off
                    var after = Math.round(num, new Number(before.replace(".", "").replace(
                        new RegExp("(\\d{" + (ldigits + rdigits) + "})(.*)"), "$1.$2"))).toFixed(0);
                    // Place the decimal point in the new string
                    if (after.length >= ldigits) {
                        after = after.substring(0, ldigits) + "." + after.substring(ldigits);
                    }
                    else {
                        after += '.';
                    }
                    // Find how much the decimal point moved.  This is #places to LODP in the original
                    // number, minus the #places in the new number.  There are no left-padded zeroes in
                    // the new number, so the calculation for it is simpler than for the old number.
                    result.s = (before.indexOf(".") - before.search(/[1-9]/)) - after.indexOf(".");
                    // The exponent is off by 1 when it gets moved to the left.
                    if (result.s < 0) {
                        result.s++;
                    }
                    // Split the value around the decimal point and pad the parts appropriately.
                    result.l = (val < 0 ? '-' : '') + leftPad(after.substring(0, after.indexOf(".")), ldigits, "0");
                    result.r = after.substring(after.indexOf(".") + 1);
                    if (result.s < 0) {
                        ex = "-";
                    }
                    else if (showsign) {
                        ex = "+";
                    }
                    result.s = ex + leftPad(Math.abs(result.s).toFixed(0), scidigits, "0");
                    return result;
                };


                function reverse(str) {
                    var res = "";
                    for (var i = str.length; i > 0; --i) {
                        res += str.charAt(i - 1);
                    }
                    return res;
                };
                function escape(string) {
                    return string.replace(/('|\\)/g, "\\$1");
                };
                function leftPad(val, size, ch) {
                    var result = new String(val);
                    if (ch == null) {
                        ch = " ";
                    }
                    while (result.length < size) {
                        result = ch + result;
                    }
                    return result;
                };

                function round(num, decimals) {
                    if (decimals > 0) {
                        var m = num.toFixed(decimals + 1).match(
                            new RegExp("(-?\\d*)\.(\\d{" + decimals + "})(\\d)\\d*$"));
                        if (m && m.length) {
                            return new Number(m[1] + "." + leftPad(Math.round(m[2] + "." + m[3]), decimals, "0"));
                        }
                    }
                    return num;
                };

                function addSeparators(val) {
                    //return val.reverse().replace(/(\d{3})/g, "$1,").reverse().replace(/^(-)?,/, "$1");
                    var s = reverse(val).replace(/(\d{3})/g, "$1,");
                    return reverse(s).replace(/^(-)?,/, "$1");
                };

                function injectIntoFormat(val, format, stuffExtras) {
                    var i = 0;
                    var j = 0;
                    var result = "";
                    var revneg = val.charAt(val.length - 1) == '-';
                    if (revneg) {
                        val = val.substring(0, val.length - 1);
                    }
                    while (i < format.length && j < val.length && format.substring(i).search(/[0#?]/) >= 0) {
                        if (format.charAt(i).match(/[0#?]/)) {
                            // It's a formatting character; copy the corresponding character
                            // in the value to the result
                            if (val.charAt(j) != '-') {
                                result += val.charAt(j);
                            }
                            else {
                                result += "0";
                            }
                            j++;
                        }
                        else {
                            result += format.charAt(i);
                        }
                        ++i;
                    }
                    if (revneg && j == val.length) {
                        result += '-';
                    }
                    if (j < val.length) {
                        if (stuffExtras) {
                            result += val.substring(j);
                        }
                        if (revneg) {
                            result += '-';
                        }
                    }
                    if (i < format.length) {
                        result += format.substring(i);
                    }
                    return result.replace(/#/g, "").replace(/\?/g, " ");
                };

                //add our dynamic function
                var formatName = "numFormat" + $.numericFormat.formats.length++;
                eval(createNewFormat(format, formatName));
                //return our new function named by our formatName
                return eval(formatName);
            };

            if (!$.numericFormat.formats[format]) {
                $.numericFormat.formats[format] = _numberFormat(num, format);
            };
            return $.numericFormat.formats[format](num);
        }
    });

})(jQuery);







/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqModal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Version: 03/01/2009 +r14
 */
(function($) {
    $.fn.jqm = function(o) {
        var p = {
            overlay: 50,
            overlayClass: 'jqmOverlay',
            closeClass: 'jqmClose',
            trigger: '.jqModal',
            ajax: F,
            ajaxText: '',
            target: F,
            modal: F,
            toTop: F,
            onShow: F,
            onHide: F,
            onLoad: F
        };
        return this.each(function() {
            if (this._jqm) return H[this._jqm].c = $.extend({}, H[this._jqm].c, o); s++; this._jqm = s;
            H[s] = { c: $.extend(p, $.jqm.params, o), a: F, w: $(this).addClass('jqmID' + s), s: s };
            if (p.trigger) $(this).jqmAddTrigger(p.trigger);
        });
    };

    $.fn.jqmAddClose = function(e) { return hs(this, e, 'jqmHide'); };
    $.fn.jqmAddTrigger = function(e) { return hs(this, e, 'jqmShow'); };
    $.fn.jqmShow = function(t) { return this.each(function() { t = t || window.event; $.jqm.open(this._jqm, t); }); };
    $.fn.jqmHide = function(t) { return this.each(function() { t = t || window.event; $.jqm.close(this._jqm, t) }); };

    $.jqm = {
        hash: {},
        open: function(s, t) {
            var h = H[s], c = h.c, cc = '.' + c.closeClass, z = (parseInt(h.w.css('z-index'))), z = (z > 0) ? z : 3000, o = $('<div></div>').css({ height: '100%', width: '100%', position: 'fixed', left: 0, top: 0, 'z-index': z - 1, opacity: c.overlay / 100 }); if (h.a) return F; h.t = t; h.a = true; h.w.css('z-index', z);
            if (c.modal) { if (!A[0]) L('bind'); A.push(s); }
            else if (c.overlay > 0) h.w.jqmAddClose(o);
            else o = F;

            h.o = (o) ? o.addClass(c.overlayClass).appendTo('body') : F;
            if (ie6) { $('html,body').css({ height: '100%', width: '100%' }); if (o) { o = o.css({ position: 'absolute' })[0]; for (var y in { Top: 1, Left: 1 }) o.style.setExpression(y.toLowerCase(), "(_=(document.documentElement.scroll" + y + " || document.body.scroll" + y + "))+'px'"); } }

            if (c.ajax) {
                var r = c.target || h.w, u = c.ajax, r = (typeof r == 'string') ? $(r, h.w) : $(r), u = (u.substr(0, 1) == '@') ? $(t).attr(u.substring(1)) : u;
                r.html(c.ajaxText).load(u, function() { if (c.onLoad) c.onLoad.call(this, h); if (cc) h.w.jqmAddClose($(cc, h.w)); e(h); });
            }
            else if (cc) h.w.jqmAddClose($(cc, h.w));

            if (c.toTop && h.o) h.w.before('<span id="jqmP' + h.w[0]._jqm + '"></span>').insertAfter(h.o);
            (c.onShow) ? c.onShow(h) : h.w.show(); e(h); return F;
        },
        close: function(s) {
            var h = H[s]; if (!h.a) return F; h.a = F;
            if (A[0]) { A.pop(); if (!A[0]) L('unbind'); }
            if (h.c.toTop && h.o) $('#jqmP' + h.w[0]._jqm).after(h.w).remove();
            if (h.c.onHide) h.c.onHide(h); else { h.w.hide(); if (h.o) h.o.remove(); } return F;
        },
        params: {}
    };
    var s = 0, H = $.jqm.hash, A = [], ie6 = $.browser.msie && ($.browser.version == "6.0"), F = false,
        i = $('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({ opacity: 0 }),
        e = function(h) { if (ie6) if (h.o) h.o.html('<p style="width:100%;height:100%"/>').prepend(i); else if (!$('iframe.jqm', h.w)[0]) h.w.prepend(i); f(h); },
        f = function(h) { try { $(':input:visible', h.w)[0].focus(); } catch (_) { } },
        L = function(t) { $()[t]("keypress", m)[t]("keydown", m)[t]("mousedown", m); },
        m = function(e) { var h = H[A[A.length - 1]], r = (!$(e.target).parents('.jqmID' + h.s)[0]); if (r) f(h); return !r; },
        hs = function(w, t, c) {
            return w.each(function() {
                var s = this._jqm; $(t).each(function() {
                    if (!this[c]) { this[c] = []; $(this).click(function() { for (var i in { jqmShow: 1, jqmHide: 1 }) for (var s in this[i]) if (H[this[i][s]]) H[this[i][s]].w[i](this); return F; }); } this[c].push(s);
                });
            });
        };
})(jQuery);







/**
 * TableDnD plug-in for JQuery, allows you to drag and drop table rows
 * You can set up various options to control how the system will work
 * Copyright (c) Denis Howlett <denish@isocra.com>
 * Licensed like jQuery, see http://docs.jquery.com/License.
 *
 * Configuration options:
 *
 * onDragStyle
 *     This is the style that is assigned to the row during drag. There are limitations to the styles that can be
 *     associated with a row (such as you can't assign a border--well you can, but it won't be
 *     displayed). (So instead consider using onDragClass.) The CSS style to apply is specified as
 *     a map (as used in the jQuery css(...) function).
 * onDropStyle
 *     This is the style that is assigned to the row when it is dropped. As for onDragStyle, there are limitations
 *     to what you can do. Also this replaces the original style, so again consider using onDragClass which
 *     is simply added and then removed on drop.
 * onDragClass
 *     This class is added for the duration of the drag and then removed when the row is dropped. It is more
 *     flexible than using onDragStyle since it can be inherited by the row cells and other content. The default
 *     is class is tDnD_whileDrag. So to use the default, simply customise this CSS class in your
 *     stylesheet.
 * onDrop
 *     Pass a function that will be called when the row is dropped. The function takes 2 parameters: the table
 *     and the row that was dropped. You can work out the new order of the rows by using
 *     table.rows.
 * onDragStart
 *     Pass a function that will be called when the user starts dragging. The function takes 2 parameters: the
 *     table and the row which the user has started to drag.
 * onAllowDrop
 *     Pass a function that will be called as a row is over another row. If the function returns true, allow
 *     dropping on that row, otherwise not. The function takes 2 parameters: the dragged row and the row under
 *     the cursor. It returns a boolean: true allows the drop, false doesn't allow it.
 * scrollAmount
 *     This is the number of pixels to scroll if the user moves the mouse cursor to the top or bottom of the
 *     window. The page should automatically scroll up or down as appropriate (tested in IE6, IE7, Safari, FF2,
 *     FF3 beta
 * dragHandle
 *     This is the name of a class that you assign to one or more cells in each row that is draggable. If you
 *     specify this class, then you are responsible for setting cursor: move in the CSS and only these cells
 *     will have the drag behaviour. If you do not specify a dragHandle, then you get the old behaviour where
 *     the whole row is draggable.
 *
 * Other ways to control behaviour:
 *
 * Add class="nodrop" to any rows for which you don't want to allow dropping, and class="nodrag" to any rows
 * that you don't want to be draggable.
 *
 * Inside the onDrop method you can also call $.tableDnD.serialize() this returns a string of the form
 * <tableID>[]=<rowID1>&<tableID>[]=<rowID2> so that you can send this back to the server. The table must have
 * an ID as must all the rows.
 *
 * Other methods:
 *
 * $("...").tableDnDUpdate()
 * Will update all the matching tables, that is it will reapply the mousedown method to the rows (or handle cells).
 * This is useful if you have updated the table rows using Ajax and you want to make the table draggable again.
 * The table maintains the original configuration (so you don't have to specify it again).
 *
 * $("...").tableDnDSerialize()
 * Will serialize and return the serialized string as above, but for each of the matching tables--so it can be
 * called from anywhere and isn't dependent on the currentTable being set up correctly before calling
 *
 * Known problems:
 * - Auto-scoll has some problems with IE7  (it scrolls even when it shouldn't), work-around: set scrollAmount to 0
 *
 * Version 0.2: 2008-02-20 First public version
 * Version 0.3: 2008-02-07 Added onDragStart option
 *                         Made the scroll amount configurable (default is 5 as before)
 * Version 0.4: 2008-03-15 Changed the noDrag/noDrop attributes to nodrag/nodrop classes
 *                         Added onAllowDrop to control dropping
 *                         Fixed a bug which meant that you couldn't set the scroll amount in both directions
 *                         Added serialize method
 * Version 0.5: 2008-05-16 Changed so that if you specify a dragHandle class it doesn't make the whole row
 *                         draggable
 *                         Improved the serialize method to use a default (and settable) regular expression.
 *                         Added tableDnDupate() and tableDnDSerialize() to be called when you are outside the table
 */
jQuery.tableDnD = {
    /** Keep hold of the current table being dragged */
    currentTable: null,
    /** Keep hold of the current drag object if any */
    dragObject: null,
    /** The current mouse offset */
    mouseOffset: null,
    /** Remember the old value of Y so that we don't do too much processing */
    oldY: 0,

    /** Actually build the structure */
    build: function(options) {
        // Set up the defaults if any

        this.each(function() {
            // This is bound to each matching table, set up the defaults and override with user options
            this.tableDnDConfig = jQuery.extend({
                onDragStyle: null,
                onDropStyle: null,
                // Add in the default class for whileDragging
                onDragClass: "tDnD_whileDrag",
                onDrop: null,
                onDragStart: null,
                scrollAmount: 5,
                serializeRegexp: /[^\-]*$/, // The regular expression to use to trim row IDs
                serializeParamName: null, // If you want to specify another parameter name instead of the table ID
                dragHandle: null // If you give the name of a class here, then only Cells with this class will be draggable
            }, options || {});
            // Now make the rows draggable
            jQuery.tableDnD.makeDraggable(this);
        });

        // Now we need to capture the mouse up and mouse move event
        // We can use bind so that we don't interfere with other event handlers
        jQuery(document)
            .bind('mousemove', jQuery.tableDnD.mousemove)
            .bind('mouseup', jQuery.tableDnD.mouseup);

        // Don't break the chain
        return this;
    },

    /** This function makes all the rows on the table draggable apart from those marked as "NoDrag" */
    makeDraggable: function(table) {
        var config = table.tableDnDConfig;
        if (table.tableDnDConfig.dragHandle) {
            // We only need to add the event to the specified cells
            var cells = jQuery("td." + table.tableDnDConfig.dragHandle, table);
            cells.each(function() {
                // The cell is bound to "this"
                jQuery(this).mousedown(function(ev) {
                    jQuery.tableDnD.dragObject = this.parentNode;
                    jQuery.tableDnD.currentTable = table;
                    jQuery.tableDnD.mouseOffset = jQuery.tableDnD.getMouseOffset(this, ev);
                    if (config.onDragStart) {
                        // Call the onDrop method if there is one
                        config.onDragStart(table, this);
                    }
                    return false;
                });
            })
        } else {
            // For backwards compatibility, we add the event to the whole row
            var rows = jQuery("tr", table); // get all the rows as a wrapped set
            rows.each(function() {
                // Iterate through each row, the row is bound to "this"
                var row = jQuery(this);
                if (!row.hasClass("nodrag")) {
                    row.mousedown(function(ev) {
                        if (ev.target.tagName == "TD") {
                            jQuery.tableDnD.dragObject = this;
                            jQuery.tableDnD.currentTable = table;
                            jQuery.tableDnD.mouseOffset = jQuery.tableDnD.getMouseOffset(this, ev);
                            if (config.onDragStart) {
                                // Call the onDrop method if there is one
                                config.onDragStart(table, this);
                            }
                            return false;
                        }
                    }).css("cursor", "move"); // Store the tableDnD object
                }
            });
        }
    },

    updateTables: function() {
        this.each(function() {
            // this is now bound to each matching table
            if (this.tableDnDConfig) {
                jQuery.tableDnD.makeDraggable(this);
            }
        })
    },

    /** Get the mouse coordinates from the event (allowing for browser differences) */
    mouseCoords: function(ev) {
        if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    },

    /** Given a target element and a mouse event, get the mouse offset from that element.
     To do this we need the element's position and the mouse position */
    getMouseOffset: function(target, ev) {
        ev = ev || window.event;

        var docPos = this.getPosition(target);
        var mousePos = this.mouseCoords(ev);
        return { x: mousePos.x - docPos.x, y: mousePos.y - docPos.y };
    },

    /** Get the position of an element by going up the DOM tree and adding up all the offsets */
    getPosition: function(e) {
        var left = 0;
        var top = 0;
        /** Safari fix -- thanks to Luis Chato for this! */
        if (e.offsetHeight == 0) {
            /** Safari 2 doesn't correctly grab the offsetTop of a table row
             this is detailed here:
             http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari/
             the solution is likewise noted there, grab the offset of a table cell in the row - the firstChild.
             note that firefox will return a text node as a first child, so designing a more thorough
             solution may need to take that into account, for now this seems to work in firefox, safari, ie */
            e = e.firstChild; // a table cell
        }

        while (e.offsetParent) {
            left += e.offsetLeft;
            top += e.offsetTop;
            e = e.offsetParent;
        }

        left += e.offsetLeft;
        top += e.offsetTop;

        return { x: left, y: top };
    },

    mousemove: function(ev) {
        if (jQuery.tableDnD.dragObject == null) {
            return;
        }

        var dragObj = jQuery(jQuery.tableDnD.dragObject);
        var config = jQuery.tableDnD.currentTable.tableDnDConfig;
        var mousePos = jQuery.tableDnD.mouseCoords(ev);
        var y = mousePos.y - jQuery.tableDnD.mouseOffset.y;
        //auto scroll the window
        var yOffset = window.pageYOffset;
        if (document.all) {
            // Windows version
            //yOffset=document.body.scrollTop;
            if (typeof document.compatMode != 'undefined' &&
                document.compatMode != 'BackCompat') {
                yOffset = document.documentElement.scrollTop;
            }
            else if (typeof document.body != 'undefined') {
                yOffset = document.body.scrollTop;
            }

        }

        if (mousePos.y - yOffset < config.scrollAmount) {
            window.scrollBy(0, -config.scrollAmount);
        } else {
            var windowHeight = window.innerHeight ? window.innerHeight
                : document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
            if (windowHeight - (mousePos.y - yOffset) < config.scrollAmount) {
                window.scrollBy(0, config.scrollAmount);
            }
        }


        if (y != jQuery.tableDnD.oldY) {
            // work out if we're going up or down...
            var movingDown = y > jQuery.tableDnD.oldY;
            // update the old value
            jQuery.tableDnD.oldY = y;
            // update the style to show we're dragging
            if (config.onDragClass) {
                dragObj.addClass(config.onDragClass);
            } else {
                dragObj.css(config.onDragStyle);
            }
            // If we're over a row then move the dragged row to there so that the user sees the
            // effect dynamically
            var currentRow = jQuery.tableDnD.findDropTargetRow(dragObj, y);
            if (currentRow) {
                // TODO worry about what happens when there are multiple TBODIES
                if (movingDown && jQuery.tableDnD.dragObject != currentRow) {
                    jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject, currentRow.nextSibling);
                } else if (!movingDown && jQuery.tableDnD.dragObject != currentRow) {
                    jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject, currentRow);
                }
            }
        }

        return false;
    },

    /** We're only worried about the y position really, because we can only move rows up and down */
    findDropTargetRow: function(draggedRow, y) {
        var rows = jQuery.tableDnD.currentTable.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var rowY = this.getPosition(row).y;
            var rowHeight = parseInt(row.offsetHeight) / 2;
            if (row.offsetHeight == 0) {
                rowY = this.getPosition(row.firstChild).y;
                rowHeight = parseInt(row.firstChild.offsetHeight) / 2;
            }
            // Because we always have to insert before, we need to offset the height a bit
            if ((y > rowY - rowHeight) && (y < (rowY + rowHeight))) {
                // that's the row we're over
                // If it's the same as the current row, ignore it
                if (row == draggedRow) { return null; }
                var config = jQuery.tableDnD.currentTable.tableDnDConfig;
                if (config.onAllowDrop) {
                    if (config.onAllowDrop(draggedRow, row)) {
                        return row;
                    } else {
                        return null;
                    }
                } else {
                    // If a row has nodrop class, then don't allow dropping (inspired by John Tarr and Famic)
                    var nodrop = jQuery(row).hasClass("nodrop");
                    if (!nodrop) {
                        return row;
                    } else {
                        return null;
                    }
                }
                return row;
            }
        }
        return null;
    },

    mouseup: function(e) {
        if (jQuery.tableDnD.currentTable && jQuery.tableDnD.dragObject) {
            var droppedRow = jQuery.tableDnD.dragObject;
            var config = jQuery.tableDnD.currentTable.tableDnDConfig;
            // If we have a dragObject, then we need to release it,
            // The row will already have been moved to the right place so we just reset stuff
            if (config.onDragClass) {
                jQuery(droppedRow).removeClass(config.onDragClass);
            } else {
                jQuery(droppedRow).css(config.onDropStyle);
            }
            jQuery.tableDnD.dragObject = null;
            if (config.onDrop) {
                // Call the onDrop method if there is one
                config.onDrop(jQuery.tableDnD.currentTable, droppedRow);
            }
            jQuery.tableDnD.currentTable = null; // let go of the table too
        }
    },

    serialize: function() {
        if (jQuery.tableDnD.currentTable) {
            return jQuery.tableDnD.serializeTable(jQuery.tableDnD.currentTable);
        } else {
            return "Error: No Table id set, you need to set an id on your table and every row";
        }
    },

    serializeTable: function(table) {
        var result = "";
        var tableId = table.id;
        var rows = table.rows;
        for (var i = 0; i < rows.length; i++) {
            if (result.length > 0) result += "&";
            var rowId = rows[i].id;
            if (rowId && rowId && table.tableDnDConfig && table.tableDnDConfig.serializeRegexp) {
                rowId = rowId.match(table.tableDnDConfig.serializeRegexp)[0];
            }

            result += tableId + '[]=' + rowId;
        }
        return result;
    },

    serializeTables: function() {
        var result = "";
        this.each(function() {
            // this is now bound to each matching table
            result += jQuery.tableDnD.serializeTable(this);
        });
        return result;
    }

}

jQuery.fn.extend(
    {
        tableDnD: jQuery.tableDnD.build,
        tableDnDUpdate: jQuery.tableDnD.updateTables,
        tableDnDSerialize: jQuery.tableDnD.serializeTables
    }
);




/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/*
 * jquery.tools 1.1.2 - The missing UI library for the Web
 *
 * [tools.tooltip-1.1.2, tools.tooltip.slide-1.0.0, tools.tooltip.dynamic-1.0.1, tools.scrollable-1.1.2, tools.scrollable.circular-0.5.1, tools.scrollable.autoscroll-1.0.1, tools.scrollable.navigator-1.0.2, tools.scrollable.mousewheel-1.0.1]
 *
 * Copyright (c) 2009 Tero Piirainen
 * http://flowplayer.org/tools/
 *
 * Dual licensed under MIT and GPL 2+ licenses
 * http://www.opensource.org/licenses
 *
 * -----
 *
 * jquery.event.wheel.js - rev 1
 * Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2008-07-01 | Updated: 2008-07-14
 *
 * -----
 *
 * File generated: Thu Oct 08 09:36:42 GMT+00:00 2009
 *
 * Updated by MA: Oct 01 2012
 */
(function(c){var d=[];c.tools=c.tools||{};c.tools.tooltip={version:"1.1.3",conf:{effect:"toggle",fadeOutSpeed:"fast",tip:null,predelay:0,delay:30,opacity:1,lazy:false,position:["top","center"],offset:[0,0],cancelDefault:true,relative:false,oneInstance:true,events:{def:"mouseover,mouseout",input:"focus,blur",widget:"focus mouseover,blur mouseout",tooltip:"mouseover,mouseout"},api:false},addEffect:function(e,g,f){b[e]=[g,f]}};var b={toggle:[function(e){var f=this.getConf(),g=this.getTip(),h=f.opacity;if(h<1){g.css({opacity:h})}g.show();e.call()},function(e){this.getTip().hide();e.call()}],fade:[function(e){this.getTip().fadeIn(this.getConf().fadeInSpeed,e)},function(e){this.getTip().fadeOut(this.getConf().fadeOutSpeed,e)}]};function a(f,g){var p=this,k=c(this);f.data("tooltip",p);var l=f.next();if(g.tip){l=c(g.tip);if(l.length>1){l=f.nextAll(g.tip).eq(0);if(!l.length){l=f.parent().nextAll(g.tip).eq(0)}}}function o(u){var t=g.relative?f.position().top:f.offset().top,s=g.relative?f.position().left:f.offset().left,v=g.position[0];t-=l.outerHeight()-g.offset[0];s+=f.outerWidth()+g.offset[1];var q=l.outerHeight()+f.outerHeight();if(v=="center"){t+=q/2}if(v=="bottom"){t+=q}v=g.position[1];var r=l.outerWidth()+f.outerWidth();if(v=="center"){s-=r/2}if(v=="left"){s-=r}return{top:t,left:s}}var i=f.is(":input"),e=i&&f.is(":checkbox, :radio, select, :button"),h=f.attr("type"),n=g.events[h]||g.events[i?(e?"widget":"input"):"def"];n=n.split(/,\s*/);if(n.length!=2){throw"Tooltip: bad events configuration for "+h}f.bind(n[0],function(r){if(g.oneInstance){c.each(d,function(){this.hide()})}var q=l.data("trigger");if(q&&q[0]!=this){l.hide().stop(true,true)}r.target=this;p.show(r);n=g.events.tooltip.split(/,\s*/);l.bind(n[0],function(){p.show(r)});if(n[1]){l.bind(n[1],function(){p.hide(r)})}});f.bind(n[1],function(q){p.hide(q)});if(!c.browser.msie&&!i&&!g.predelay){f.mousemove(function(){if(!p.isShown()){f.triggerHandler("mouseover")}})}if(g.opacity<1){l.css("opacity",g.opacity)}var m=0,j=f.attr("title");if(j&&g.cancelDefault){f.removeAttr("title");f.data("title",j)}c.extend(p,{show:function(r){if(r){f=c(r.target)}clearTimeout(l.data("timer"));if(l.is(":animated")||l.is(":visible")){return p}function q(){l.data("trigger",f);var t=o(r);if(g.tip&&j){l.html(f.data("title"))}r=c.Event();r.type="onBeforeShow";k.trigger(r,[t]);if(r.isDefaultPrevented()){return p}t=o(r);l.css({position:"absolute",top:t.top,left:t.left});var s=b[g.effect];if(!s){throw'Nonexistent effect "'+g.effect+'"'}s[0].call(p,function(){r.type="onShow";k.trigger(r)})}if(g.predelay){clearTimeout(m);m=setTimeout(q,g.predelay)}else{q()}return p},hide:function(r){clearTimeout(l.data("timer"));clearTimeout(m);if(!l.is(":visible")){return}function q(){r=c.Event();r.type="onBeforeHide";k.trigger(r);if(r.isDefaultPrevented()){return}b[g.effect][1].call(p,function(){r.type="onHide";k.trigger(r)})}if(g.delay&&r){l.data("timer",setTimeout(q,g.delay))}else{q()}return p},isShown:function(){return l.is(":visible, :animated")},getConf:function(){return g},getTip:function(){return l},getTrigger:function(){return f},bind:function(q,r){k.bind(q,r);return p},onHide:function(q){return this.bind("onHide",q)},onBeforeShow:function(q){return this.bind("onBeforeShow",q)},onShow:function(q){return this.bind("onShow",q)},onBeforeHide:function(q){return this.bind("onBeforeHide",q)},unbind:function(q){k.unbind(q);return p}});c.each(g,function(q,r){if(c.isFunction(r)){p.bind(q,r)}})}c.prototype.tooltip=function(e){var f=this.eq(typeof e=="number"?e:0).data("tooltip");if(f){return f}var g=c.extend(true,{},c.tools.tooltip.conf);if(c.isFunction(e)){e={onBeforeShow:e}}else{if(typeof e=="string"){e={tip:e}}}e=c.extend(true,g,e);if(typeof e.position=="string"){e.position=e.position.split(/,?\s/)}if(e.lazy!==false&&(e.lazy===true||this.length>20)){this.one("mouseover",function(h){f=new a(c(this),e);f.show(h);d.push(f)})}else{this.each(function(){f=new a(c(this),e);d.push(f)})}return e.api?f:this}})(jQuery);
(function(b){var a=b.tools.tooltip;a.effects=a.effects||{};a.effects.slide={version:"1.0.0"};b.extend(a.conf,{direction:"up",bounce:false,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!b.browser.msie});var c={up:["-","top"],down:["+","top"],left:["-","left"],right:["+","left"]};b.tools.tooltip.addEffect("slide",function(d){var f=this.getConf(),g=this.getTip(),h=f.slideFade?{opacity:f.opacity}:{},e=c[f.direction]||c.up;h[e[1]]=e[0]+"="+f.slideOffset;if(f.slideFade){g.css({opacity:0})}g.show().animate(h,f.slideInSpeed,d)},function(e){var g=this.getConf(),i=g.slideOffset,h=g.slideFade?{opacity:0}:{},f=c[g.direction]||c.up;var d=""+f[0];if(g.bounce){d=d=="+"?"-":"+"}h[f[1]]=d+"="+i;this.getTip().animate(h,g.slideOutSpeed,function(){b(this).hide();e.call()})})})(jQuery);
(function(d){var c=d.tools.tooltip;c.plugins=c.plugins||{};c.plugins.dynamic={version:"1.0.1",conf:{api:false,classNames:"top right bottom left"}};function b(h){var e=d(window);var g=e.width()+e.scrollLeft();var f=e.height()+e.scrollTop();return[h.offset().top<=e.scrollTop(),g<=h.offset().left+h.width(),f<=h.offset().top+h.height(),e.scrollLeft()>=h.offset().left]}function a(f){var e=f.length;while(e--){if(f[e]){return false}}return true}d.fn.dynamic=function(g){var h=d.extend({},c.plugins.dynamic.conf),f;if(typeof g=="number"){g={speed:g}}g=d.extend(h,g);var e=g.classNames.split(/\s/),i;this.each(function(){if(d(this).tooltip().jquery){throw"Lazy feature not supported by dynamic plugin. set lazy: false for tooltip"}var j=d(this).tooltip().onBeforeShow(function(n,o){var m=this.getTip(),l=this.getConf();if(!i){i=[l.position[0],l.position[1],l.offset[0],l.offset[1],d.extend({},l)]}d.extend(l,i[4]);l.position=[i[0],i[1]];l.offset=[i[2],i[3]];m.css({visibility:"hidden",position:"absolute",top:o.top,left:o.left}).show();var k=b(m);if(!a(k)){if(k[2]){d.extend(l,g.top);l.position[0]="top";m.addClass(e[0])}if(k[3]){d.extend(l,g.right);l.position[1]="right";m.addClass(e[1])}if(k[0]){d.extend(l,g.bottom);l.position[0]="bottom";m.addClass(e[2])}if(k[1]){d.extend(l,g.left);l.position[1]="left";m.addClass(e[3])}if(k[0]||k[2]){l.offset[0]*=-1}if(k[1]||k[3]){l.offset[1]*=-1}}m.css({visibility:"visible"}).hide()});j.onShow(function(){var l=this.getConf(),k=this.getTip();l.position=[i[0],i[1]];l.offset=[i[2],i[3]]});j.onHide(function(){var k=this.getTip();k.removeClass(g.classNames)});f=j});return g.api?f:this}})(jQuery);
(function(b){b.tools=b.tools||{};b.tools.scrollable={version:"1.1.2",conf:{size:5,vertical:false,speed:400,keyboard:true,keyboardSteps:null,disabledClass:"disabled",hoverClass:null,clickable:true,activeClass:"active",easing:"swing",loop:false,items:".items",item:null,prev:".prev",next:".next",prevPage:".prevPage",nextPage:".nextPage",api:false}};var c;function a(o,m){var r=this,p=b(this),d=!m.vertical,e=o.children(),k=0,i;if(!c){c=r}b.each(m,function(s,t){if(b.isFunction(t)){p.bind(s,t)}});if(e.length>1){e=b(m.items,o)}function l(t){var s=b(t);return m.globalNav?s:o.parent().find(t)}o.data("finder",l);var f=l(m.prev),h=l(m.next),g=l(m.prevPage),n=l(m.nextPage);b.extend(r,{getIndex:function(){return k},getClickIndex:function(){var s=r.getItems();return s.index(s.filter("."+m.activeClass))},getConf:function(){return m},getSize:function(){return r.getItems().size()},getPageAmount:function(){return Math.ceil(this.getSize()/m.size)},getPageIndex:function(){return Math.ceil(k/m.size)},getNaviButtons:function(){return f.add(h).add(g).add(n)},getRoot:function(){return o},getItemWrap:function(){return e},getItems:function(){return e.children(m.item)},getVisibleItems:function(){return r.getItems().slice(k,k+m.size)},seekTo:function(s,w,t){if(s<0){s=0}if(k===s){return r}if(b.isFunction(w)){t=w}if(s>r.getSize()-m.size){return m.loop?r.begin():this.end()}var u=r.getItems().eq(s);if(!u.length){return r}var v=b.Event("onBeforeSeek");p.trigger(v,[s]);if(v.isDefaultPrevented()){return r}if(w===undefined||b.isFunction(w)){w=m.speed}function x(){if(t){t.call(r,s)}p.trigger("onSeek",[s])}if(d){e.animate({left:-u.position().left},w,m.easing,x)}else{e.animate({top:-u.position().top},w,m.easing,x)}c=r;k=s;v=b.Event("onStart");p.trigger(v,[s]);if(v.isDefaultPrevented()){return r}f.add(g).toggleClass(m.disabledClass,s===0);h.add(n).toggleClass(m.disabledClass,s>=r.getSize()-m.size);return r},move:function(u,t,s){i=u>0;return this.seekTo(k+u,t,s)},next:function(t,s){return this.move(1,t,s)},prev:function(t,s){return this.move(-1,t,s)},movePage:function(w,v,u){i=w>0;var s=m.size*w;var t=k%m.size;if(t>0){s+=(w>0?-t:m.size-t)}return this.move(s,v,u)},prevPage:function(t,s){return this.movePage(-1,t,s)},nextPage:function(t,s){return this.movePage(1,t,s)},setPage:function(t,u,s){return this.seekTo(t*m.size,u,s)},begin:function(t,s){i=false;return this.seekTo(0,t,s)},end:function(t,s){i=true;var u=this.getSize()-m.size;return u>0?this.seekTo(u,t,s):r},reload:function(){p.trigger("onReload");return r},focus:function(){c=r;return r},click:function(u){var v=r.getItems().eq(u),s=m.activeClass,t=m.size;if(u<0||u>=r.getSize()){return r}if(t==1){if(m.loop){return r.next()}if(u===0||u==r.getSize()-1){i=(i===undefined)?true:!i}return i===false?r.prev():r.next()}if(t==2){if(u==k){u--}r.getItems().removeClass(s);v.addClass(s);return r.seekTo(u,time,fn)}if(!v.hasClass(s)){r.getItems().removeClass(s);v.addClass(s);var x=Math.floor(t/2);var w=u-x;if(w>r.getSize()-t){w=r.getSize()-t}if(w!==u){return r.seekTo(w)}}return r},bind:function(s,t){p.bind(s,t);return r},unbind:function(s){p.unbind(s);return r}});b.each("onBeforeSeek,onStart,onSeek,onReload".split(","),function(s,t){r[t]=function(u){return r.bind(t,u)}});f.addClass(m.disabledClass).click(function(){r.prev()});h.click(function(){r.next()});n.click(function(){r.nextPage()});if(r.getSize()<m.size){h.add(n).addClass(m.disabledClass)}g.addClass(m.disabledClass).click(function(){r.prevPage()});var j=m.hoverClass,q="keydown."+Math.random().toString().substring(10);r.onReload(function(){if(j){r.getItems().hover(function(){b(this).addClass(j)},function(){b(this).removeClass(j)})}if(m.clickable){r.getItems().each(function(s){b(this).unbind("click.scrollable").bind("click.scrollable",function(t){if(b(t.target).is("a")){return}return r.click(s)})})}if(m.keyboard){b(document).unbind(q).bind(q,function(t){if(t.altKey||t.ctrlKey){return}if(m.keyboard!="static"&&c!=r){return}var u=m.keyboardSteps;if(d&&(t.keyCode==37||t.keyCode==39)){r.move(t.keyCode==37?-u:u);return t.preventDefault()}if(!d&&(t.keyCode==38||t.keyCode==40)){r.move(t.keyCode==38?-u:u);return t.preventDefault()}return true})}else{b(document).unbind(q)}});r.reload()}b.fn.scrollable=function(d){var e=this.eq(typeof d=="number"?d:0).data("scrollable");if(e){return e}var f=b.extend({},b.tools.scrollable.conf);d=b.extend(f,d);d.keyboardSteps=d.keyboardSteps||d.size;this.each(function(){e=new a(b(this),d);b(this).data("scrollable",e)});return d.api?e:this}})(jQuery);
(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.circular={version:"0.5.1",conf:{api:false,clonedClass:"cloned"}};b.fn.circular=function(e){var d=b.extend({},a.plugins.circular.conf),c;b.extend(d,e);this.each(function(){var i=b(this).scrollable(),n=i.getItems(),k=i.getConf(),f=i.getItemWrap(),j=0;if(i){c=i}if(n.length<k.size){return false}n.slice(0,k.size).each(function(o){b(this).clone().appendTo(f).click(function(){i.click(n.length+o)}).addClass(d.clonedClass)});var l=b.makeArray(n.slice(-k.size)).reverse();b(l).each(function(o){b(this).clone().prependTo(f).click(function(){i.click(-o-1)}).addClass(d.clonedClass)});var m=f.children(k.item);var h=k.hoverClass;if(h){m.hover(function(){b(this).addClass(h)},function(){b(this).removeClass(h)})}function g(o){var p=m.eq(o);if(k.vertical){f.css({top:-p.position().top})}else{f.css({left:-p.position().left})}}g(k.size);b.extend(i,{move:function(s,r,p,q){var u=j+s+k.size;var t=u>i.getSize()-k.size;if(u<=0||t){var o=j+k.size+(t?-n.length:n.length);g(o);u=o+s}if(q){m.removeClass(k.activeClass).eq(u+Math.floor(k.size/2)).addClass(k.activeClass)}if(u===j+k.size){return self}return i.seekTo(u,r,p)},begin:function(p,o){return this.seekTo(k.size,p,o)},end:function(p,o){return this.seekTo(n.length,p,o)},click:function(p,r,q){if(!k.clickable){return self}if(k.size==1){return this.next()}var s=p-j,o=k.activeClass;s-=Math.floor(k.size/2);return this.move(s,r,q,true)},getIndex:function(){return j},setPage:function(p,q,o){return this.seekTo(p*k.size+k.size,q,o)},getPageAmount:function(){return Math.ceil(n.length/k.size)},getPageIndex:function(){if(j<0){return this.getPageAmount()-1}if(j>=n.length){return 0}var o=(j+k.size)/k.size-1;return o},getVisibleItems:function(){var o=j+k.size;return m.slice(o,o+k.size)}});i.onStart(function(p,o){j=o-k.size;return false});i.getNaviButtons().removeClass(k.disabledClass)});return d.api?c:this}})(jQuery);
(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.autoscroll={version:"1.0.1",conf:{autoplay:true,interval:3000,autopause:true,steps:1,api:false}};b.fn.autoscroll=function(d){if(typeof d=="number"){d={interval:d}}var e=b.extend({},a.plugins.autoscroll.conf),c;b.extend(e,d);this.each(function(){var g=b(this).scrollable();if(g){c=g}var i,f,h=true;g.play=function(){if(i){return}h=false;i=setInterval(function(){g.move(e.steps)},e.interval);g.move(e.steps)};g.pause=function(){i=clearInterval(i)};g.stop=function(){g.pause();h=true};if(e.autopause){g.getRoot().add(g.getNaviButtons()).hover(function(){g.pause();clearInterval(f)},function(){if(!h){f=setTimeout(g.play,e.interval)}})}if(e.autoplay){setTimeout(g.play,e.interval)}});return e.api?c:this}})(jQuery);
(function(b){var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.navigator={version:"1.0.2",conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:false,api:false,idPrefix:null}};b.fn.navigator=function(d){var e=b.extend({},a.plugins.navigator.conf),c;if(typeof d=="string"){d={navi:d}}d=b.extend(e,d);this.each(function(){var i=b(this).scrollable(),f=i.getRoot(),l=f.data("finder").call(null,d.navi),g=null,k=i.getNaviButtons();if(i){c=i}i.getNaviButtons=function(){return k.add(l)};function j(){if(!l.children().length||l.data("navi")==i){l.empty();l.data("navi",i);for(var m=0;m<i.getPageAmount();m++){l.append(b("<"+(d.naviItem||"a")+"/>"))}g=l.children().each(function(n){var o=b(this);o.click(function(p){i.setPage(n);return p.preventDefault()});if(d.indexed){o.text(n)}if(d.idPrefix){o.attr("id",d.idPrefix+n)}})}else{g=d.naviItem?l.find(d.naviItem):l.children();g.each(function(n){var o=b(this);o.click(function(p){i.setPage(n);return p.preventDefault()})})}g.eq(0).addClass(d.activeClass)}i.onStart(function(o,n){var m=d.activeClass;g.removeClass(m).eq(i.getPageIndex()).addClass(m)});i.onReload(function(){j()});j();var h=g.filter("[href="+location.hash+"]");if(h.length){i.move(g.index(h))}});return d.api?c:this}})(jQuery);
(function(b){b.fn.wheel=function(e){return this[e?"bind":"trigger"]("wheel",e)};b.event.special.wheel={setup:function(){b.event.add(this,d,c,{})},teardown:function(){b.event.remove(this,d,c)}};var d=!b.browser.mozilla?"mousewheel":"DOMMouseScroll"+(b.browser.version<"1.9"?" mousemove":"");function c(e){switch(e.type){case"mousemove":return b.extend(e.data,{clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY});case"DOMMouseScroll":b.extend(e,e.data);e.delta=-e.detail/3;break;case"mousewheel":e.delta=e.wheelDelta/120;break}e.type="wheel";return b.event.handle.call(this,e,e.delta)}var a=b.tools.scrollable;a.plugins=a.plugins||{};a.plugins.mousewheel={version:"1.0.1",conf:{api:false,speed:50}};b.fn.mousewheel=function(f){var g=b.extend({},a.plugins.mousewheel.conf),e;if(typeof f=="number"){f={speed:f}}f=b.extend(g,f);this.each(function(){var h=b(this).scrollable();if(h){e=h}h.getRoot().wheel(function(i,j){h.move(j<0?1:-1,f.speed||50);return false})});return f.api?e:this}})(jQuery);
(function(c){c.tools=c.tools||{};c.tools.overlay={version:"1.1.2",addEffect:function(e,f,g){b[e]=[f,g]},conf:{top:"10%",left:"center",absolute:false,speed:"normal",closeSpeed:"fast",effect:"default",close:null,oneInstance:true,closeOnClick:true,closeOnEsc:true,api:false,expose:null,target:null}};var b={};c.tools.overlay.addEffect("default",function(e){this.getOverlay().fadeIn(this.getConf().speed,e)},function(e){this.getOverlay().fadeOut(this.getConf().closeSpeed,e)});var d=[];function a(g,k){var o=this,m=c(this),n=c(window),j,i,h,e=k.expose&&c.tools.expose.version;var f=k.target||g.attr("rel");i=f?c(f):null||g;if(!i.length){throw"Could not find Overlay: "+f}if(g&&g.index(i)==-1){g.click(function(p){o.load(p);return p.preventDefault()})}c.each(k,function(p,q){if(c.isFunction(q)){m.bind(p,q)}});c.extend(o,{load:function(u){if(o.isOpened()){return o}var r=b[k.effect];if(!r){throw'Overlay: cannot find effect : "'+k.effect+'"'}if(k.oneInstance){c.each(d,function(){this.close(u)})}u=u||c.Event();u.type="onBeforeLoad";m.trigger(u);if(u.isDefaultPrevented()){return o}h=true;if(e){i.expose().load(u)}var t=k.top;var s=k.left;var p=i.outerWidth(true);var q=i.outerHeight(true);if(typeof t=="string"){t=t=="center"?Math.max((n.height()-q)/2,0):parseInt(t,10)/100*n.height()}if(s=="center"){s=Math.max((n.width()-p)/2,0)}if(!k.absolute){t+=n.scrollTop();s+=n.scrollLeft()}i.css({top:t,left:s,position:"absolute"});u.type="onStart";m.trigger(u);r[0].call(o,function(){if(h){u.type="onLoad";m.trigger(u)}});if(k.closeOnClick){c(document).bind("click.overlay",function(w){if(!o.isOpened()){return}var v=c(w.target);if(v.parents(i).length>1){return}c.each(d,function(){this.close(w)})})}if(k.closeOnEsc){c(document).unbind("keydown.overlay").bind("keydown.overlay",function(v){if(v.keyCode==27){c.each(d,function(){this.close(v)})}})}return o},close:function(q){if(!o.isOpened()){return o}q=q||c.Event();q.type="onBeforeClose";m.trigger(q);if(q.isDefaultPrevented()){return}h=false;b[k.effect][1].call(o,function(){q.type="onClose";m.trigger(q)});var p=true;c.each(d,function(){if(this.isOpened()){p=false}});if(p){c(document).unbind("click.overlay").unbind("keydown.overlay")}return o},getContent:function(){return i},getOverlay:function(){return i},getTrigger:function(){return g},getClosers:function(){return j},isOpened:function(){return h},getConf:function(){return k},bind:function(p,q){m.bind(p,q);return o},unbind:function(p){m.unbind(p);return o}});c.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(p,q){o[q]=function(r){return o.bind(q,r)}});if(e){if(typeof k.expose=="string"){k.expose={color:k.expose}}c.extend(k.expose,{api:true,closeOnClick:k.closeOnClick,closeOnEsc:false});var l=i.expose(k.expose);l.onBeforeClose(function(p){o.close(p)});o.onClose(function(p){l.close(p)})}j=i.find(k.close||".close");if(!j.length&&!k.close){j=c('<div class="close"></div>');i.prepend(j)}j.click(function(p){o.close(p)})}c.fn.overlay=function(e){var f=this.eq(typeof e=="number"?e:0).data("overlay");if(f){return f}if(c.isFunction(e)){e={onBeforeLoad:e}}var g=c.extend({},c.tools.overlay.conf);e=c.extend(true,g,e);this.each(function(){f=new a(c(this),e);d.push(f);c(this).data("overlay",f)});return e.api?f:this}})(jQuery);
(function(d){var b=d.tools.overlay;b.effects=b.effects||{};b.effects.apple={version:"1.0.1"};d.extend(b.conf,{start:{absolute:true,top:null,left:null},fadeInSpeed:"fast",zIndex:99999999});function c(f){var g=f.offset();return[g.top+f.height()/2,g.left+f.width()/2]}var e=function(n){var k=this.getOverlay(),f=this.getConf(),i=this.getTrigger(),q=this,r=k.outerWidth(true),m=k.data("img");if(!m){var l=k.css("backgroundImage");if(!l){throw"background-image CSS property not set for overlay"}l=l.substring(l.indexOf("(")+1,l.indexOf(")")).replace(/\"/g,"");k.css("backgroundImage","none");m=d('<img src="'+l+'"/>');m.css({border:0,position:"absolute",display:"none"}).width(r);d("body").append(m);k.data("img",m)}var o=d(window),j=f.start.top||Math.round(o.height()/2),h=f.start.left||Math.round(o.width()/2);if(i){var g=c(i);j=g[0];h=g[1]}if(!f.start.absolute){j+=o.scrollTop();h+=o.scrollLeft()}m.css({top:j,left:h,width:0,zIndex:f.zIndex}).show();m.animate({top:k.css("top"),left:k.css("left"),width:r},f.speed,function(){k.css("zIndex",f.zIndex+1).fadeIn(f.fadeInSpeed,function(){if(q.isOpened()&&!d(this).index(k)){n.call()}else{k.hide()}})})};var a=function(f){var h=this.getOverlay(),i=this.getConf(),g=this.getTrigger(),l=i.start.top,k=i.start.left;h.hide();if(g){var j=c(g);l=j[0];k=j[1]}h.data("img").animate({top:l,left:k,width:0},i.closeSpeed,f)};b.addEffect("apple",e,a)})(jQuery);
(function(b){b.tools=b.tools||{};b.tools.expose={version:"1.0.5",conf:{maskId:null,loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,color:"#456",api:false}};function a(){if(b.browser.msie){var f=b(document).height(),e=b(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,f-e<20?e:f]}return[b(window).width(),b(document).height()]}function c(h,g){var e=this,j=b(this),d=null,f=false,i=0;b.each(g,function(k,l){if(b.isFunction(l)){j.bind(k,l)}});b(window).resize(function(){e.fit()});b.extend(this,{getMask:function(){return d},getExposed:function(){return h},getConf:function(){return g},isLoaded:function(){return f},load:function(n){if(f){return e}i=h.eq(0).css("zIndex");if(g.maskId){d=b("#"+g.maskId)}if(!d||!d.length){var l=a();d=b("<div/>").css({position:"absolute",top:0,left:0,width:l[0],height:l[1],display:"none",opacity:0,zIndex:g.zIndex});if(g.maskId){d.attr("id",g.maskId)}b("body").append(d);var k=d.css("backgroundColor");if(!k||k=="transparent"||k=="rgba(0, 0, 0, 0)"){d.css("backgroundColor",g.color)}if(g.closeOnEsc){b(document).bind("keydown.unexpose",function(o){if(o.keyCode==27){e.close()}})}if(g.closeOnClick){d.bind("click.unexpose",function(o){e.close(o)})}}n=n||b.Event();n.type="onBeforeLoad";j.trigger(n);if(n.isDefaultPrevented()){return e}b.each(h,function(){var o=b(this);if(!/relative|absolute|fixed/i.test(o.css("position"))){o.css("position","relative")}});h.css({zIndex:Math.max(g.zIndex+1,i=="auto"?0:i)});var m=d.height();if(!this.isLoaded()){d.css({opacity:0,display:"block"}).fadeTo(g.loadSpeed,g.opacity,function(){if(d.height()!=m){d.css("height",m)}n.type="onLoad";j.trigger(n)})}f=true;return e},close:function(k){if(!f){return e}k=k||b.Event();k.type="onBeforeClose";j.trigger(k);if(k.isDefaultPrevented()){return e}d.fadeOut(g.closeSpeed,function(){k.type="onClose";j.trigger(k);h.css({zIndex:b.browser.msie?i:null})});f=false;return e},fit:function(){if(d){var k=a();d.css({width:k[0],height:k[1]})}},bind:function(k,l){j.bind(k,l);return e},unbind:function(k){j.unbind(k);return e}});b.each("onBeforeLoad,onLoad,onBeforeClose,onClose".split(","),function(k,l){e[l]=function(m){return e.bind(l,m)}})}b.fn.expose=function(d){var e=this.eq(typeof d=="number"?d:0).data("expose");if(e){return e}if(typeof d=="string"){d={color:d}}var f=b.extend({},b.tools.expose.conf);d=b.extend(f,d);this.each(function(){e=new c(b(this),d);b(this).data("expose",e)});return d.api?e:this}})(jQuery);


/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are four supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *   html5: Values are stored in data-* attributes.
 *
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 *
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 *
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 *
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 *
 * @example <p id="one" class="some_class" data-item_id="1" data-item_label="Label">This is a p</p>
 * @before $.metadata.setType("html5")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a series of data-* attributes
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) { $.extend({ metadata: { defaults: { type: "class", name: "metadata", cre: /({.*})/, single: "metadata" }, setType: function(type, name) { this.defaults.type = type; this.defaults.name = name }, get: function(elem, opts) { var settings = $.extend({}, this.defaults, opts); if (!settings.single.length) { settings.single = "metadata" } var data = $.data(elem, settings.single); if (data) { return data } data = "{}"; var getData = function(data) { if (typeof data != "string") { return data } if (data.indexOf("{") < 0) { data = eval("(" + data + ")") } }; var getObject = function(data) { if (typeof data != "string") { return data } data = eval("(" + data + ")"); return data }; if (settings.type == "html5") { var object = {}; $(elem.attributes).each(function() { var name = this.nodeName; if (name.match(/^data-/)) { name = name.replace(/^data-/, "") } else { return true } object[name] = getObject(this.nodeValue) }) } else { if (settings.type == "class") { var m = settings.cre.exec(elem.className); if (m) { data = m[1] } } else { if (settings.type == "elem") { if (!elem.getElementsByTagName) { return } var e = elem.getElementsByTagName(settings.name); if (e.length) { data = $.trim(e[0].innerHTML) } } else { if (elem.getAttribute != undefined) { var attr = elem.getAttribute(settings.name); if (attr) { data = attr } } } } object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data) } $.data(elem, settings.single, object); return object } } }); $.fn.metadata = function(opts) { return $.metadata.get(this[0], opts) } })(jQuery);



/*
 * Match Heights jQuery Plugin
 *
 * Version 1.7.2 (Updated 7/31/2013)
 * Copyright (c) 2010-2013 Mike Avello
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function (d) { d.fn.matchHeights = function (a) { a = jQuery.extend(this, { minHeight: null, maxHeight: null, extension: 0, overflow: null, includeMargin: !1 }, a); var e = a.extension, b = a.minHeight ? a.minHeight : 0; this.each(function () { b = Math.max(b, d(this).outerHeight()) }); a.maxHeight && b > a.maxHeight && (b = a.maxHeight); return this.each(function () { var c = d(this), f = c.innerHeight() - c.height() + (c.outerHeight(a.includeMargin) - c.innerHeight()); a.overflow ? c.css({ height: b - f + e, overflow: a.overflow }) : c.css({ "min-height": b - f + e }) }) } })(jQuery);



/* Copyright (c) 2006 Mathias Bank (http://www.mathias-bank.de)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Thanks to Hinnerk Ruemenapf - http://hinnerk.ruemenapf.de/ for bug reporting and fixing.
 */
jQuery.extend({
    /**
     * Returns get parameters.
     *
     * If the desired param does not exist, null will be returned
     *
     * @example value = $.getURLParam("paramName");
     */
    getURLParam: function(strParamName){
        var strReturn = "";
        var strHref = window.location.href;
        var bFound=false;

        var cmpstring = strParamName + "=";
        var cmplen = cmpstring.length;

        if ( strHref.indexOf("?") > -1 ){
            var strQueryString = strHref.substr(strHref.indexOf("?")+1);
            var aQueryString = strQueryString.split("&");
            for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
                if (aQueryString[iParam].substr(0,cmplen)==cmpstring){
                    var aParam = aQueryString[iParam].split("=");
                    strReturn = aParam[1];
                    bFound=true;
                    break;
                }

            }
        }
        if (bFound==false) return null;
        return strReturn;
    }
});

/*
 * jQuery blockUI plugin
 * Version 2.28 (02-DEC-2009)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2008 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
(function(g){g.fn._fadeIn=g.fn.fadeIn;var i=document.documentMode||0;var d=g.browser.msie&&((g.browser.version<8&&!i)||i<8);var e=g.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!i;g.blockUI=function(o){c(window,o)};g.unblockUI=function(o){h(window,o)};g.growlUI=function(s,q,r,o){var p=g('<div class="growlUI"></div>');if(s){p.append("<h1>"+s+"</h1>")}if(q){p.append("<h2>"+q+"</h2>")}if(r==undefined){r=3000}g.blockUI({message:p,fadeIn:700,fadeOut:1000,centerY:false,timeout:r,showOverlay:false,onUnblock:o,css:g.blockUI.defaults.growlCSS})};g.fn.block=function(o){return this.unblock({fadeOut:0}).each(function(){if(g.css(this,"position")=="static"){this.style.position="relative"}if(g.browser.msie){this.style.zoom=1}c(this,o)})};g.fn.unblock=function(o){return this.each(function(){h(this,o)})};g.blockUI.version=2.28;g.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:0.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onUnblock:null,quirksmodeOffsetHack:4};var b=null;var f=[];function c(o,B){var v=(o==window);var r=B&&B.message!==undefined?B.message:undefined;B=g.extend({},g.blockUI.defaults,B||{});B.overlayCSS=g.extend({},g.blockUI.defaults.overlayCSS,B.overlayCSS||{});var x=g.extend({},g.blockUI.defaults.css,B.css||{});var I=g.extend({},g.blockUI.defaults.themedCSS,B.themedCSS||{});r=r===undefined?B.message:r;if(v&&b){h(window,{fadeOut:0})}if(r&&typeof r!="string"&&(r.parentNode||r.jquery)){var D=r.jquery?r[0]:r;var J={};g(o).data("blockUI.history",J);J.el=D;J.parent=D.parentNode;J.display=D.style.display;J.position=D.style.position;if(J.parent){J.parent.removeChild(D)}}var w=B.baseZ;var H=(g.browser.msie||B.forceIframe)?g('<iframe class="blockUI" style="z-index:'+(w++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+B.iframeSrc+'"></iframe>'):g('<div class="blockUI" style="display:none"></div>');var G=g('<div class="blockUI blockOverlay" style="z-index:'+(w++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var F;if(B.theme&&v){var C='<div class="blockUI blockMsg blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+w+';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(B.title||"&nbsp;")+'</div><div class="ui-widget-content ui-dialog-content"></div></div>';F=g(C)}else{F=v?g('<div class="blockUI blockMsg blockPage" style="z-index:'+w+';display:none;position:fixed"></div>'):g('<div class="blockUI blockMsg blockElement" style="z-index:'+w+';display:none;position:absolute"></div>')}if(r){if(B.theme){F.css(I);F.addClass("ui-widget-content")}else{F.css(x)}}if(!B.applyPlatformOpacityRules||!(g.browser.mozilla&&/Linux/.test(navigator.platform))){G.css(B.overlayCSS)}G.css("position",v?"fixed":"absolute");if(g.browser.msie||B.forceIframe){H.css("opacity",0)}g([H[0],G[0],F[0]]).appendTo(v?"body":o);if(B.theme&&B.draggable&&g.fn.draggable){F.draggable({handle:".ui-dialog-titlebar",cancel:"li"})}var q=d&&(!g.boxModel||g("object,embed",v?null:o).length>0);if(e||q){if(v&&B.allowBodyStretch&&g.boxModel){g("html,body").css("height","100%")}if((e||!g.boxModel)&&!v){var A=l(o,"borderTopWidth"),E=l(o,"borderLeftWidth");var u=A?"(0 - "+A+")":0;var y=E?"(0 - "+E+")":0}g.each([H,G,F],function(t,M){var z=M[0].style;z.position="absolute";if(t<2){v?z.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:"+B.quirksmodeOffsetHack+') + "px"'):z.setExpression("height",'this.parentNode.offsetHeight + "px"');v?z.setExpression("width",'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):z.setExpression("width",'this.parentNode.offsetWidth + "px"');if(y){z.setExpression("left",y)}if(u){z.setExpression("top",u)}}else{if(B.centerY){if(v){z.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')}z.marginTop=0}else{if(!B.centerY&&v){var K=(B.css&&B.css.top)?parseInt(B.css.top):0;var L="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+K+') + "px"';z.setExpression("top",L)}}}})}if(r){if(B.theme){F.find(".ui-widget-content").append(r)}else{F.append(r)}if(r.jquery||r.nodeType){g(r).show()}}if((g.browser.msie||B.forceIframe)&&B.showOverlay){H.show()}if(B.fadeIn){if(B.showOverlay){G._fadeIn(B.fadeIn)}if(r){F.fadeIn(B.fadeIn)}}else{if(B.showOverlay){G.show()}if(r){F.show()}}k(1,o,B);if(v){b=F[0];f=g(":input:enabled:visible",b);if(B.focusInput){setTimeout(n,20)}}else{a(F[0],B.centerX,B.centerY)}if(B.timeout){var p=setTimeout(function(){v?g.unblockUI(B):g(o).unblock(B)},B.timeout);g(o).data("blockUI.timeout",p)}}function h(r,s){var q=(r==window);var p=g(r);var t=p.data("blockUI.history");var u=p.data("blockUI.timeout");if(u){clearTimeout(u);p.removeData("blockUI.timeout")}s=g.extend({},g.blockUI.defaults,s||{});k(0,r,s);var o;if(q){o=g("body").children().filter(".blockUI").add("body > .blockUI")}else{o=g(".blockUI",r)}if(q){b=f=null}if(s.fadeOut){o.fadeOut(s.fadeOut);setTimeout(function(){j(o,t,s,r)},s.fadeOut)}else{j(o,t,s,r)}}function j(o,r,q,p){o.each(function(s,t){if(this.parentNode){this.parentNode.removeChild(this)}});if(r&&r.el){r.el.style.display=r.display;r.el.style.position=r.position;if(r.parent){r.parent.appendChild(r.el)}g(p).removeData("blockUI.history")}if(typeof q.onUnblock=="function"){q.onUnblock(p,q)}}function k(o,s,t){var r=s==window,q=g(s);if(!o&&(r&&!b||!r&&!q.data("blockUI.isBlocked"))){return}if(!r){q.data("blockUI.isBlocked",o)}if(!t.bindEvents||(o&&!t.showOverlay)){return}var p="mousedown mouseup keydown keypress";o?g(document).bind(p,t,m):g(document).unbind(p,m)}function m(r){if(r.keyCode&&r.keyCode==9){if(b&&r.data.constrainTabKey){var q=f;var p=!r.shiftKey&&r.target==q[q.length-1];var o=r.shiftKey&&r.target==q[0];if(p||o){setTimeout(function(){n(o)},10);return false}}}if(g(r.target).parents("div.blockMsg").length>0){return true}return g(r.target).parents().children().filter("div.blockUI").length==0}function n(o){if(!f){return}var p=f[o===true?f.length-1:0];if(p){try{p.focus()}catch(ex){}}}function a(v,o,z){var w=v.parentNode,u=v.style;var q=((w.offsetWidth-v.offsetWidth)/2)-l(w,"borderLeftWidth");var r=((w.offsetHeight-v.offsetHeight)/2)-l(w,"borderTopWidth");if(o){u.left=q>0?(q+"px"):"0"}if(z){u.top=r>0?(r+"px"):"0"}}function l(o,q){return parseInt(g.css(o,q))||0}})(jQuery);

/*
 Simple function to use POST with JSON using same implementation as $.getJSON
 */
$.extend({ postJSON: function(url, callback) { $.post(url, null, callback, "json"); } });


/**
 *  Ajax Autocomplete for jQuery, version 1.1.3
 *  (c) 2010 Tomas Kirda
 *
 *  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
 *  For details, see the web site: http://www.devbridge.com/projects/autocomplete/jquery/
 *
 *   Last Review: 07/12/2012
 *   - EP: Modified default z-index
 *
 *   08/28/2011
 * 	- EP: Fixed issue with DeferRequestBy and Auto Suggest not getting fired.
 * 	- EP: Added Loading icon.
 *	- EP: Added SiteId and WebService mode.
 */

(function ($) { function Autocomplete(a, b) { this.el = $(a); this.el.attr("autocomplete", "off"); this.suggestions = []; this.data = []; this.badQueries = []; this.selectedIndex = -1; this.currentValue = this.el.val(); this.intervalId = 0; this.cachedResponse = []; this.onChangeInterval = null; this.ignoreValueChange = false; this.serviceUrl = b.serviceUrl; this.isLocal = false; this.options = { autoSubmit: false, minChars: 1, maxHeight: 300, deferRequestBy: 0, width: 0, highlight: true, params: {}, fnFormatResult: fnFormatResult, delimiter: null, zIndex: 99999999999, webServiceCall: false, webServiceParams: "", siteId: 0 }; this.initialize(); this.setOptions(b) } function fnFormatResult(a, b, c) { var d = "(" + c.replace(reEscape, "\\$1") + ")"; return a.replace(new RegExp(d, "gi"), "<strong>$1</strong>") } var reEscape = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\"].join("|\\") + ")", "g"); $.fn.autocomplete = function (a) { return new Autocomplete(this.get(0) || $("<input />"), a) }; Autocomplete.prototype = { killerFn: null, initialize: function () { var a, b, c; a = this; b = Math.floor(Math.random() * 1048576).toString(16); c = "Autocomplete_" + b; this.killerFn = function (b) { if ($(b.target).parents(".autocomplete").size() === 0) { a.killSuggestions(); a.disableKillerFn() } }; if (!this.options.width) { this.options.width = this.el.width() } this.mainContainerId = "AutocompleteContainer_" + b; $('<div id="' + this.mainContainerId + '" style="position:absolute;z-index:99999999999;"><div class="autocomplete-w1"><div class="autocomplete" id="' + c + '" style="display:none; width:300px;"></div></div></div>').appendTo("body"); this.container = $("#" + c); this.fixPosition(); if (window.opera) { this.el.keypress(function (b) { a.onKeyPress(b) }) } else { this.el.keydown(function (b) { a.onKeyPress(b) }) } this.el.keyup(function (b) { a.onKeyUp(b) }); this.el.blur(function () { a.enableKillerFn() }); this.el.focus(function () { a.fixPosition() }) }, setOptions: function (a) { var b = this.options; $.extend(b, a); if (b.lookup) { this.isLocal = true; if ($.isArray(b.lookup)) { b.lookup = { suggestions: b.lookup, data: [] } } } $("#" + this.mainContainerId).css({ zIndex: b.zIndex }); this.container.css({ maxHeight: b.maxHeight + "px", width: b.width }) }, clearCache: function () { this.cachedResponse = []; this.badQueries = [] }, disable: function () { this.disabled = true }, enable: function () { this.disabled = false }, fixPosition: function () { var a = this.el.offset(); $("#" + this.mainContainerId).css({ top: a.top + this.el.innerHeight() + "px", left: a.left + "px" }) }, enableKillerFn: function () { var a = this; $(document).bind("click", a.killerFn) }, disableKillerFn: function () { var a = this; $(document).unbind("click", a.killerFn) }, killSuggestions: function () { var a = this; this.stopKillSuggestions(); this.intervalId = window.setInterval(function () { a.hide(); a.stopKillSuggestions() }, 300) }, stopKillSuggestions: function () { window.clearInterval(this.intervalId) }, onKeyPress: function (a) { if (this.disabled || !this.enabled) { return } switch (a.keyCode) { case 27: this.el.val(this.currentValue); this.hide(); break; case 9: case 13: if (this.selectedIndex === -1) { this.hide(); return } this.select(this.selectedIndex); if (a.keyCode === 9) { return } break; case 38: this.moveUp(); break; case 40: this.moveDown(); break; default: return } a.stopImmediatePropagation(); a.preventDefault() }, onKeyUp: function (a) { if (this.disabled) { return } switch (a.keyCode) { case 38: case 40: return } clearInterval(this.onChangeInterval); if (this.options.deferRequestBy == 0 && this.currentValue !== this.el.val()) { this.onValueChange() } else { var b = this; this.onChangeInterval = setInterval(function () { b.onValueChange() }, this.options.deferRequestBy) } }, onValueChange: function () { clearInterval(this.onChangeInterval); this.currentValue = this.el.val(); var a = this.getQuery(this.currentValue); this.selectedIndex = -1; if (this.ignoreValueChange) { this.ignoreValueChange = false; return } if (a === "" || a.length < this.options.minChars) { this.hide() } else { this.getSuggestions(a) } }, getQuery: function (a) { var b, c; b = this.options.delimiter; if (!b) { return $.trim(a) } c = a.split(b); return $.trim(c[c.length - 1]) }, getSuggestionsLocal: function (a) { var b, c, d, e, f; c = this.options.lookup; d = c.suggestions.length; b = { suggestions: [], data: [] }; a = a.toLowerCase(); for (f = 0; f < d; f++) { e = c.suggestions[f]; if (e.toLowerCase().indexOf(a) === 0) { b.suggestions.push(e); b.data.push(c.data[f]) } } return b }, getSuggestions: function (a) { var b, c; b = this.isLocal ? this.getSuggestionsLocal(a) : this.cachedResponse[a]; if (b && $.isArray(b.suggestions)) { this.suggestions = b.suggestions; this.data = b.data; this.suggest() } else if (!this.isBadQuery(a)) { c = this; c.options.params.query = a; this.setLoadingStyle(); if (!c.options.webServiceCall) { $.get(this.serviceUrl, c.options.params, function (a) { c.clearLoadingStyle(); c.processResponse(a) }, "text") } else { $.ajax({ type: "POST", contentType: "application/json; charset=utf-8", url: this.serviceUrl, data: "{'q': '" + a + "', p: '" + c.options.webServiceParams + "', s: " + c.options.siteId + " }", dataType: "json", success: function (a) { c.clearLoadingStyle(); c.processResponse(a.d) } }) } } }, setLoadingStyle: function () { this.el.css("background", "url('/cms/images/ajaxloading5.gif') no-repeat right") }, clearLoadingStyle: function () { this.el.css("background", "") }, isBadQuery: function (a) { var b = this.badQueries.length; while (b--) { if (a.indexOf(this.badQueries[b]) === 0) { return true } } return false }, hide: function () { this.enabled = false; this.selectedIndex = -1; this.container.hide() }, suggest: function () { if (this.suggestions.length === 0) { this.hide(); return } var a, b, c, d, e, f, g, h, i; a = this; b = this.suggestions.length; d = this.options.fnFormatResult; e = this.getQuery(this.currentValue); h = function (b) { return function () { a.activate(b) } }; i = function (b) { return function () { a.select(b) } }; this.container.hide().empty(); for (f = 0; f < b; f++) { g = this.suggestions[f]; c = $((a.selectedIndex === f ? '<div class="selected"' : "<div") + ' title="' + g + '">' + d(g, this.data[f], e) + "</div>"); c.mouseover(h(f)); c.click(i(f)); this.container.append(c) } this.enabled = true; this.container.show() }, processResponse: function (text) { var response; if (!this.options.webServiceCall) { try { response = eval("(" + text + ")") } catch (err) { return } } else { response = text } if (!response) return; if (!$.isArray(response.data)) { response.data = [] } if (!this.options.noCache) { this.cachedResponse[response.query] = response; if (response.suggestions.length === 0) { this.badQueries.push(response.query) } } if (response.query === this.getQuery(this.currentValue)) { this.suggestions = response.suggestions; this.data = response.data; this.suggest() } }, activate: function (a) { var b, c; b = this.container.children(); if (this.selectedIndex !== -1 && b.length > this.selectedIndex) { $(b.get(this.selectedIndex)).removeClass() } this.selectedIndex = a; if (this.selectedIndex !== -1 && b.length > this.selectedIndex) { c = b.get(this.selectedIndex); $(c).addClass("selected") } return c }, deactivate: function (a, b) { a.className = ""; if (this.selectedIndex === b) { this.selectedIndex = -1 } }, select: function (a) { var b, c; b = this.suggestions[a]; if (b) { this.el.val(b); if (this.options.autoSubmit) { c = this.el.parents("form"); if (c.length > 0) { c.get(0).submit() } } this.ignoreValueChange = true; this.hide(); this.onSelect(a) } }, moveUp: function () { if (this.selectedIndex === -1) { return } if (this.selectedIndex === 0) { this.container.children().get(0).className = ""; this.selectedIndex = -1; this.el.val(this.currentValue); return } this.adjustScroll(this.selectedIndex - 1) }, moveDown: function () { if (this.selectedIndex === this.suggestions.length - 1) { return } this.adjustScroll(this.selectedIndex + 1) }, adjustScroll: function (a) { var b, c, d, e; b = this.activate(a); c = b.offsetTop; d = this.container.scrollTop(); e = d + this.options.maxHeight - 25; if (c < d) { this.container.scrollTop(c) } else if (c > e) { this.container.scrollTop(c - this.options.maxHeight + 25) } this.el.val(this.getValue(this.suggestions[a])) }, onSelect: function (a) { var b, c, d, e; b = this; c = b.options.onSelect; d = b.suggestions[a]; e = b.data[a]; b.el.val(b.getValue(d)); if ($.isFunction(c)) { c(d, e, b.el) } }, getValue: function (a) { var b, c, d, e; e = this; b = e.options.delimiter; if (!b) { return a } c = e.currentValue; d = c.split(b); if (d.length === 1) { return a } return c.substr(0, c.length - d[d.length - 1].length) + a } } })(jQuery);

/**
 * @author Remy Sharp
 * @url http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/
 */

(function ($) {

    $.fn.hint = function (blurClass) {
        if (!blurClass) {
            blurClass = 'blur';
        }

        return this.each(function () {
            // get jQuery version of 'this'
            var $input = $(this),

            // capture the rest of the variable to allow for reuse
                title = $input.attr('title'),
                $form = $(this.form),
                $win = $(window);

            function remove() {
                if ($input.val() === title && $input.hasClass(blurClass)) {
                    $input.val('').removeClass(blurClass);
                }
            }

            // only apply logic if the element has the attribute
            if (title) {
                // on blur, set value to title attr if text is blank
                $input.blur(function () {
                    if (this.value === '') {
                        $input.val(title).addClass(blurClass);
                    }
                }).focus(remove).blur(); // now change all inputs to title

                // clear the pre-defined text when form is submitted
                $form.submit(remove);
                $win.unload(remove); // handles Firefox's autocomplete
            }
        });
    };

})(jQuery);


/*	Enables the use of the following console commands using failsafe
 *	methods to prevent conflicts in non-supported browers:
 *
 *	logger.log = console.log
 *	logger.debug = console.debug
 *	logger.warn = console.warn
 *	logger.error = console.error
 */
var logger={log:function(a){void 0!=window.console&&console.log(a)},debug:function(a){void 0!=window.console&&console.log(a)},warn:function(a){void 0!=window.console&&console.warn(a)},error:function(a){void 0!=window.console&&console.error(a)}};

/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);


/************************/
/* Custom Plugins Below */
/************************/

/* Courtesy of JR */
(function ($, undefined) {
    $.fn.bindEnterToButton = function () {
        var buttonSelector = arguments[0];
        var selectedObjs = this;
        selectedObjs.each(function (txtInput) {
            $(selectedObjs[txtInput]).keyup(function (keyupEvent) {
                if (keyupEvent.which == 13) {
                    keyupEvent.preventDefault();
                    $(buttonSelector).click();
                }
            });
        });
    }
})(jQuery);
