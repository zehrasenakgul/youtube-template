var animationEnd = function(el) {
    var animations = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        WebkitAnimation: 'webkitAnimationEnd'
    };


    for (var t in animations) {
        if (el.style[t] !== undefined) {
            return animations[t];
        }
    }
}(document.createElement('div'));

const menuBtn = document.querySelector('header .home-menu .menu-icon');
const aside = document.querySelector('.wrapper .content aside');

aside.addEventListener(animationEnd, function(e) {
    if (aside.classList.contains("slideOutLeft")) {
        aside.classList.remove("slideOutLeft");
        aside.classList.add("hide");
    }
    e.preventDefault();
});

menuBtn.addEventListener("click", toggleMenu);


function toggleMenu() {
    if (aside.classList.contains("hide")) {
        aside.classList.remove("hide");
        aside.classList.add("slideInLeft");
    } else {
        aside.classList.remove("slideInLeft");
        aside.classList.add("slideOutLeft");
    }
}

const navBtn = document.querySelector('header .main-head .nav-icon');
const nav = document.querySelector('.wrapper nav');

nav.addEventListener(animationEnd, function(e) {
    if (nav.classList.contains("fadeOut")) {
        nav.classList.remove("fadeOut");
        nav.classList.add("hide");
    }
    e.preventDefault();
});

navBtn.addEventListener("click", toggleNav);

function toggleNav() {
    if (nav.classList.contains("hide")) {
        nav.classList.remove("hide");
        nav.classList.add("fadeIn");
    } else {
        nav.classList.remove("fadeIn");
        nav.classList.add("fadeOut");
    }
}


const reference = document.querySelector('#video-box1');
const tooltip = document.querySelector('#popperText');

var popper = new Popper(reference, tooltip, {
    placement: 'top'
});


popper.show();

var instance = $(".hs__wrapper");
$.each(instance, function(key, value) {

    var arrows = $(instance[key]).find(".arrow"),
        prevArrow = arrows.filter('.arrow-prev'),
        nextArrow = arrows.filter('.arrow-next'),
        box = $(instance[key]).find(".hs"),
        x = 0,
        mx = 0,
        maxScrollWidth = box[0].scrollWidth - box[0].clientWidth / 2 - box.width() / 2;

    $(arrows).on('click', function() {

        if ($(this).hasClass("arrow-next")) {
            x = box.width() / 2 + box.scrollLeft() - 10;
            box.animate({
                scrollLeft: x
            });

        } else {
            x = box.width() / 2 - box.scrollLeft() - 10;
            box.animate({
                scrollLeft: -x
            });

        }

    });

    $(box).on({
        mousemove: function(e) {
            var mx2 = e.pageX - this.offsetLeft;
            if (mx) this.scrollLeft = this.sx + mx - mx2;
        },
        mousedown: function(e) {
            this.sx = this.scrollLeft;
            mx = e.pageX - this.offsetLeft;
        },
        scroll: function() {
            toggleArrows();
        }
    });


    $(document).on("mouseup", function() {
        mx = 0;
    });

    function toggleArrows() {
        if (box.scrollLeft() > maxScrollWidth - 10) {
            // disable next button when right end has reached 
            nextArrow.addClass('disabled');
        } else if (box.scrollLeft() < 10) {
            // disable prev button when left end has reached 
            prevArrow.addClass('disabled');
        } else {
            // both are enabled
            nextArrow.removeClass('disabled');
            prevArrow.removeClass('disabled');
        }
    }

});