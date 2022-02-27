let arr = [],
    busketArr = [];


async function start() {
    await import('./components/Header.js').then(value => getValue(value));
    await import('./components/Main.js').then(value => getValue(value));
    await import('./components/Nav.js').then(value => getValue(value));
    await import('./components/Footer.js').then(value => getValue(value));
    await arr.forEach(value => document.querySelector('.app').appendChild(value))
}


async function proverka() {
    if (!localStorage.getItem('catalog')) {
        await import('./components/App.js')
        setTimeout(() => proverka(), 1000)
    } else {
        await import('./components/App.js')
        await start()
    }
}

window.addEventListener('hashchange', function() {
    console.log(window.location.hash)
    switch(window.location.hash) {
        case "#cart/": busketOpen()
            break;
    }
})
// async function proverka() {
//     await import('./components/App.js')
//     await console.log('1')
//     const asyncLocalStorage = {
//         setItem: async function (key, value) {
//             await null;
//             return localStorage.setItem(key, value);
//         },
//         getItem: async function (key) {
//             await null;
//             return localStorage.getItem(key);
//         }
//     };
//     await asyncLocalStorage.getItem('catalog')
//     await console.log(localStorage.getItem('catalog'))
//     await console.log('2')
//     await start()
// }

proverka()
function getValue(value) {
    arr.push(Object.values(value)[0])
}

document.addEventListener('click', add);


function catalog() {
            document.querySelectorAll('.busket__container').forEach(v => v.remove())
            document.querySelector('.main__container').hidden = false;
            document.querySelector('.header__busket').innerHTML = 'Busket'
}
function busketOpen() {
    document.querySelector('.main__str')?.remove()
    let main = document.querySelector('.main'),
    busketContainer = document.createElement('div'),
    busket = JSON.parse(localStorage.getItem('busket'));
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
        <div class="main__buttons">
            <button data-status="view" class="main__button">watch more</button>
            <button data-status="delete" class="main__button">Delete</button>
        </div>
    </div>
    `
});
main.appendChild(busketContainer)

main.querySelector('.main__container').hidden = true;
document.querySelector('.header__busket').innerHTML = 'Catalog'
}

function getProduct(hash) {
    document.querySelectorAll('.busket__container').forEach(v => v.remove())
        let catalog = JSON.parse(localStorage.getItem('catalog')),
            main = event.target.closest('.main__item'),
            num = +main.querySelector('.id').dataset.id - 1,
            obj = catalog[num];
            
            document.querySelector('.main').innerHTML += `
            <div class="main__str">
                <div class="id" data-id="${obj.id}"></div>
                <div class="main__shadow"></div>
                <div class="main__title">${obj.id}: ${obj.title}</div>
                <div class="main__img">
                    <img src="${obj.image}" alt="${obj.id}">
                </div>
                <div class="main__wrapper">
                    <div class="main__price">Price: $${obj.price} Rating: ${obj.rating.rate}</div>
                    <div class="main__description">${obj.description}</div>
                    <div class="main__category">${obj.category}</div>
                </div>
            </div>
            `
}
function add() {
    if (event.target.dataset.status === 'add') {
        !localStorage.getItem('busket') ? busketArr = [] : busketArr = JSON.parse(localStorage.getItem('busket'));

        let catalog = JSON.parse(localStorage.getItem('catalog')),
            main = event.target.closest('.main__item'),
            num = +main.querySelector('.id').dataset.id - 1,
            obj = catalog[num];

            busketArr.push(obj)
            localStorage.setItem('busket', JSON.stringify(busketArr))
            !getCookie('cost') ? document.cookie = `cost=${obj.price}` : document.cookie = `cost=${(+getCookie('cost') + +obj.price).toFixed(2)}`
            !getCookie('num') ? document.cookie = `num=${1}` : document.cookie = `num=${+getCookie('num') + 1}`
            document.querySelector('.header__cost').innerHTML = `$${getCookie('cost')}`;
            document.querySelector('.header__num').innerHTML = `${getCookie('num')}`;

    } else if (event.target.dataset.status === 'busket' && getCookie('num') && localStorage.getItem('busket')) {

            document.querySelector('.busket__container') ? catalog() : busketOpen()

    } else if (event.target.dataset.status === 'view') {

            getProduct()

    } else if(event.target.dataset.status === 'delete') {
        let catalog = JSON.parse(localStorage.getItem('catalog')),
            main = event.target.closest('.main__item'),
            busket = JSON.parse(localStorage.getItem('busket')),
            num = +main.querySelector('.id').dataset.id - 1,
            obj = catalog[num];
            obj = busket.find(value => value.id === obj.id)
            obj = busket.indexOf(obj)
            busket.splice(obj, 1)
            let cost = 0,
                iter = getCookie('num');
                iter--;
            for(let key of busket) {
                cost += +key.price
            }
            console.log(cost, iter)
            document.cookie = 'num=' + iter;
            document.cookie = 'cost=' + cost;
            document.querySelector('.header__cost').innerHTML = '$' + cost.toFixed(2)
            document.querySelector('.header__num').innerHTML = iter
            localStorage.setItem('busket', JSON.stringify(busket))
            main.remove()
            if(document.querySelectorAll('.busket__container .main__item').length === 0) {
                document.querySelector('.main__container').hidden = false;
                document.querySelector('.header__busket').innerHTML = 'Busket'
            }
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
    }



