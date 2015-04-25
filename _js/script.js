var $win = $(window)
  , $body = $('body')
  , $navBtn = $('#nav-btn');

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