$(function(){
  window.keyPressed = [];
  document.addEventListener('keydown', (event) => {
    // verifie que la touche presser n'existe pas deja dans la
    // liste des touche presser en down
    var found = window.keyPressed.indexOf(event.key)

    // si elle n'a jamais ete retenu dans la liste
    // alors on l'ajoute
    if (found == -1) {
      window.keyPressed.push(event.key);
    }
  });

  document.addEventListener('keyup', (event) => {
    window.keyPressed = [];
  });

  // liste toutes les unités selectionnés à la souris
  window.unitSelected = [];
  $('.unit').click(function(event){
    // si on maintient la touche control alors on peut
    // selectionner plusieurs unités
    if(window.keyPressed.indexOf('Control') != -1){
      // verifie que l'unité n'est pas deja selectionner pour ne pas le
      // selectionner 2 fois
      var found = window.unitSelected.indexOf(this.id)
      // si il n'est pas deja selectionné
      // alors on l'ajoute a la liste
      if (found == -1) {
        window.unitSelected.push(this.id);
      }
    }else{ // sinon une seule
      window.unitSelected = [];
      window.unitSelected.push(this.id);
    }

    $('.unit').css('border', 'solid 0px transparent');
    window.unitSelected.forEach(function(element) {
      $('#'+element).css('border', 'solid 1px #08fb08');
      $('#'+element).css('border-radius', '100%');
    });



  })
})
