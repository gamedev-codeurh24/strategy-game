$(function(){
  $('.building.infantry').click(function(){
    $('#infantry-tool').css('display', 'flex')
  })

  $('#infantry-machine-gun').click(function(){
    ;
    if(window['toolRequest'] === undefined){
      window['toolRequest'] = [];
    }

    if(window['toolRequest']['infantry-machine-gun'] === undefined){
      window['toolRequest']['infantry-machine-gun']  = 0;
    }
    
    // variable global qui determine si une creation est en cour
    if(window.taskCreateInfantryMG !== undefined){
      // si ou alors on compte le nombre de fois que la creation sera
      // enchainer
      window['toolRequest']['infantry-machine-gun']++;
      log($(this).find('.number-tasks'))
      // affiche le nombre de demande
      $(this).parent().find('.number-tasks').text(window['toolRequest']['infantry-machine-gun']);
      return false;
    }
  
    var idBuilding = window.buildingSelected[0];
    var x = $('#'+idBuilding).position().left;
    var y = $('#'+idBuilding).position().top;

    var progressBar = $(this).parent().find('.progress-bar');
    progressBar.css('height', '100%');
    
    // timestamp au moment du clic
    var start = Date.now();
    // future timestomp pour le temps ecoulé depuis le clic de la souris
    var millis;
    // temps (en milli secondes) à attendre que l'unité soit crée
    wait = 3000;


    // boucle qui actualise l'avance de la creation de l'unité
    window.taskCreateInfantryMG = setInterval( () => {
      //temps ecoulé depuis le clic de la souris
      millis = Date.now() - start;

      // si le temps a fini de s'écouler
      if( wait < millis){
        // création de l'unité
        RU = new RootUnit(x+90,y+90);
        RU.camp(2);
        RU.enemy.add('camp1');

        // si il y a une demande ou plus
        if (window['toolRequest']['infantry-machine-gun'] >= 1) {
          // relance une demande de creation
          start = Date.now();
          // décompte le nombre de relance
          window['toolRequest']['infantry-machine-gun']--;
          // affiche le nombre de demande
          $(this).parent().find('.number-tasks').text(window['toolRequest']['infantry-machine-gun']);
      
        }else{
          // nombre de demande enchainer a creer remis a zero
          var idInterval = window.taskCreateInfantryMG;
          window.taskCreateInfantryMG = undefined;
          clearInterval(idInterval);
        }

      }else{
        // pourcentage en décroissance qui represente en temps reel
        // le temps écoulé.
        // le resultat de (millis / wait) donne un chiffre inferrieur a 1
        // 1 represente 100%. Le resultat de (1 - (millis / wait) inverse le
        // pourcentage inferrieur a 1, cela devient décroissant.
        // *100 met le pourcentage de representation 1 vers 100.
        var percent = parseInt((1 - (millis / wait))*100); 
        progressBar.css('height', percent+'%');
      }
    });

    
    // alert(progressBar.width());
    // var RU;
    // var taskCreateInfantry = setInterval(() => {
    //   if(  progressBar.height() > 0 ) {
    //     progressBar.css('height', '-=1px');
    //   }else{
    //     var idBuilding = window.buildingSelected[0];
    //     var x = $('#'+idBuilding).position().left;
    //     var y = $('#'+idBuilding).position().top;

    //     RU = new RootUnit(x+90,y+90);
    //     RU.camp(2);
    //     RU.enemy.add('camp1');
    //     clearInterval(taskCreateInfantry);
    //   }
    // }, 50);
  })

  $('#infantry-rocket-launcher').click(function(){
    alert('Rocket Launcher');
  })

})
