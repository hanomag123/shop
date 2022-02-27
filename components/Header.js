class Header {
    create(cost = 0, num = 0) {
        let header = document.createElement('header')
        header.classList.add('header')
        header.setAttribute('data-status','busket')
        header.innerHTML = `
            <div class="header__cost">$${cost}</div>
            <div class="header__busket">Busket</div>
            <div class="header__num">${num}</div>
        `
        return header
    }
    init() {
        if (localStorage.getItem('busket')) {
            let element = this.create(getCookie('cost'), getCookie('num'));
        return element;
        } else {
            document.cookie = 'cost=0'
            document.cookie = 'num=0'
            let element = this.create();
        return element;
        }
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