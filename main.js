$(document).ready(function() {

    function mv_scale(scroll) {
        const MAX_SCROLL = 500;
        if (window.innerWidth > 900) {
            $('#mainvisual img').css({
                'width': 100 / 3 + scroll / 10 + '%'
            });
        } else {
            $('#mainvisual img').css({
                'width': 100 - scroll / 10 + '%'
            });
        }
        const progress = Math.min(scroll / MAX_SCROLL, 1);
        const centerScale = 1 + progress * 2;
        const sideTranslate = progress * 100;
        $('.mainvisual img').each(function(index) {
            if (index === 1) {
                $(this).css({
                    'transform': `scale(${centerScale})`,
                    'transform-origin': 'center center'
                });
            } else {
                const direction = index === 0 ? -1 : 1;
                $(this).css({
                    'transform': `translateX(${direction * sideTranslate}%)`
                });
            }
        });
    }
    

    function fadeInEffect() {
        $('.fadein').each(function() {
            const elemPos = $(this).offset().top;
            const scroll = $(window).scrollTop();
            const windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight + 100) {
                $(this).addClass('scrollin');
            }
        });
    }

    function toggleHeader(scroll) {
        if (scroll > 520) {
            $('.logo, .hamburger').fadeIn(500);
        } else {
            $('.logo, .hamburger').fadeOut(500);
        }
    }
    
    function toggleBg() {
        const accessSection = $('#access');
        const accessTop = accessSection.offset().top;
        const accessBottom = accessTop + accessSection.outerHeight();
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (scroll + windowHeight > accessTop && scroll < accessBottom) {
            $('.bg').fadeIn(500);
        } else {
            $('.bg').fadeOut(500);
        }
    }

    function updateSideButtonVisibility() {
        const scroll = $(window).scrollTop();
        const galleryPosition = $('#gallery').offset().top - $(window).height();
        const accessPosition = $('#access').offset().top - $(window).height();

        if (window.innerWidth > 900) {
            if (scroll > galleryPosition) {
                if (scroll < accessPosition) {
                    $('#side').css({
                        'transform': 'rotate(-90deg) translateY(0)'
                    });
                } else {
                    $('#side').css({
                        'transform': 'rotate(-90deg) translateY(60px)'
                    });
                }
            } else {
                $('#side').css({
                    'transform': 'rotate(-90deg) translateY(60px)'
                });
            }
        } else {
            $('#side').css({
                'transform': 'rotate(-90deg) translateY(60px)'
            });
        }
    }

    function handleScroll() {
        const scroll = $(window).scrollTop();
        mv_scale(scroll);
        fadeInEffect();
        toggleHeader(scroll);
        toggleBg();
        updateSideButtonVisibility();
    }

    $(window).on('scroll resize', handleScroll);

    $(".hamburger, .nav").click(function(){ 
        $(".hamburger, .nav").toggleClass("active");
    });

    function init() {
        handleScroll();
        if ($(window).scrollTop() <= 520) {
            $('.logo, .hamburger').hide();
        }
        $('.bg').hide();
    }

    init();
});

