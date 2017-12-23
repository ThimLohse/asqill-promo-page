$(document).ready(function() {

  //Check for viewportsize to determine if mobile or desktop at intial open
  var btn_size_init = $(".btn").css('fontSize');
  var btn_size_expand = "";
  var facebook_link_desktop = "https://facebook.com/asqill";
  var facebook_link_mobile = "fb://profile/1662375397120826";

  //If mobile, no added effect on the buttons
  if ($(window).width() <= 768) {
    $("#facebook").removeAttr('target');
    $("#facebook").attr("href", facebook_link_mobile);
    btn_size_expand = btn_size_init;

  } else {
    btn_size_expand = "175%";
  }

  //Check for changes in window size during view time
  $(window).resize(function() {
    //if mobile, no effect and link will try to go to facebook app.
    if ($(window).width() <= 768) {
      $(".btn").css('fontSize', '100%');
      btn_size_init = $(".btn").css('fontSize');
      btn_size_expand = btn_size_init;
      $("#facebook").removeAttr('target');
      $("#facebook").attr("href", facebook_link_mobile);
      //if desktop, then put effect on the buttons on hover for more interactive ux.
    } else {
      $(".btn").css('fontSize', '150%');
      btn_size_init = $(".btn").css('fontSize');
      btn_size_expand = "175%";
      $("#facebook").attr('target', '_blank');
      $("#facebook").attr("href", facebook_link_desktop);
    }
  });

  //Hide element that will have reveal effect with Animate css, jQuery fadeIn does not need this.
  // hide our element on page load
  $('#info_title').css('opacity', 0);
  $('#info_content').css('opacity', 0);
  $('#more_desktop').css('opacity', 0);
  $('#facebook_content').css('opacity', 0);

  //Scroll down to info view space, only click-scroll on desktop
  $("#more_desktop").click(function() {
    document.querySelector("#info").scrollIntoView({behavior: 'smooth'});
  });

  //fade in "learn more button" on desktop at video ended
  $('#bgvid').on('ended', function() {
    $('#more_desktop').animateCss('fadeIn');
    $('#more_desktop').css('opacity', 1);
  });

  $("#facebook").hover(function() {
    $('#facebook').animate({
      fontSize: btn_size_expand
    }, "fast", "swing");
  }, function() {
    //do something on exit if needed
    $('#facebook').animate({
      fontSize: btn_size_init
    }, "fast", "swing");
  });
  $("#more_desktop").hover(function() {
    $('#more_desktop').animate({
      fontSize: btn_size_expand
    }, "fast", "swing");
  }, function() {
    //do something on exit if needed
    $('#more_desktop').animate({
      fontSize: btn_size_init
    }, "fast", "swing");
  });

  //Trigger element scrolled into view events
  //Animate in into title
  $('#info_title').waypoint(function() {
    $('#info_title').animateCss('fadeInRight');
    $('#info_title').css('opacity', 1);
    this.destroy();
  }, {offset: '50%'});
  //Animate in info content
  $('#info_content').waypoint(function() {
    $('#info_content').animateCss('fadeInLeft');
    $('#info_content').css('opacity', 1);
    $('#facebook_content').animateCss('bounceIn');
    $('#facebook_content').css('opacity', 1);
    this.destroy();
  }, {offset: '50%'});

});

//Extended function to add and animations from Animate.css library
$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
      if (callback) {
        callback();
      }
    });
    return this;
  }
});
