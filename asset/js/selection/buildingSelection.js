$(function(){



  
  $('.building').click(function(event){
    // supprime de la liste toutes les unités selectionnés à la souris
    window.unitSelected = [];
    $('.unit').css('border', 'solid 1px black');


    
    // si on maintient la touche control alors on peut
    // selectionner plusieurs unités
    if(window.keyPressed.indexOf('Control') != -1){
      // verifie que l'unité n'est pas deja selectionner pour ne pas le
      // selectionner 2 fois
      var found = window.buildingSelected.indexOf(this.id)
      // si il n'est pas deja selectionné
      // alors on l'ajoute a la liste
      if (found == -1) {
        window.buildingSelected.push(this.id);
      }
    }else{ // sinon une seule
      window.buildingSelected = [];
      window.buildingSelected.push(this.id);
    }

    $('.building').css('border', 'solid 1px black');
    window.buildingSelected.forEach(function(element) {
      $('#'+element).css('border', 'solid 1px #08fb08');
    });



  })
})
