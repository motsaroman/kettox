var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    init: function () {
      document.querySelector(".swiper-button-prev").style.display = "none";
      document.querySelector(".swiper-button-next").style.display = "none";
    },
    slideChange: function () {
      if (this.isBeginning) {
        document.querySelector(".swiper-button-prev").style.display = "none";
        document.querySelector(".swiper-button-next").style.display = "none";
      } else {
        document.querySelector(".swiper-button-prev").style.display = "block";
      }

      if (this.isEnd) {
        document.querySelector(".swiper-button-next").style.display = "none";
      } else {
        document.querySelector(".swiper-button-next").style.display = "block";
      }
      if (this.realIndex === 1) {
        document.querySelector(".swiper-button-prev").style.display = "none";
      }
      if (this.realIndex === 0) {
        document.querySelector(".swiper-button-prev").style.display = "none";
        document.querySelector(".swiper-button-next").style.display = "none";
      }
    },
  },
});

document.addEventListener('DOMContentLoaded', () => {

  //modal
  const modals = document.querySelectorAll('.modal-wrap');
  let activeModal = null;

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    clearTimeout(modal.timeout);
  }

  function displayRandomModal() {
    if (activeModal) {
      activeModal.classList.remove('active');
      clearTimeout(activeModal.timeout);
    }

    const randomIndex = Math.floor(Math.random() * modals.length);
    const modalToDisplay = modals[randomIndex];

    modalToDisplay.classList.add('active');

    modalToDisplay.timeout = setTimeout(() => {
      modalToDisplay.classList.remove('active');

      if (activeModal === modalToDisplay) {
        displayRandomModal();
      }
    }, 10000);

    activeModal = modalToDisplay;

    const closeModalButton = modalToDisplay.querySelector('.closeModal');
    closeModalButton.addEventListener('click', () => {
      modalToDisplay.classList.remove('active');
      clearTimeout(modalToDisplay.timeout);
    });
  }

  setInterval(displayRandomModal, 10000);

  //popup
  const popupWrap = document.getElementsByClassName('popup__wrap')[0];

  window.addEventListener('mouseout', function (event) {
    if (event.clientY <= 0 || event.clientX <= 0 || event.clientX >= window.innerWidth || event.clientY >= window.innerHeight) {
      popupWrap.classList.add('active');
    } else {
      popupWrap.classList.remove('active');
    }
  });
  const popups = document.getElementsByClassName('popup');
  window.addEventListener('mouseout', function (event) {

    if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {

      for (const popup of popups) {
        popup.classList.add('active');
      }
    } else {
      for (const popup of popups) {
        popup.classList.remove('active');

      }
    }
  });

  //time

  function updateCountdown() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const timeLeft = end - now;

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.querySelector('.hours').textContent = hours;
    document.querySelector('.minutes').textContent = minutes;
    document.querySelector('.seconds').textContent = seconds;
  }

  setInterval(updateCountdown, 1000);

  updateCountdown();
});





