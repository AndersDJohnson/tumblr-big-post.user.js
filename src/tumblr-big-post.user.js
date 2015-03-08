// ==UserScript==
// @name       Tumblr Big Post
// @namespace  https://github.com/AndersDJohnson/
// @downloadURL https://github.com/AndersDJohnson/tumblr-big-post.user.js/raw/master/src/tumblr-big-post.user.js
// @version    0.1.3
// @description Big post dialog for Tumblr.
// @author     Anders D. Johnson
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require    http://rawgit.com/Box9/jss/master/jss.min.js
// @match      http://*.tumblr.com/*
// @copyright  2014+, Anders D. Johnson
// ==/UserScript==

(function () {

    var waitFor = function (selector, time, callback) {
        var $match = $(selector);
        if ($match.length) {
            return callback($match);
        }
        setTimeout(function () {
            waitFor(selector, time, callback);
        }, time);
    };

    var checkForEditor = function () {
        waitFor('#new_post.active', 100, function ($new_post) {
            if (! $new_post.has('[data-post-type="regular"]:visible').length) {
            	$new_post.removeClass('data-post-type-regular');
                jss.remove('#post_two_ifr');
                return;
            }
            $new_post.addClass('data-post-type-regular');
            var $post_two_ifr = $('#post_two_ifr');
            if (! $post_two_ifr.length) {
                return setTimeout(checkForEditor, 1000);
            }
            var windowHeight = $(window).height();
            var dialogHeight = $new_post.height();
            var initialHeight = $post_two_ifr.height();
            var fixedHeight = dialogHeight - initialHeight;
            var fluidHeight = windowHeight - fixedHeight;
            var height = fluidHeight * 0.8;
        	jss.set('#post_two_ifr', {
                height: height + 'px !important'
            });
        });
    };

    var start = function (label) {
        //console.log('tumblr-big-post: check | ' + label + ' | ' + new Date());
        jss.set('#new_post.editing.active.data-post-type-regular', {
            position: 'absolute !important',
            width: '90% !important',
            left: '5% !important',
            top: '20px !important'
        });
        
        var $new_post = $('#new_post');
        $new_post.on('click', function () {
            checkForEditor();
        });
        
        checkForEditor();
    };
    
    $(function () {
    	start(); 
    });
    
})();
