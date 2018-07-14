'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]'); // компонент, который выбирает аватарку.
  var avatarPreview = document.querySelector('.ad-form-header__preview img'); // картинка куда мы будем выставлять загруженное изображение,

  var fileHouseChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo-container');

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
  fileHouseChooser.addEventListener('change', function () {
    if (fileHouseChooser.files) {
      var img = document.createElement('img');
      img.style.width = PHOTO_WIDTH;
      img.style.height = PHOTO_HEIGHT;
      var lastFormPhoto = document.querySelector('.ad-form__photo:last-child');
      lastFormPhoto.appendChild(img);

      var photoBox = document.createElement('div');
      photoBox.classList.add('ad-form__photo');
      photoContainer.appendChild(photoBox);

      addPhoto(fileHouseChooser, img);

    }
  });
})();
