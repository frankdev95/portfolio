$("document").ready(() => {
    let $skillPer = $(".skill__per");
    let skills = $(".skills");
    let $window = $(window);
    let navigation = $(".navigation");
    let portItems = $(".portfolio__item");
    let lockTimer;

    let navPos = navigation.position().top;

    // NAVIGATION HIGHLIGHTING

    $window.on("scroll resize", function () {
        let scrollTop = $window.scrollTop();
        let scrollBottom = scrollTop + $window.height();

        if (scrollTop >= $("#home").height()) {
            navigation.addClass('fixed');
        }
        if (scrollTop < navPos) {
            navigation.removeClass('fixed');
        }

        if (scrollTop > $("#home").offset().top) {
            highlightLink('home')
        }

        if (scrollTop > $("#home").height() - navigation.height()) {
            highlightLink('about')
        }

        if (scrollTop > $("#portfolio").offset().top - navigation.height() - 10) {
            highlightLink('portfolio')
        }

        if (scrollTop > $("#contact").offset().top - navigation.height() - 150) {
            highlightLink('contact')
        }

        if (skills.offset().top >= scrollTop && (skills.offset().top + skills.outerHeight()) <= scrollBottom) {
            $skillPer.each(function () {
                let $el = $(this);
                let per = $el.attr("per");
                $el.css("width", per + '%');
                $({animatedValue: 0}).animate({animatedValue: per})
            })
        }

        // PREVENT HOVER WHILST SCROLLING

        clearTimeout(lockTimer);
        if (!$('body').hasClass('disable-hover')) {
            $('body').addClass('disable-hover');
        }

        lockTimer = setTimeout(function () {
            $('body').removeClass('disable-hover');
        }, 500);
    })

    function highlightLink(anchor) {
        $('.navigation .active').removeClass("active");
        navigation.find('[dest =' + anchor + ']')
            .addClass('active');
    }

    function mixClear() {
        setTimeout(function () {
            $('#port').removeClass('waypoint');
        }, 2000);
    }

    // EVENT HANDLERS

    $('.navigation__link').click(function () {
        let anchor = $(this).attr('dest');
        highlightLink(anchor);

        $('.navigation').animate({
            height: 0,
            opacity: 0
        }, 100);

        $('html, body').animate(
            {
                scrollTop: $('#' + anchor).offset().top
            },
            400
        )

        setTimeout(function () {
            $('.navigation').animate({
                height: "55px",
                opacity: 1
            }, 200);
        }, 400)
    })

    $('.view-port').click(function (event) {
        event.preventDefault();

        $('html, body').animate(
            {
                scrollTop: $('#portfolio').offset().top
            },
            400
        )
    })

    $('.footer__top').click(function (event) {

        $('html, body').animate(
            {
                scrollTop: $('#home').offset().top
            },
            400
        )
    })

    $('.success-close').click(function() {
        $('.form__success').css({
            height: 0,
            opacity: 0,
            pointerEvents: "none"
        })
        $('.form__success > div p').text("");
    })

// SCROLL ANIMATIONS

    function onScrollInit(items) {
        let offset = $(window).height() / 1.6;

        items.each(function () {
            let el = $(this),
                animationClass = el.attr('data-animation'),
                animationDelay = el.attr('data-delay');

            if (el.hasClass('col-1-of-3')) {
                offset = 400
            } else if (el.hasClass('form__group') || el.find('contact__text > *')) {
                offset = 800;
            }


            el.css({
                '-webkit-animation-delay': animationDelay,
                '-moz-animation-delay': animationDelay,
                'animation-delay': animationDelay
            });

            el.waypoint(() => {
                el.addClass('animated').addClass(animationClass);
                if (el.get(0).id === 'port') mixClear();
            }, {
                triggerOnce: true,
                offset: offset
            });
        })
    }

    setTimeout(() => {
        onScrollInit($('.waypoint'))
    }, 10)

// PORTFOLIO

    // let mixer = mixitup('.portfolio');

    let mixer = mixitup('.portfolio', {
        animation: {
            effects: 'fade rotateY(180deg)', /* fade scale */
            duration: 700 /* 600 */
        }
    });

})

// FORM FUNCTIONALITY

let form = document.querySelector('.form');

$(".form").submit(function (e) {
    e.preventDefault();

    let data = new FormData(form);
    ajax(form.method, form.action, data);


});

function ajax(method, url, data, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            $('.form__success').css({
                border: "1px solid #7ed56f",
                height: "3rem",
                opacity: 1,
                pointerEvents: "initial"
            })
            $('.form__success > div p').append("Your message was successful.")
        } else {
            $('.form__success').css({
                border: "1px solid #f5a25d",
                height: "3rem",
                opacity: 1,
                pointerEvents: "initial"
            })
            $('.form__success > div p').append("Your message was unsuccessful, try again.")
        }
    };
    xhr.send(data);
}
