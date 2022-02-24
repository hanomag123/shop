class Header {
    create() {
        let header = document.createElement('header')
        header.classList.add('header')
        header.setAttribute('data-status','busket')
        header.innerHTML = `
            <div class="header__cost">$${getCookie('cost')}</div>
            <div class="header__busket">Busket</div>
            <div class="header__num">${getCookie('num')}</div>
        `
        return header
    }
    init() {
        let element = this.create();
        return element;
    }
}

const header = new Header().init();
export {header};



function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : 0;
    }