'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]'); // компонент, который выбирает аватарку.
  var avatarPreview = document.querySelector('.ad-form-header__preview img'); // картинка куда мы будем выставлять загруженное изображение,

  var fileHouseChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoPreview  = document.querySelector('.ad-form__photo');

  var PHOTO_WIDTH = '70px';
  var PHOTO_HEIGHT = '70px';


  function addPhoto(inputFile, preview) {
    var file = inputFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) { // проверяем тип файла итератором some который возвращает тру или фолс выполнения условия для массива
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader(); // создаем объект файлридер с помощью  конструктора- он читает содержимое файла с помощью метода readAsDataURL

      reader.addEventListener('load', function () {
        preview.src = reader.result; // подставляем исх код картинци в срц
      });

      reader.readAsDataURL(file); // отправляем в метод дадаурл объект который описывает файл и подставить прочитанный исх код в src -см выше потом что src умеет читать дата урл
    }
  }

  avatarChooser.addEventListener('change', function () { // вставляем аватарку
    addPhoto(avatarChooser, avatarPreview);
  });

  // вставляем картинку
  // fileHouseChooser.addEventListener('change', function () {
  //   if (fileHouseChooser.files) {
  //     var img = document.createElement('img');
  //     img.style.width = PHOTO_WIDTH;
  //     img.style.height = PHOTO_HEIGHT;
  //     var lastFormPhoto = document.querySelector('.ad-form__photo:last-child');
  //    // var lastFormPhoto = document.querySelector('.ad-form__photo'); удали
  //     lastFormPhoto.appendChild(img);

  //     var photoBox = document.createElement('div');
  //     photoBox.classList.add('ad-form__photo');
  //     photoBox.draggable = true; // новое
  //     photoContainer.appendChild(photoBox);
  //   }

  //   addPhoto(fileHouseChooser, img);
  // });



  function createPhotoPreview() {
    var img = document.createElement('img');
      img.style.width = PHOTO_WIDTH;
      img.style.height = PHOTO_HEIGHT;
      var lastFormPhoto = document.querySelector('.ad-form__photo:last-child');
      lastFormPhoto.appendChild(img);
      var photoBox = document.createElement('div');
      photoBox.classList.add('ad-form__photo');
      photoBox.draggable = true; // новое
      photoContainer.appendChild(photoBox);
      addPhoto(fileHouseChooser, img); // не могу сделать драг тк эта функция тут- надо разделить
  }




  //     var img = document.createElement('img');
  //     // var container = photoPreview.cloneNode(true);
  //     //container.classList.remove('visually-hidden');
  //    // photoContainer.appendChild(container);
  //     img.classList.add('ad-form__photo-image');
  //      img.alt = 'Фотография жилья';
  //      img.width = PHOTO_WIDTH;
  //      img.height = PHOTO_HEIGHT;
  //     var photoPreview = document.querySelector('ad-form__photo:last-child');
  //     photoPreview.appendChild(img);
  //     // var photoBox = document.createElement('div');
  //     // photoBox.classList.add('ad-form__photo');
  //     // photoBox.draggable = true; // новое
  //     // photoContainer.appendChild(photoBox);
  //      addPhoto(fileHouseChooser, img);
  //      //container.appendChild(img);
  //    };

  //    // вставляем картинку
   fileHouseChooser.addEventListener('change', createPhotoPreview); // переделать

   // функция удаления картинки
   function removeImg() {
    var avatarImg = document.querySelector('.ad-form-header__preview img');
    avatarImg.src = 'img/muffin-grey.svg';
    var housesPhoto = document.querySelectorAll('.ad-form__photo:not(:last-child)');
    //var housesPhoto = document.querySelectorAll('.ad-form__photo');
    if (housesPhoto.length) {
      housesPhoto.forEach(function (item) {
        item.remove();
      });
    }
  }



 // перетаскивание картинки
 var dropbox;
 // var dragged;
 var dropbox = document.querySelector('.ad-form__drop-zone'); //ссылка на область, куда предстоит тащить файл.
 ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropbox.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults (evt) {
  evt.preventDefault()
  evt.stopPropagation()
}

dropbox.addEventListener('drop', function (event) {
  addPhoto(event.dataTransfer, createPhotoPreview);
});

 //что делать, когда файлы будут перетащены:
//   dropbox.addEventListener('drop', function (event) {
//     //event.preventDefault();
//     if ( event.target.className == "ad-form__drop-zone" ) {
//       addPhoto(event.dataTransfer, createPhotoPreview);
//       dragged.parentNode.removeChild(dragged);
//       event.target.appendChild(dragged);
//   }

// }, false);


  window.pictures = {
    removeImg: removeImg,

  };
})();
