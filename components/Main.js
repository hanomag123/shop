class Main {
    create() {
        let main = document.createElement('main'),
            container = document.createElement('div'),
            catalog = localStorage.getItem('catalog')
        catalog = JSON.parse(catalog)
        container.classList.add('main__container')
        main.classList.add('main')
        main.appendChild(container)
        catalog.forEach((element) => {
            container.innerHTML += `
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
        return main
    }
    init() {
        let element = this.create();
        return element;
    }
}

const main = new Main().init();
export {main};