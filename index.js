let arr = [],
    main = null,
    busketArr = [];
    

async function start() {
    await import('./components/App.js')
    await import('./components/Header.js').then(value => getValue(value));
    await import('./components/Nav.js').then(value => getValue(value));
    await import('./components/Main.js').then(value => getValue(value));
    await import('./components/Footer.js').then(value => getValue(value));
    await arr.forEach(value => document.querySelector('.app').appendChild(value))
}

start()


function getValue(value) {
    arr.push(Object.values(value)[0])
}

document.addEventListener('click', add);

function add() {
    if (event.target.dataset.status === 'add') {
        let catalog = JSON.parse(localStorage.getItem('catalog'))
        main = event.target.closest('.main__item')
        let num = +main.querySelector('.id').dataset.id - 1,
            obj = catalog[num];
        busketArr.push(obj)
        localStorage.setItem('busket', JSON.stringify(busketArr))
        !getCookie('cost') ? document.cookie = `cost=${obj.price}` : document.cookie = `cost=${(+getCookie('cost') + +obj.price).toFixed(2)}`
        !getCookie('num') ? document.cookie = `num=${1}` : document.cookie = `num=${+getCookie('num') + 1}`
        document.querySelector('.header__cost').innerHTML = `$${getCookie('cost')}`;
        document.querySelector('.header__num').innerHTML = `${getCookie('num')}`;

    } else if (event.target.dataset.status === 'busket' && getCookie('num')) {
        if (document.querySelectorAll('.busket__container') !== null) {
            console.log(document.querySelectorAll('.busket__container').forEach(value => value.remove()))
        }
        let main = document.querySelector('.main'),
            busketContainer = document.createElement('div'),
            busket = JSON.parse(localStorage.getItem('busket'));
            busketContainer.hidden = true
            console.log(document.querySelector('.busket__container'))
            busketContainer.innerHTML = '';
            busketContainer.classList.add('busket__container');
            busket.forEach((element) => {
            busketContainer.innerHTML += `
            <div class="main__item">
                <div class="id" data-id="${element.id}"></div>
                <div class="main__shadow"></div>
                <div class="main__title">${element.id}: ${element.title}</div>
                <div class="main__img">
                    <img src="${element.image}" alt="${element.id}">
                </div>
                <div class="main__wrapper">
                    <div class="main__price">Price: $${element.price}</div>
                    <div class="main__description">${element.description}</div>
                    <div class="main__category">${element.category}</div>
                </div>
                <button data-status="add" class="main__add">Add</button>
            </div>
            `
        });
        main.appendChild(busketContainer)

        busketContainer.hidden = !busketContainer.hidden
        main.querySelector('.main__container').hidden = !main.querySelector('.main__container').hidden

        // document.querySelector('.main__container').hidden = !document.querySelector('.main__container').hidden
        // console.log()
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
    }



