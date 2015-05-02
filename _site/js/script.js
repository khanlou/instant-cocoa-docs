/*!
 * AnchorJS - v0.4.0 - 2015-04-20
 * https://github.com/bryanbraun/anchorjs
 * Copyright (c) 2015 Bryan Braun; Licensed MIT
 */

function addAnchors(selector) {
  'use strict';

  // Sensible default selector, if none is provided.
  if (!selector) {
    selector = 'h1, h2, h3, h4, h5, h6';
  } else if (typeof selector !== 'string') {
    throw new Error('AnchorJS accepts only strings; you used a ' + typeof selector);
  }

  // Select any elements that match the provided selector.
  var elements = document.querySelectorAll(selector);
  if (elements.length === 0) {
    // Selector was valid but no elements were found.
    return false;
  }

  // Produce a list of existing IDs so we don't generate a duplicate.
  var elsWithIds = document.querySelectorAll('[id]');
  var idList = [].map.call(elsWithIds, function assign(el) {
    return el.id;
  });

  // Loop through the selected elements.
  for (var i = 0; i < elements.length; i++) {
    var elementID;

    if (elements[i].hasAttribute('id')) {
      elementID = elements[i].getAttribute('id');
    } else {
      // We need to create an ID on our element. First, we find which text
      // selection method is available to the browser.
      var textMethod = document.body.textContent ? 'textContent' : 'innerText';

      // Get the text inside our element
      var roughText = elements[i][textMethod];

      // Refine it so it makes a good ID. Strip out non-safe characters, replace
      // spaces with hyphens, truncate to 32 characters, and make toLowerCase.
      //
      // Example string:                                 // "⚡⚡⚡ Unicode icons are cool--but don't belong in a URL."
      var tidyText = roughText.replace(/[^\w\s-]/gi, '') // " Unicode icons are cool--but dont belong in a URL"
                              .replace(/\s+/g, '-')      // "-Unicode-icons-are-cool--but-dont-belong-in-a-URL"
                              .replace(/-{2,}/g, '-')    // "-Unicode-icons-are-cool-but-dont-belong-in-a-URL"
                              .substring(0, 32)          // "-Unicode-icons-are-cool-but-dont"
                              .replace(/^-+|-+$/gm, '')  // "Unicode-icons-are-cool-but-dont"
                              .toLowerCase();            // "unicode-icons-are-cool-but-dont"

      // Compare our generated ID to existing IDs (and increment it if needed)
      // before we add it to the page.
      var index,
          count = 0,
          newTidyText = tidyText;
      do {
        if (index !== undefined) {
          newTidyText = tidyText + '-' + count;
        }
        // .indexOf is supported in IE9+.
        index = idList.indexOf(newTidyText);
        count += 1;
      } while (index !== -1);
      index = undefined;
      idList.push(newTidyText);

      // Assign it to our element.
      // Currently the setAttribute element is only supported in IE9 and above.
      elements[i].setAttribute('id', newTidyText);

      // Grab it for use in our anchor.
      elementID = newTidyText;
    }

    var readableID = elementID.replace(/-/g, ' ');
    var anchor = '<a class="anchorjs-link" href="#' + elementID + '">' +
                    '<span class="anchorjs-description">Anchor link for: ' + readableID + '</span>' +
                    '<span class="anchorjs-icon" aria-hidden="true"></span>' +
                 '</a>';

    elements[i].innerHTML += anchor;
  }
};/*! http://mths.be/smoothscroll v1.5.2 by @mathias */
;(function(document, $) {

  var $scrollElement = (function() {
      // Find out what to scroll (html or body)
        var $html = $(document.documentElement),
            $body = $(document.body),
            bodyScrollTop;
        if ($html.scrollTop()) {
          return $html;
        } else {
          bodyScrollTop = $body.scrollTop();
          // If scrolling the body doesn’t do anything
          if ($body.scrollTop(bodyScrollTop + 1).scrollTop() == bodyScrollTop) {
            return $html;
          } else {
            // We actually scrolled, so undo it
            return $body.scrollTop(bodyScrollTop);
          }
        }
      }());

  $.fn.smoothScroll = function(speed) {
    speed = ~~speed || 400;
    // Look for links to anchors (on any page)
    return this.find('a[href*="#"]').click(function(event) {
      var hash = this.hash,
          $hash = $(hash); // The in-document element the link points to
      // If it’s a link to an anchor in the same document
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        // If the anchor actually exists…
        if ($hash.length) {
          // …don’t jump to the link right away…
          event.preventDefault();
          // …and smoothly scroll to it
          $scrollElement.stop().animate({ 'scrollTop': $hash.offset().top }, speed, function() {
            location.hash = hash;
          });
        }
      }
    }).end();
  };

}(document, jQuery));;var $win = $(window)
  , $body = $('body')
  , $navBtn = $('#nav-btn');


$('a > code').parent().addClass('link-code');


addAnchors('#doc h1, #doc h2, #doc h3, #doc h4');


$body.smoothScroll();


$navBtn.on('click', function(e) {
  e.stopPropagation();

  $body.hasClass('off-canvas') ? closeNav() : openNav();
});

var resizeWindowCloseNav = function() {
  if ($win.width() >= 675) closeNav();
};

var openNav = function() {
  $body.addClass('off-canvas').on('click', closeNav);
  $win.on('resize', resizeWindowCloseNav);
};

var closeNav = function() {
  $body.removeClass('off-canvas').off('click', closeNav);
  $win.off('resize', resizeWindowCloseNav);
};


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-61265657-1', 'auto');
ga('send', 'pageview');