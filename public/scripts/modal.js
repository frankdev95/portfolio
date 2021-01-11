$(document).ready(() => {
    let modalText = {
        natours: {
            title: 'Natours',
            tag: 'NATURE TOURS BOOKING SITE',
            description: 'Natours is a concept tour booking websites that allows users to observe information regarding ' +
                'nature tours the company offers.',
            numPhotos: 5,
            link: "https://natours-outdoor-tours.herokuapp.com/"
        },
        trillo: {
            title: 'Trillo',
            tag: 'HOLIDAY BOOKING APP',
            description: 'Trillo is a concept holiday booking app that allows users to book a holiday.',
            numPhotos: 4,
            link: "https://trillo-holidays.herokuapp.com/"
        },
        spaceinvaders: {
            title: "Space Invaders",
            tag: "ATARI STYLE SPACE INVADERS GAME",
            description: "An atari style space invaders game made using vanilla JavaScript."
        },
        asteroids: {
            title: "Asteroids",
            tag: "ATARI STYLE ASTEROIDS GAME",
            description: "An atari style asteroids game made using vanilla JavaScript"
        },
        flappybird: {
            title: "Flappy Bird",
            tag: "FLAPPY BIRD STYLE GAME",
            description: "A flappy bird style game made using vanilla JavaScript"
        },
        projectmanager: {
            title: "Project Manager",
            tag: 'PROJECT MANAGER SOFTWARE',
            description: "Software application made using Java that allows a small structural engineering firm to " +
                "organise current or previous projects they have been working on.",
            numPhotos: 1
        },
        taskmanager: {
            title: "Task Manager",
            tag: "TASK MANAGER SOFTWARE",
            description: "Software application made using python that allows effective organisation and management " +
                "of user tasks.",
            numPhotos: 1
        },
        space: {
            title: "Space Game",
            tag: "BASIC SPACE GAME",
            description: "A basic space themed game made using python with the pygame library. The user controls a " +
                "weaponized spaceship to defeat an assortment of enemies."
        },
        interactive: {
            title: "Interactive Music Game",
            tag: "INTERACTIVE MUSIC GAME",
            description: "A wave based game using JavaScript and the p5.js library in which a player traverses ten " +
                "waves of enemies, and creates a randomly generated song by selecting different genres after each " +
                "boss wave."
        },
        cms: {
            title: "Content Management System (Blog)",
            tag: "BLOG",
            description: "A content management system that allows you to blog and read other blog posts from registered" +
                " users.",
            numPhotos: 11
        },
        organiser: {
            title: "Organiser",
            tag: "SENSITIVE INFORMATION ORGANISER",
            description: "An organiser that allows you to store and keep track of sensitive information.",
            numPhotos: 8,
            link: "https://secure-organiser.herokuapp.com/login"
        }
    }

    $(".portfolio__item .btn").on("click", function() {
        fillModal(this.id, this.getAttribute("isVideo"));
        $(".modal-wrap").addClass('visible');
    })

    $(".mask, .modal__close").on("click", function() {
        $(".modal-wrap").removeClass('visible');
    })

    function fillModal(id, isVideo) {
        $(".modal__text-heading h1").text(modalText[id].title);
        $(".modal__text-heading h2").text(modalText[id].tag);
        $(".modal__text-description p").text(modalText[id].description);
        $(".modal__link").attr("href", modalText[id].link);

        if(isVideo === null) {
            builder(modalText[id].numPhotos);
            createSlides();

            $(".slide").each(function(index) {
                $(this).css({
                    background: "url('img/slides/" + id + '-' + index + ".png') center center/cover",
                    backgroundSize: "cover"
                })
            })
            checkArrows();
        } else {
            resetCarousel();
            arrows.css("display", "none");
            createVideo(id);
        }
    }

    // CAROUSEL SLIDES FUNCTIONALITY
    const carousel = $('.modal__carousel'); // track
    const arrows = $('.arrow');
    const nav = ($('.modal__carousel--nav'));
    let indicators, slides;

    const builder = (num) => {
        resetCarousel();

        for(let i = 0; i < num; i++) {
            const slide = $("<div></div>").attr("class", "slide");
            const indicator = $("<button></button>").attr("class", "modal__carousel--indicator");
            if(i === 0) {
                slide.addClass("current-slide");
                indicator.addClass("current-slide");
            }
            carousel.append(slide);

            if(num > 1) {
                nav.append(indicator);
            }

        }

        indicators = $.makeArray(nav.children());
    }

    const resetCarousel = () => {
        carousel.empty();
        nav.empty();
        carousel.css("transform", "translateX(0)");
    }

    function createSlides() {
        slides = $.makeArray($('.slide'));
        const slideWidth = slides[0].offsetWidth;

        const setSlidePosition = (slide, index) => {
            slide.style.left = index * slideWidth + 'px';
        }

        slides.forEach(setSlidePosition);
    }

    const createVideo = (id) => {
        const format = id === "interactive"? ".mov": ".mp4";

        const video = $("<video></video>").attr({
            class: "video",
            controls: "",
            src: "videos/" + id + format,
        });

        carousel.append(video);
    }

    nav.on("click", e => {
        const targetIndicator = e.target.closest('button');

        if(!targetIndicator) return;

        const currentSlide = carousel.find('.current-slide');
        const currentIndicator = nav.find('.current-slide');
        const index = indicators.indexOf(targetIndicator);

        currentIndicator.removeClass('current-slide');
        $(indicators[index]).addClass('current-slide');
        shiftSlide(currentSlide, $(slides[index]));
    })

    arrows.on('click', function() {
        const currentSlide = $(".current-slide");

        if($(this).attr("arrow") === "right") {
            shiftSlide(currentSlide, currentSlide.next());
        } else {
            shiftSlide(currentSlide, currentSlide.prev());
        }

    })

    const shiftSlide = (currentSlide, targetSlide) => {
        carousel.css("transform", "translateX(-" + targetSlide.css("left") + ")");
        currentSlide.removeClass("current-slide");
        targetSlide.addClass("current-slide");

        checkArrows();
    }

    const checkArrows = () => {
        const currentSlide = $(".current-slide")[0];

        if(slides.indexOf(currentSlide) === slides.length -1) {
            $(".arrow[arrow='right']").css("display", "none");
        } else {
            $(".arrow[arrow='right']").css("display", "initial");
        }

        if(slides.indexOf(currentSlide) === 0) {
            $(".arrow[arrow='left']").css("display", "none");
        } else {
            $(".arrow[arrow='left']").css("display", "initial");
        }
    }
})

