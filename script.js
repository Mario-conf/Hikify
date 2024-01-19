 function changeLanguage(language) {
    switch (language) {
      case 'es':
        window.location.href = 'app.html';
        break;
      case 'en':
        window.location.href = 'en.html';
        break;
      case 'fr':
        window.location.href = 'fr.html';
        break;
      case 'de':
        window.location.href = 'de.html';
        break;
      default:
        // Handle default case or do nothing
        break;
    }
  }
     // Obtener el idioma del navegador o desde localStorage
  var userLanguage = localStorage.getItem('preferredLanguage') || navigator.language || navigator.userLanguage;
  var lang = userLanguage.split('-')[0];

  // Cargar el archivo de traducciones correspondiente
  $.getJSON('translations-' + lang + '.json', function (translations) {
    translateContent(translations);
  });

  function translateContent(translations) {
    // Traducir elementos con el atributo data-translate
    $('[data-translate]').each(function () {
      var key = $(this).data('translate');
      if (translations[key]) {
        $(this).text(translations[key]);
      }
    });
  }

    function search() {
        var searchTerm = document.getElementById('searchInput').value.toLowerCase();
        var searchableElements = document.getElementsByClassName('searchable');
        var searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = ''; // Limpiar resultados anteriores

        for (var i = 0; i < searchableElements.length; i++) {
            var content = searchableElements[i].textContent.toLowerCase();
            var highlightedContent = content.replace(new RegExp(searchTerm, 'gi'), function (match) {
                return '<span class="highlight">' + match + '</span>';
            });

            if (content.includes(searchTerm)) {
                searchableElements[i].style.display = 'block';

                // Mostrar resultados en el contenedor
                var resultItem = document.createElement('div');
                resultItem.innerHTML = highlightedContent;
                searchResultsContainer.appendChild(resultItem);
            } else {
                searchableElements[i].style.display = 'none';
            }
        }
    }
