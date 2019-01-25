const $colorName = $('#color-name');
const $color1 = $('#color1');
const $color2 = $('#color2');
let wins = 0;
let losses = 0;

function start() {
  wins = 0;
  losses= 0;
  updateScore();
  newColor();
}

function newColor() {
  let i = Math.floor(Math.random() * colors.length);
  let j = Math.floor(Math.random() * colors.length);
  while(j === i) {
    j = Math.floor(Math.random() * colors.length)
  }
  $colorName.text(colors[i].colour_name); 
  if(Math.random() > 0.5) {
    $color1.css('backgroundColor', colors[i].hex_value);
    $color1.attr('correct', 1);
    $color2.css('backgroundColor', colors[j].hex_value);
    $color2.attr('correct', 0);
  } else {
    $color2.css('backgroundColor', colors[i].hex_value);
    $color2.attr('correct', 1);
    $color1.css('backgroundColor', colors[j].hex_value);
    $color1.attr('correct', 0);
  }
}

function updateScore() {
  $('.wins').text(wins);
  $('.losses').text(losses);
}

function selectColor(e) {
  if (+$(this).attr('correct')) {
    wins++;
  } else {
    losses++;
  }
  updateScore();
  newColor();
}

$color1.on('click', selectColor);
$color2.on('click', selectColor);

$(document).ready(function($) {
  start();
});