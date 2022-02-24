export class App {
    create() {
        let element = document.createElement('div');
        element.classList.add('app');
        return element;
    }
    render(data = null) {
        let element = this.create()
        document.body.appendChild(element)
        element.innerHTML = data
    }
    init(data) {
        if (!localStorage.getItem('catalog')) {
            this.getData()
        }
        document.documentElement.setAttribute('lang', 'en')
        document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="./styles/style.css" rel="stylesheet">
        <title>Document</title>`
        this.create()
        this.render(data)
    }
    getData() {
        let url = 'https://fakestoreapi.com/products'
        fetch(url).then(response => response.json()).then(json => localStorage.setItem('catalog', JSON.stringify(json)))
    }
}

export default new App().init()



