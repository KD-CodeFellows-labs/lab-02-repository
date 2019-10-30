'use strict';

function Img(obj) {
  this.img_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
}

Img.allImgs = [];

Img.prototype.render = function () {
  $('main').append('<div class="clone"></div>');

  let objClone = $('div[class="clone"]');
  // console.log('clone ', objClone);
  let objHtml = $('#photo-template').html();

  objClone.html(objHtml);

  objClone.find('h2').text(this.title);
  // console.log('title ', this.title);

  objClone.find('img').attr('src', this.img_url);
  // console.log('image', this.img_url);
  objClone.find('p').text(this.description);
  objClone.removeClass('clone');
  objClone.attr('class', this.keyword);
  // console.log('html ', objHtml);
  $('select').append('<option class="clone"></option>');
  let selectClone = $('option[class="clone"]');
  selectClone.attr('value', this.keyword);
  selectClone.text(this.keyword);
  selectClone.removeClass('clone');
};


Img.readJson = () => {
  $.get('../data/page-1.json')
    .then(data => {
      data.forEach(item => {
        Img.allImgs.push(new Img(item));
        console.log(Img.allImgs);
      });
    })
    .then(Img.loadImgs);
};

Img.loadImgs = () => {
  // console.log("line41");
  Img.allImgs.forEach(obj => obj.render());

};

$(() => Img.readJson());


$(document).ready(function () {
  $('select').on('click', function () {
    $('div').hide();
    let selectedValue = $(this).val();
    $(`div[class=${selectedValue}]`).show();

  });

})
