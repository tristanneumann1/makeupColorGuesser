const axios = require('axios');
const fs = require('fs');
axios.get('http://makeup-api.herokuapp.com/api/v1/products.json?brand=colourpop')
.then(({ data }) => {
  console.log(data[2].product_colors[0], data[1].product_colors[0]);
  data[2].product_colors.pop();
  const colorsJSON = JSON.stringify([...data[1].product_colors, ...data[2].product_colors]);
  fs.writeFile('colors.json', colorsJSON, (err)=>{
    if(err) {
      console.error(err);
    } else {
      console.log('colors loaded');
    }
  })
})
.catch( err => console.error(err) );