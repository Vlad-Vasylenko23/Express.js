// app.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let shoppingCart = [];

// Головна сторінка
app.get('/', (req, res) => {
    res.render('index', { title: 'Доставка їжі', shoppingCart: shoppingCart });
});

// Сторінка меню
app.get('/menu', (req, res) => {
    const menu = [
        { name: 'Піца', price: 10, image: 'pizza.jpg' },
        { name: 'Бургер', price: 8, image: 'burger.jpg' },
        { name: 'Суші', price: 15, image: 'sushi.jpg' }
    ];
    res.render('menu', { title: 'Меню', menu: menu, shoppingCart: shoppingCart });
});

// Додати до корзини
app.post('/add-to-cart', (req, res) => {
    const item = req.body.item;
    shoppingCart.push(item);
    res.redirect('/menu');
});

// Видалити з корзини
app.post('/remove-from-cart', (req, res) => {
    const index = req.body.index;
    shoppingCart.splice(index, 1);
    res.redirect('/cart');
});

// Корзина
app.get('/cart', (req, res) => {
    res.render('cart', { title: 'Корзина', shoppingCart: shoppingCart });
});

app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
