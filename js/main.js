$(function(){
"use strict";

  	// Define Some Elements
  	let allWindow = $(window),
        body = $('body'),
        top = allWindow.scrollTop(),
        navBar = $(".nav-wrapper");

/*Javascript Function for The Preloader*/

    allWindow.on("load", function() {
        $('.loader-con').fadeOut('slow');
    });


/*Javascript Function To check Aniamtion support*/

    let animation = false,
    animationstring = 'animation',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '',
    elm = document.createElement('div');

    if( elm.style.animationName !== undefined ) { animation = true; }

    if( animation === false ) {
      for( let i = 0; i < domPrefixes.length; i++ ) {
        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
          pfx = domPrefixes[ i ];
          animationstring = pfx + 'Animation';
          keyframeprefix = '-' + pfx.toLowerCase() + '-';
          animation = true;
          break;
        }
      }
    }


/*Javascript Function For Smooth Mouse Scrolling*/

//     $.scrollSpeed = function(step, speed) {
        
//         let $document = $(document),
//             $body = $('html, body'),
//             option = 'default',
//             root = top,
//             scroll = false,
//             scrollY,
//             view;
            
//         if (window.navigator.msPointerEnabled) {
//             return false;
//         }
            
//         allWindow.on('mousewheel DOMMouseScroll', function(e) {
            
//             let deltaY = e.originalEvent.wheelDeltaY,
//                 detail = e.originalEvent.detail;
//                 scrollY = $document.height() > allWindow.height();
//                 scroll = true;
            
//             if (scrollY) {
                
//                 view = allWindow.height();
                    
//                 if (deltaY < 0 || detail > 0) {
//                     root = (root + view) >= $document.height() ? root : root += step;
//                 }
                
//                 if (deltaY > 0 || detail < 0) {
//                     root = root <= 0 ? 0 : root -= step;
//                 }
                
//                 $body.stop().animate({
//                     scrollTop: root
//                 }, speed, option, function() {
//                     scroll = false;
//                 });
//             }
            
//             return false;
            
//         }).on('scroll', function() {
            
//             if (scrollY && !scroll) root = top;
//             if (!scroll) root = allWindow.scrollTop();
            
//         }).on('resize', function() {
            
//             if (scrollY && !scroll) view = allWindow.height();
            
//         });       
//     };
    
//     $.easing.default = function (x,t,b,c,d) {
//         return -c * ((t=t/d-1)*t*t*t - 1) + b;
//     };

//     if(animation) {
//     	$.scrollSpeed(100, 800);
//     }


/*Javascript Function For Sticky Navigation Bar AND SMOOTH SCROLLING*/

    function stikyNav() {

      top = allWindow.scrollTop();

      if ( top >= 100 ) {
        navBar.addClass("nav-sticky");

      } else {
        navBar.removeClass("nav-sticky");
      }

      // SHow Also Scroll up Button
      if ( top >= 1000 ) {
        $('.scroll-up').addClass("show-up-btn");
      } else {
        $('.scroll-up').removeClass("show-up-btn");
      }
    }


    $('a.scroll').on('click', function(event) {
        if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
          let target = $(this.hash),
              speed= $(this).data("speed") || 800;
              target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');


          if (target.length) {
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, speed);
          }
        }
    });

    $(".scroll-up").on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 900);
    });
    

/*Javascript Function for Hide Navbar Dropdown After Click On Links*/

    let navLinks = navBar.find(".navbar-collapse ul li a");

    $.each( navLinks, function( i, val ) {

      let navLink = $(this);

        navLink.on('click', function (e) {
          navBar.find(".navbar-collapse").collapse('hide');
        });

    });


/*Javascript Function For Change active Class on navigation bar*/

    let sections = $('.one-page-section'),
        navList = navBar.find("ul.navbar-nav");

    // Define ChangeClass Function
    function ChangeClass() {

      top = allWindow.scrollTop();

        $.each(sections, function(i,val) {

          let section = $(this),
              section_top = section.offset().top - 10,
              bottom = section_top + section.height();

            if (top >= section_top && top <= bottom) {

              let naItems = navList.find('li');

              $.each(naItems ,function(i,val) {
                let item = $(this);
                item.find("a").removeClass("active");
              });

              navList.find('li [href="#' + section.attr('id') + '"]').addClass('active');
            }

        });

    }


/*Javascript Function FOR PARALLAX EFFECT*/


    let backgrounds = $('.parallax');

    function parallax() {

      $.each( backgrounds, function( i, val ) {

        let backgroundObj = $(this),
          backgroundObjTop = backgroundObj.offset().top,
          backgroundHeight = backgroundObj.height();

        top = allWindow.scrollTop();

          let yPos = ((top - backgroundObjTop))/2;

          if ( yPos <= backgroundHeight + backgroundObjTop ) {
            backgroundObj.css({
              backgroundPosition: '50% ' + yPos + 'px'
            });
          }

      });
    };


/*Javascript Function for PROGRESS BAR LINES  SCRIPT*/

    let linesHead = $(".skills-section"),
        line = $(".progress-bar-line");
        

    function progressFunction(e) {

      if ( linesHead.length ) {

        if (!linesHead.hasClass("done")) {

          let linesHeadTop = linesHead.offset().top,
              top = allWindow.scrollTop(),
              winH = allWindow.height() - 160;

          if (top >= linesHeadTop - winH) {

            linesHead.addClass("done");
            $.each( line, function( i, val ) {

            let thisLine = $(this),
              value = thisLine.data("percent"),
              progressCont = $(thisLine).closest('.progress-bar-linear').find(".progress-cont span");

              thisLine.css("width",value + "%");
              progressCont.html(value + "%")

            });
          }
        }
      }
    } 


    function scrollFunctions() {
      stikyNav();
      ChangeClass();
      parallax();
      progressFunction();
    }

    allWindow.on('scroll', function() {
      scrollFunctions();
    });


/*Javascript for initialize text Typer*/

    // initialize text Typer Only in Modern browsers
    if (animation) {

      const text = $('#home .typer-title'),
          textOne = "i'm craftsman",
          textTwo = "let's work together",
          textThree = "i can create awesome stuff";

          if (!!$.prototype.typer) {
            text.typer([textOne,textTwo,textThree]);
          }
    }


/*Javascript Function Initialize Particules*/

    if ( typeof particlesJS !== "undefined") {

      particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 600
              }
            },
            "color": {
              "value": '#777',
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#888"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.7,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#bbb",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 4,
              "direction": "bottom",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true,
          "config_demo": {
            "hide_card": false,
            "background_color": "#b61924",
            "background_image": "",
            "background_position": "50% 50%",
            "background_repeat": "no-repeat",
            "background_size": "cover"
          }
        });
    }


/*Javascript Function for filtering portfolio items*/

  let FilterContainer = $('#work .filtr-container');

  if ( FilterContainer.length > 0 && !!$.prototype.isotope ) {
  
    let filterizd;
    FilterContainer.imagesLoaded( function() {
      filterizd = FilterContainer.isotope({
        itemSelector: '.filtr-item',
      });
    });
    
    $('#work-list li a.filter').on( 'click', function(e) {


        e.preventDefault();
        
        let target = $(this),
            filterValue = target.data('filter');

        filterizd.isotope({ filter: filterValue });

        if (!target.hasClass("filter-active")) {
          $('#work-list').find('.filter-active').removeClass('filter-active');
          target.addClass('filter-active');
        }

    });

  }
  
/*Magnific Popup Portfolio Initializing*/

    $(".popup-youtube").magnificPopup({
        type: 'iframe'
    });

    $('.popup-link').magnificPopup({
      type: 'image',
      removalDelay: 300,
      mainClass: 'mfp-fade',
      gallery:{
          enabled:true
      },
      zoom: {
        enabled: true,
        duration: 260,
        easing: 'ease-in',
      }
    });

  /*Javascript Function for initialize owl carousel*/

    if (!!$.prototype.owlCarousel) {

      $(".home-3 .home-carousel").owlCarousel({
        nav: true,
        navText : [
          "<div class='home-slider-btn effect ver-center'><i class='fa fa-chevron-left center'></i><span></span></div>",
          "<div class='home-slider-btn effect ver-center'><i class='fa fa-chevron-right center'></i><span></span></div>"
        ],
        dots: true,
        loop: true,
        items: 1,
      });

      $(".testimonial-slider").owlCarousel({
        loop: true,
        nav: true,
        navText : [
          "<div class='testimonial-slider-btn effect hor-center'><i class='fa fa-angle-left center'></i></div>",
          "<div class='testimonial-slider-btn effect hor-center'><i class='fa fa-angle-right center'></i></div>"
        ],
        margin: 20,
        responsive : {
            0 : {
              items: 1,
            },
            780 : {
              items: 2,
            },
          }
      });

    }


/*Javascript Function for Validate and Submit the CONTACT Form Using AJAX*/

    // Get the form
//     let form = $('#contact-form'),
//         reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3,4})$/,
//         inputs = $(".input-field");

//     function validateForm() {

//       if ($(this).is("#email")) {

//           let email = $(this).val(),
//               res = reg.test(email);

//           if (res) {
//             $(".email-error").html("");
//           } else {
//             $(".email-error").html("please enter a valid email.");
//             return false;
//           }

//       } else {

//           let target = ($(this).attr("id")),
//               targetMessage = $("."+target+"-error");

//           if ($(this).val() === "") {

//             targetMessage.html("please enter a valid "+target+".");
//             return false;

//           } else { 
//             targetMessage.html(" ");
//           }

//       }
//     } 

//     $.each(inputs, function( i, val ) {
//       $(this).on("blur", validateForm);
//     });


//     let formMessages = $('#form-message');


//     $(form).on('submit',function(event) {


//       event.preventDefault();


//       let formData = $(form).serialize();

//       // Submit the form using AJAX.
//       $.ajax({
//           type: 'POST',
//           url: form.attr('action'),
//           data: formData
//       }).done(function(response) {

//         //  formMessages div has the 'success' class.
//         formMessages.removeClass('error');
//         formMessages.addClass('success');


//         formMessages.text(response);


//         $('#name').val('');
//         $('#email').val('');
//         $('#message').val('');

//       }).fail(function(data) {

//           //  formMessages div has the 'error' class.
//           formMessages.removeClass('success');
//           formMessages.addClass('error');

//           if (data.responseText !== '') {
//               formMessages.text(data.responseText);
//           } else {
//               formMessages.text('Sorry! Your message could not be sent.');
//           }
//       });
//     });

// });

// $(document).ready(function() {

//   $("#contact-form").submit(function() {
//     $.ajax({
//       type: "POST",
//       url: "mail.php",
//       data: $(this).serialize()
//     }).done(function() {
//       $(this).find("input").val("");
//       alert("Thanks");
//       $("#contact-form").trigger("reset");
//     });
//     return false;
//   });
  
});
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-138408237-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-138408237-1');
</script>
