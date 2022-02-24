class Nav {
    create() {
        let nav = document.createElement('nav')
        nav.classList.add('nav')
        nav.innerHTML = `

        `
        return nav
    }
    init() {
        let element = this.create();
        return element;
    }
}

const nav = new Nav().init();
export {nav};