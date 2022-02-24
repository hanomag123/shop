class Footer {
    create() {
        let footer = document.createElement('footer')
        footer.classList.add('footer')
        footer.innerHTML = `

        `
        return footer
    }
    init() {
        let element = this.create();
        return element;
    }
}

const footer = new Footer().init();
export {footer};