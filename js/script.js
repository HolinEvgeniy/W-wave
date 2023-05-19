function search() {
  const searchBtn = document.querySelector('.header__search');
  const searchForm = document.querySelector('.search__form');
  const searchInput =document.querySelector('.search__input');
  searchBtn.addEventListener('click', function() {
    searchForm.classList.toggle('visible');
    searchInput.classList.toggle('visible');
  });
};


function enter() {
  const enterBtnMax = document.querySelector('.header__entry--max');
  const enterBtnMin = document.querySelector('.header__entry--min');
  const enterWindow = document.querySelector('.blackout');
  const closeBtn = document.querySelector('.blackout__close');
  const body = document.body;

  enterBtnMax.addEventListener('click', showEnter);
  enterBtnMin.addEventListener('click', showEnter);
  closeBtn.addEventListener('click', closeEnter);

  let keys = {
    ESC: 27,
  };

  enterWindow.inert = true;
  let previousActiveElement;

  function showEnter() {
    enterWindow.classList.add('visible');
    previousActiveElement = document.activeElement;
    Array.from(body.children).forEach((child) => {
      if (child !== enterWindow) {
        child.inert = true;
      }
    });
    enterWindow.inert = false;
    setTimeout(() => {
      closeBtn.focus();
    }, 100);
    document.addEventListener('keydown', function(elem) {
      if (elem.keyCode == keys.ESC) {
        closeEnter();
      }
    });
  };

  function closeEnter() {
    enterWindow.classList.remove('visible');
    Array.from(body.children).forEach((child) => {
      if (child !== enterWindow) {
        child.inert = false;
      }
    });
    enterWindow.inert = true;
    setTimeout(() => {
      previousActiveElement.focus();
    }, 100);
  };
};


function validateEnter() {
  new JustValidate('.blackout__form', {
    rules: {
      login: {
        required: true,
        minLength: 2,
        strength: {
          custom: '[а-я, А-Я, a-z, A-Z]'
        }
      },
      password: {
        required: true,
      }
    },
    messages: {
      login: {
        required: 'Введите логин',
        minLength: 'Минимальная длина 2',
        strength: 'Неразрешенные символы'
      },
      password: 'Введите пароль'
    },
    colorWrong: '#D52B1E',
  });
}


function showMore() {
  const moreBtn = document.querySelector('.podcasts__btn');
  const podcastsItem = document.querySelectorAll('.podcasts__item');
  const podcastsClose = document.querySelector('.podcasts__btn--close');
  moreBtn.addEventListener('click', function() {
    podcastsItem.forEach(function(elem) {elem.classList.add('podcasts__item--visible')});
    moreBtn.classList.add('podcasts__btn--hidden');
    podcastsClose.classList.remove('close-hidden');
  });
  podcastsClose.addEventListener('click', function() {
    podcastsItem.forEach(function(elem) {elem.classList.remove('podcasts__item--visible')});
    moreBtn.classList.remove('podcasts__btn--hidden');
    podcastsClose.classList.add('close-hidden');
  });
};


function choice() {
  const element = document.querySelector('.action__select');
  const choice = new Choices(element, {
    itemSelectText: '',
    searchEnabled: false,
    position: 'bottom',
    shouldSort: false
  });
};


function accordion() {
  new Accordion('.accordion', {
    openOnInit: [0]
  });
};

function accordionContent() {
  const tabsBtn = document.querySelectorAll('.accordion__link');
  const tabsContent = document.querySelectorAll('.guests__window-info');
  const acClose = document.querySelectorAll('.ac-trigger');
  const plug = document.querySelector('.guests__window-plug');
  tabsBtn.forEach(function(element) {
    element.addEventListener('click', function(elem) {
      const path = elem.currentTarget.dataset.path;
      if (path == 'empty') {
        plug.classList.add('this-active');
      } else {
        plug.classList.remove('this-active');
      };
      elem.currentTarget.classList.add('this-active');
      tabsContent.forEach(function(element) {element.classList.remove('this-active')});
      document.querySelector(`[data-target="${path}"]`).classList.add('this-active');
    });
  });
  acClose.forEach(function(element) {
    element.addEventListener('click', function(elem) {
      const path = elem.currentTarget.dataset.path;
      elem.currentTarget.classList.remove('this-active');
      tabsContent.forEach(function(element) {element.classList.remove('this-active')});
      document.querySelector(`[data-target="${path}"]`).classList.remove('this-active');
    });
  });
};


function slider() {
  const swiper = new Swiper('.description__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 32
      },
      1301: {
        slidesPerView: 4,
        spaceBetween: 24,
      }
    },
    rewind: true
  });
};


function validate() {
  new JustValidate('.description__form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        strength: {
          custom: '[а-я]'
        }
      },
      mail: {
        required: true,
        email: true
      },
      checkbox: {
        required: true
      }
    },
    messages: {
      name: 'Ошибка',
      mail: 'Ошибка'
    },
    colorWrong: '#D52B1E',
    submitHandler: function(thisForm) {
      let formData = new FormData(thisForm);
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const sent = document.querySelector('.sent');
            const sentWindow = document.querySelector('.sent-window');
            const sentBtn = document.querySelector('.sent-window-btn');
            const page = document.querySelector('.page');

            sent.classList.add('sent-active');
            sentWindow.classList.add('sent-active');
            page.classList.add('page-overflow');

            setTimeout(() => {
              sentBtn.focus();
            }, 100);

            sentBtn.addEventListener('click', function() {
              sent.classList.remove('sent-active');
              sentWindow.classList.remove('sent-active');
              page.classList.remove('page-overflow');
            });
          };
        };
      };

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      thisForm.reset();
    }
  });
};


function burger() {
  const burgerBtn = document.querySelector('.header__burger');
  const burgerMenu = document.querySelector('.header__burger-menu');
  const burgerClose = document.querySelector('.burger-menu__close');
  const menuLink = document.querySelectorAll('.burger-nav__link');
  const burgBottomMenu = document.querySelector('.header__bottom');
  const page = document.querySelector('.page');

  burgerBtn.addEventListener('click', burgerOpen);
  burgerClose.addEventListener('click', burgerEsc);

  let keys = {
    ESC: 27,
  };

  function burgerOpen() {
    burgerMenu.classList.add('burger-menu__open');
    burgerMenu.style.transition = 'transform 0.3s ease-in-out, visibility 0.3s ease-in-out';
    burgBottomMenu.style.transition = 'transform 0.3s ease-in-out';
    burgBottomMenu.classList.add('header__bottom-active');
    page.classList.add('page-overflow');
    setTimeout(() => {
      burgerClose.focus();
    }, 100);
    document.addEventListener('keydown', function(elem) {
      if (elem.keyCode == keys.ESC) {
        burgerEsc();
      }
    });
  };

  function burgerEsc() {
    burgerMenu.classList.remove('burger-menu__open');
    burgBottomMenu.classList.remove('header__bottom-active');
    page.classList.remove('page-overflow');
    setTimeout(() => {
      burgerBtn.focus();
    }, 100);
  };

  burgerMenu.addEventListener('transitionend', function() {
    if (!burgerMenu.classList.contains('burger-menu__open')) {
      burgerMenu.removeAttribute('style');
    };
  });

  burgBottomMenu.addEventListener('transitionend', function() {
    if (!burgBottomMenu.classList.contains('header__bottom-active')) {
      burgBottomMenu.removeAttribute('style');
    };
  });

  menuLink.forEach(function(element) {
    element.addEventListener('click', function() {
      burgerMenu.classList.remove('burger-menu__open');
      burgBottomMenu.classList.remove('header__bottom-active');
    });
  });
};


function playFrame() {
  const frameBtn = document.querySelectorAll('.header__frame');
  frameBtn.forEach(function(element) {
    element.addEventListener('click', function(elem) {
      const self = elem.currentTarget;
      const playIcon = self.querySelector('.header__btn');
      const pauseIcon = self.querySelector('.header__pause');
      playIcon.classList.toggle('header__btn-disactive');
      pauseIcon.classList.toggle('header__btn-disactive');
    });
  });
};


function playPodcasts() {
  const playBtn = document.querySelectorAll('.podcasts__play');
  playBtn.forEach(function(element) {
    element.addEventListener('click', function(elem) {
      const self = elem.currentTarget;
      const playIcon = self.querySelector('.podcasts__icon');
      const pauseIcon = self.querySelector('.podcasts__pause');
      playIcon.classList.toggle('position-active');
      pauseIcon.classList.toggle('position-active');
    });
  });
};


function playPlaylists() {
  const playBtn = document.querySelectorAll('.playlists__item');
  playBtn.forEach(function(element) {
    element.addEventListener('click', function(elem) {
      const self = elem.currentTarget;
      const playIcon = self.querySelector('.playlists__play');
      const pauseIcon = self.querySelector('.playlists__pause');
      const content = self.querySelector('.playlists__content');
      const title = self.querySelector('.playlists__subtitle');
      const placeholder = self.querySelector('.playlists__placeholder');
      const blackout = self.querySelector('.playlists__image-blackout');
      playIcon.classList.toggle('play-active');
      pauseIcon.classList.toggle('play-disactive');
      content.classList.toggle('content-active');
      title.classList.toggle('text-active');
      placeholder.classList.toggle('text-active');
      blackout.classList.toggle('blackout-active');
    });
  });
};


function headerPlay() {
  const playBtn = document.querySelector('.header__play');
  const frameBtn = document.querySelector('.header__buttons');
  const closeBtn = document.querySelector('.header__btn-title');

  playBtn.addEventListener('click', function() {
    frameBtn.classList.add('header__buttons-active');
    frameBtn.style.transition = 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out';
    setTimeout(() => {
      closeBtn.focus();
    }, 100);
  });
  frameBtn.addEventListener('transitionend', function() {
    if (!frameBtn.classList.contains('header__buttons-active')) {
      frameBtn.removeAttribute('style');
    };
  });
  closeBtn.addEventListener('click', function() {
    frameBtn.classList.remove('header__buttons-active');
    setTimeout(() => {
      playBtn.focus();
    }, 100);
  });
};


function centerBtn() {
  const centerBtn = document.querySelector('.header__center');
  const centerIcon = document.querySelector('.header__center-icon');
  const frameBtn = document.querySelector('.header__buttons-center');
  centerBtn.addEventListener('click', function() {
    centerBtn.classList.toggle('header__center-active');
    centerIcon.classList.toggle('center__btn-active');
    frameBtn.classList.toggle('center-active');
  });
};


function playlistsSlider() {
  const swiper = new Swiper('.playlists__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 15,
  });
};


function scrollLink() {
  const MOBILE_WIDTH = 768;

	function getWindowWidth () {
	  return Math.max(
	    document.body.scrollWidth,
	    document.documentElement.scrollWidth,
	    document.body.offsetWidth,
	    document.documentElement.offsetWidth,
	    document.body.clientWidth,
	    document.documentElement.clientWidth
	  );
	}


  function scrollToContent (link, isMobile) {
		if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
			return;
		};

	  const href = link.getAttribute('href').substring(1);
	  const scrollTarget = document.getElementById(href);
	  const elementPosition = scrollTarget.getBoundingClientRect().top;

	  window.scrollBy({
	      top: elementPosition,
	      behavior: 'smooth'
	  });
	};


  const link = document.querySelectorAll('.js-tab-btn');

  link.forEach(function(element) {
    element.addEventListener('click', function(elem) {
      elem.preventDefault();

      scrollToContent(this, true)
    });
  });
};


function hover() {
  let isMobile = {
    Android: function() {return navigator.userAgent.match(/Android/i);},
    BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
    iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
    Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
    Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
    any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())},
  };

  const page = document.querySelector('.page');

  if (isMobile.any()) {
    page.classList.add('touch');
  } else {
    page.classList.add('mouse');
  };
};


search();
enter();
validateEnter()
showMore();
choice();
accordion();
accordionContent();
playlistsSlider();
slider();
validate();
burger();
playFrame();
playPodcasts();
playPlaylists();
headerPlay();
centerBtn();
scrollLink();
hover();
