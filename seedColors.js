const axios = require('axios');
axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=colourpop')
.then(({ data }) => {
  // console.log(data[2].product_colors[0], data[1].product_colors[0]);
  data[2].product_colors.pop();
  const colors = [...data[1].product_colors, ...data[2].product_colors];
  colors.forEach(color => {
    database.ref('colors/' + color.colour_name).set({
      colour_name: color.colour_name,
      hex_value: color.hex_value
    });
  });
})
.catch( err => console.error(err) );