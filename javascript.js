const $buttons = $('#buttons');
const $endGame = $('#end-game');
const $inGame = $('.in-game');
const $remaining = $('h3.in-game');
const $restart = $('#end-game a');
const $colorName = $('#color-name');
const $color1 = $('#color1');
const $color1Text = $('#text-color1');
const $color2 = $('#color2');
const $color2Text = $('#text-color2');
let wins = 0;
let losses = 0;
let correctColor;
let inClick = false;
let playing = true;
const ref = database.ref('colors');

function start(colors) {
  wins = 0;
  losses= 0;
  updateScore();
  newColor(colors);
}

function newColor(colors) {
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
  $remaining.text(wins + losses + '/10');
}

function displaySollution() {
  $color1Text.text($color1.attr('name'));
  $color2Text.text($color2.attr('name'));
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  })
}

function selectColor(e, colors) {
  if(inClick) {
    return;
  }
  inClick = true;
  if ($(e.target).attr('name') === correctColor) {
    wins++;
  } else {
    losses++;
  }
  displaySollution().then( () => {
      updateScore();
      if(wins + losses < 10) {
        newColor(colors);
        inClick = false;
      } else {
        inClick = false;
        toggleEndGame(colors);
      }
    }
  )
}

function toggleEndGame(colors) {
  if(playing) {
    playing = !playing;
    $endGame.css({display: 'block'});
    $buttons.css({display: 'none'});
    $inGame.css({display: 'none'});
  } else {
    playing = !playing;
    $endGame.css({display: 'none'});
    $buttons.css({display: 'flex'});
    $inGame.css({display: 'block'});
    start(colors);
  }
}

$(document).ready(function() {
  ref.on('value', function(colorsData) {
    const colors = Object.values(colorsData.val());
    $color1.on('click', (e) => selectColor(e, colors));
    $color2.on('click', (e) => selectColor(e, colors));
    $restart.on('click', () => toggleEndGame(colors));
    start(colors);
  })
});
