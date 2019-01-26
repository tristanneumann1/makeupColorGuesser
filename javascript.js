const $colorName = $('#color-name');
const $color1 = $('#color1');
const $color1Text = $('#text-color1');
const $color2 = $('#color2');
const $color2Text = $('#text-color2');
let wins = 0;
let losses = 0;
let correctColor;
let inClick = false;

function start() {
  wins = 0;
  losses= 0;
  updateScore();
  newColor();
}

function newColor() {
  $color1Text.text('');
  $color2Text.text('');
  let i = Math.floor(Math.random() * colors.length);
  let j = Math.floor(Math.random() * colors.length);
  while(j === i) {
    j = Math.floor(Math.random() * colors.length)
  }
  correctColor = colors[i].colour_name;
  $colorName.text(correctColor); 
  if(Math.random() > 0.5) {
    $color1.css('backgroundColor', colors[i].hex_value);
    $color1.attr('name', colors[i].colour_name);
    $color2.css('backgroundColor', colors[j].hex_value);
    $color2.attr('name', colors[j].colour_name);
  } else {
    $color2.css('backgroundColor', colors[i].hex_value);
    $color2.attr('name', colors[i].colour_name);
    $color1.css('backgroundColor', colors[j].hex_value);
    $color1.attr('name', colors[j].colour_name);
  }
}

function updateScore() {
  $('.wins').text(wins);
  $('.losses').text(losses);
}

function displaySollution() {
  $color1Text.text($color1.attr('name'));
  $color2Text.text($color2.attr('name'));
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  })
}

function selectColor(e) {
  if(inClick) {
    return;
  }
  inClick = true;
  if ($(this).attr('name') === correctColor) {
    wins++;
  } else {
    losses++;
  }
  displaySollution().then( () => {
      updateScore();
      newColor();
      inClick = false;
    }
  )
}

$color1.on('click', selectColor);
$color2.on('click', selectColor);

$(document).ready(function($) {
  start();
});