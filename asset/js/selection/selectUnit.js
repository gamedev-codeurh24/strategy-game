$(function(){


  // liste toutes les unités selectionnés à la souris
  window.unitSelected = [];
  $('body').on('click','.unit', function(event){
    window.buildingSelected = [];
    $('.building').css('border', 'solid 0px black');

    // this.id = $(this).parent().attr('id');

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

    $('.unit').css('border', 'solid 1px black');
    window.unitSelected.forEach(function(element) {
      $('#'+element).css('border', 'solid 1px #08fb08');
      $('#'+element).css('border-radius', '100%');
    });



  })


})
