import touchDevice from "./touchDevice";

const hover = (el, mobile = false) => {
    const element = el.length > 1 ? [...document.querySelectorAll(el)] : el;

    function toggleClass(item) {

        if (!touchDevice()) {
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('hover')) {
                    item.classList.add('hover');
                }
            })
            item.addEventListener('mouseleave', () => {
                item.classList.remove('hover');
            })
        }

        else if (touchDevice() && mobile) {
            item.addEventListener('click', () => {
                if (!item.classList.contains('hover')) {
                    item.classList.add('hover');
                } else {
                    item.classList.remove('hover');
                }
            })
        }
    }

    el.length > 1 ? element.map((item) => toggleClass(item)) : toggleClass(el)
};

export default hover;