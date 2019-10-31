'use strict';
let seen = {};

function Img(obj) {
  this.img_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

Img.allImgs = [];

Img.prototype.render = function () {
  // $('main').append('<div class="clone"></div>');

  // let objClone = $('div[class="clone"]');
  // // console.log('clone ', objClone);
  // let objHtml = $('#photo-template').html();

  // objClone.html(objHtml);

  // objClone.find('h2').text(this.title);
  // // console.log('title ', this.title);

  // objClone.find('img').attr('src', this.img_url);
  // // console.log('image', this.img_url);
  // objClone.find('p').text(this.description);
  // objClone.removeClass('clone');
  // objClone.attr('class', this.keyword);

  //HandleBar Template
  let source   = document.getElementById('img-template').innerHTML;
  let template = Handlebars.compile(source);
  // let context = {title: "My New Post", body: "This is my first post!"};
  let html    = template(this);
  $('main').append(html );

  // console.log('html ', objHtml);
  // Fill Select with options
  // $('option').remove();
  if ( ! seen[this.keyword]) {
    $('select').append('<option class="clone"></option>');
    let selectClone = $('option[class="clone"]');
    selectClone.attr('value', this.keyword);
    selectClone.text(this.keyword);
    selectClone.removeClass('clone');
    seen[this.keyword] = true;
  }
};

Img.readJson = (jsonFile) => {
  $.get(jsonFile)
    .then(data => {
      data.forEach(item => {
        Img.allImgs.push(new Img(item));
        // console.log(Img.allImgs);
      });
    })
    .then(Img.loadImgs);
};

Img.loadImgs = () => {
  Img.allImgs.forEach(obj => obj.render());
};

Img.readJson('../data/page-1.json');
let butVal;

$(document).ready(function () {
  console.log(Img.allImgs);
  //Switch Pages
  $('input.page').on('click', function () {
    $('div').remove();
    Img.allImgs = [];
    butVal = $(this).val();
    // console.log('butt: ', butVal);
    if (butVal === 'Page 1') {
      Img.readJson('../data/page-1.json');
      $('div').show();
    }
    else if (butVal === 'Page 2') {
      Img.readJson('../data/page-2.json');
      $('div').show();
    }
  })
  //Sorting
  $('input.sort').on('click', function () {
    console.log($(this).val());
    if ($(this).val() === 'horns') {
      Img.allImgs.sort((a,b)=>{
        return b.horns - a.horns;
      });
      console.log(Img.allImgs);
      $('div').show();
    }
    else if ($(this).val() === 'title') {
      Img.allImgs.sort( (a, b)=>{
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      $('div').show();
      console.log(Img.allImgs);
    }
    $('div').remove();
    Img.loadImgs();
  });

  // Filter
  $('select').on('change', function () {
    $('div').hide();
    let selectedValue = $(this).val();
    if (selectedValue === 'default') {
      $('div').show();
    } else {
      $(`div[class=${selectedValue}]`).show();
    }
  });

})
