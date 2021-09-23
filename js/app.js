$(function () {
  //Фиксированная шапка
  const header = $('[data-header]');
  const intro = $('[data-intro]');
  let introHeight = intro.innerHeight() + header.innerHeight();

  $(window).on('scroll load resize', function () {
    let scroll = $(this).scrollTop();
    introHeight = intro.innerHeight() + header.innerHeight();

    scroll > introHeight ? header.addClass('fixed') : header.removeClass('fixed');
  });

  //Плавный скролл
  $('[data-scroll]').on('click', function(event) {
    event.preventDefault();

    let elementID = $(this).data('scroll');
    let elementPosition = $(elementID).offset().top;

    $('html, body').animate({
      scrollTop: elementPosition - 150
    }, 500);
  });
  
  //Фильтр проектов
  const filter = $('[data-filter]');
  const categoryItem = $('[data-category]');

  filter.on("click", function (event) {
    event.preventDefault();

    let filterData = $(this).data('filter');

    if (filterData === 'all') {
      categoryItem.removeClass('hide');
    } else {
      categoryItem.each(function () {
        let category = $(this).data('category');

        filterData !== category ? $(this).addClass('hide') : $(this).removeClass('hide');
      });
    };
  });

  //Модальное окно для Resume
  const resumeModal = $('#resume');
  const resumeItem = $('[data-resume]');

  resumeItem.on('click', () => {
    resumeModal.addClass('open');
    $('body').addClass('no-scroll');

    setTimeout(() => {
      resumeModal.find('.resume__inner').css({
        transform: 'rotateX(0)',
      });
    }, 200);
  });

  //Модальное окно Hire me
  const hireModal = $('#hire-me');
  const hireItem = $('[data-hire__me]');

  hireItem.on('click', () => {
    hireModal.addClass('open');
    $('body').addClass('no-scroll');

    setTimeout(() => {
      hireModal.find('.Pmodal__inner').css({
        transform: "rotateX(0)",
      });
    }, 200);
  });

  //Модальное окно для проектов
  const projectSlick = $('[data-slick="Pmodal-slick"]');

  categoryItem.on("click", function () {
    const modalID = $(this).data('modal');

    $(modalID).addClass('open');
    $('body').addClass('no-scroll');

    setTimeout(() => {
      $(modalID).find('.Pmodal__inner').css({
        transform: "rotateX(0)",
      });
    }, 200);

    projectSlick.slick('setPosition');
  });

  //Закрытие модального окна (на крестик)
  const close = $('[data-close]')

  close.on('click', function () {
    const parentModal = $(this).parents('.Pmodal');

    if ($(this).data('close') === 'resume') {
      resumeModal.find('.resume__inner').css({
        transform: 'rotateX(90deg)',
      });

      setTimeout(() => {
        $('body').removeClass('no-scroll');
        resumeModal.removeClass('open');
      }, 200);
    } else {
      parentModal.find('.Pmodal__inner').css({
        transform: 'rotateX(90deg)',
      });

      setTimeout(() => {
        //Проверка на наличие открытого резюме
        if (resumeModal.hasClass('open')) {
          parentModal.removeClass('open');
        } else {
          $('body').removeClass('no-scroll');
          parentModal.removeClass('open')
        }
      }, 200);
    }
  });

  //Закрытие модального окна (на background)
  const Modal = $('.Pmodal');

  Modal.on('click', function () {

    if ($(this).is('#resume')) {
      resumeModal.find('.resume__inner').css({
        transform: 'rotateX(90deg)',
      });

      setTimeout(() => {
        $('body').removeClass('no-scroll');
        resumeModal.removeClass('open');
      }, 200);
    } else {
      $(this).find('.Pmodal__inner').css({
        transform: 'rotateX(90deg)',
      });

      setTimeout(() => {
        //Проверка на наличие открытого резюме
        if (resumeModal.hasClass('open')) {
          $(this).removeClass('open');
        } else {
          $('body').removeClass('no-scroll');
          $(this).removeClass('open')
        }
      }, 200);
    }
  });

  $('.resume__inner').on('click', event => {
    event.stopPropagation();
  });

  $('.Pmodal__inner').on('click', event => {
    event.stopPropagation();
  });

  //Slick: https://kenwheeler.github.io/slick/
  
  projectSlick.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    dots: true,
    arrows: false,
    speed: 800,
  });

  $('.Pmodal__btn--prev').on('click', function(event) {
    event.preventDefault();

    let currentSlick = $(this).parents('.Pmodal').find('[data-slick="Pmodal-slick"]');

    currentSlick.slick('slickPrev');
  })

  $('.Pmodal__btn--next').on('click', function(event) {
    event.preventDefault();

    let currentSlick = $(this).parents('.Pmodal').find('[data-slick="Pmodal-slick"]');

    currentSlick.slick('slickNext');
  })
});