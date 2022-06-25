const popup = () => {
    const btns = [...document.querySelectorAll('.js-button-buy')],
        btnParent = document.querySelector('.js-btns-parent'),
        modalWrapper = document.querySelector('.js-modal'),
        modal = document.querySelector('.modal'),
        counterElement = modal.querySelector('.js-counter'),
        closeBtn = modal.querySelector('.js-close');
    let timer,
        counter = 30;

    function initCounter() {
        timer = setInterval(() => {
            if (counter > 1) {
                counter--;
                counterElement.innerHTML = counter;
            } else {
                clearInterval(timer)
                modalWrapper.classList.remove('open');
            }
        }, 1000);
    }

    btnParent.addEventListener("click", function (ev) {
        const cardParent = ev.target.closest('.card').querySelector('.js-content');
        btns.forEach((el) => {
            if (ev.target === el) {
                counter = 30;
                counterElement.innerHTML = counter.toString();

                modal.style.width = cardParent.offsetWidth + 'px';
                modalWrapper.classList.add('open');
                modal.querySelector('.js-content-update').innerHTML = cardParent.innerHTML;
                initCounter();
            }
        })
    });

    closeBtn.addEventListener('click', function (ev) {
        ev.preventDefault();
        modalWrapper.classList.remove('open');
        clearInterval(timer);
    });
}

export default popup;