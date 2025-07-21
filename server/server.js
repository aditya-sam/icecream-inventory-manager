const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 5000;

let iceCreams = [
  {id: 0, name: 'Vanilla'},
  {id: 1, name: 'Chocolate'},
  {id: 2, name: 'Strawberry'},
  {id: 3, name: 'Mint Chocolate Chip'},
  {id: 4, name: 'Cookie Dough'},
  {id: 5, name: 'Butter Pecan'},
  {id: 6, name: 'Rocky Road'},
  {id: 7, name: 'Pistachio'},
  {id: 8, name: 'Mango'},
  {id: 9, name: 'Coffee'},
  {id: 10, name: 'Cookies and Cream'},
  {id: 11, name: 'Salted Caramel'},
  {id: 12, name: 'Neapolitan'},
  {id: 13, name: 'Birthday Cake'},
  {id: 14, name: 'Lemon Sorbet'},
  {id: 15, name: 'Raspberry Ripple'},
  {id: 16, name: 'Black Cherry'},
  {id: 17, name: 'Green Tea'},
  {id: 18, name: 'Coconut'},
  {id: 19, name: 'Peanut Butter Cup'},
  {id: 20, name: 'Maple Walnut'},
  {id: 21, name: 'Rum Raisin'},
  {id: 22, name: 'Blueberry Cheesecake'},
  {id: 23, name: 'Pumpkin Spice'},
  {id: 24, name: 'Dulce de Leche'},
  {id: 25, name: 'Tiramisu'},
  {id: 26, name: 'Honeycomb'},
  {id: 27, name: 'S’mores'},
  {id: 28, name: 'Brownie Batter'},
  {id: 29, name: 'Cherry Garcia'}
];

let menuData = [
  {
    id: 1,
    iceCream: {id: 0, name: 'Vanilla'},
    inStock: true,
    price: 2.5,
    quantity: 10,
    description: 'A selection of delicious ice cream flavors.'
  },
  {
    id: 2,
    iceCream: {id: 5, name: 'Butter Pecan'},
    inStock: true,
    price: 3.0,
    quantity: 8,
    description: 'Rich and creamy butter pecan ice cream.'
  },
  {
    id: 3,
    iceCream: {id: 10, name: 'Cookies and Cream'},
    inStock: false,
    price: 2.8,
    quantity: 0,
    description: 'Classic cookies and cream flavor.'
  },
  {
    id: 4,
    iceCream: {id: 14, name: 'Lemon Sorbet'},
    inStock: true,
    price: 2.2,
    quantity: 12,
    description: 'Refreshing lemon sorbet, dairy-free.'
  },
  {
    id: 5,
    iceCream: {id: 22, name: 'Blueberry Cheesecake'},
    inStock: true,
    price: 3.5,
    quantity: 5,
    description: 'Blueberry cheesecake ice cream with real fruit.'
  },
  {
    id: 6,
    iceCream: {id: 19, name: 'Peanut Butter Cup'},
    inStock: false,
    price: 3.2,
    quantity: 0,
    description: 'Peanut butter ice cream with chocolate cups.'
  },
  {
    id: 7,
    iceCream: {id: 27, name: 'S’mores'},
    inStock: true,
    price: 3.8,
    quantity: 7,
    description: 'S’mores ice cream with marshmallow and chocolate.'
  },
];

// Get available stocks 
const getAvailableStocks = () => 
  iceCreams.filter(iceCream => 
    menuData.find(item => item.iceCream.id ===iceCream.id && item.inStock) === undefined);

app.get('/api/menu/stock-ice-creams', (req, res) => {
    res.send(getAvailableStocks());
})

app.get('/api/menu/stock-ice-creams/:id', (req, res) => {
  const iceCream = getAvailableStocks().find(item => item.id === parseInt(req.params.id, 10));

  if (iceCream) {
    res.send(iceCream);
  } else {
    res.status(404).send({error: 'Ice cream not found'});
  }
});

app.get('/api/menu', (req, res) => {
  res.send(menuData);
});

app.post('/api/menu', (req, res) => {
  const {iceCream, ...rest} = req.body;
  const newMenuItem = {
    id: menuData.reduce((prev, cur) => (cur.id > prev ? cur.id : prev), 0) + 1,
    iceCream: {
      ...iceCreams.find(item => item.id === parseInt(iceCream.id, 10))
    },
    ...rest
  };
  menuData.push(newMenuItem);

  res.status(201).send(newMenuItem);
});

app.get('/api/menu/:id', (req, res) => {
  const menuItem = menuData.find(item => item.id === parseInt(req.params.id, 10));

  if (menuItem) {
    res.send(menuItem);
  } else {
    res.status(404).send({error: 'Menu item not found'});
  }
});

app.put('/api/menu/:id', (req, res) => {
  const intId = parseInt(req.params.id, 10);
  const {iceCream, ...rest} = req.body;

  const updatedMenuItem = {
    id: intId,
    iceCream: {
      ...iceCreams.find(item => item.id === parseInt(iceCream.id, 10))
    },
    ...rest
  };

  menuData = menuData.map(item => 
    item.id === intId ? updatedMenuItem : item
  );

  res.send(updatedMenuItem);
});

app.delete('/api/menu/:id', (req, res) => {
  menuData = menuData.filter(item => item.id !== parseInt(req.params.id, 10));

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});