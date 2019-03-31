let ShotOnEnemy = {
  shotOnEnemy(){

    if( this.camp === undefined || this.camp == '' || window.mapUnit === undefined) {
      return false;
    }

    if(this.camp == 'camp1'){
      
      if (    (getValPosArr('camp2', this.id, 1,0) != 0) 
              && (getValPosArr('camp2', this.id, -1,0) != 0)
              && (getValPosArr('camp2', this.id, 0,-1) != 0)
              && (getValPosArr('camp2', this.id, 0,1) != 0)
              && (getValPosArr('camp2', this.id, 1,1) != 0)
              && (getValPosArr('camp2', this.id, -1,-1) != 0)
              && (getValPosArr('camp2', this.id, -1,1) != 0)
              && (getValPosArr('camp2', this.id, 1,-1) != 0)
      ){
        return false;
      }
    }

    if(this.camp == 'camp2'){
      
      if (    (getValPosArr('camp1', this.id, 1,0) != 0) 
              && (getValPosArr('camp1', this.id, -1,0) != 0)
              && (getValPosArr('camp1', this.id, 0,-1) != 0)
              && (getValPosArr('camp1', this.id, 0,1) != 0)
              && (getValPosArr('camp1', this.id, 1,1) != 0)
              && (getValPosArr('camp1', this.id, -1,-1) != 0)
              && (getValPosArr('camp1', this.id, -1,1) != 0)
              && (getValPosArr('camp1', this.id, 1,-1) != 0)
      ){
        return false;
      }
    }

    // pour chaque drapeau ennemi
    this.enemy.flag.forEach( (element) => {
      // récupere le resultat pour optimiser le temps de traitement
      // c'est l'objet jquery contenant tout les ennemis du drapeau element
      var objJQuery = $('.'+element);
      // détermine en une seule fois la longueur du tableau ( de l'objet )
      // pour éviter de refaire le calcul à chaque tour de boucle
      var n = objJQuery.length;


      // console.log(element)
      // la boucle
      // pour chaque balise ennemi
      for (var i = 0; i < n; i++) {
        // on verifie la distance entre l'unité et chaque ennemi
        var dstX = objJQuery[i].offsetLeft - unitPosX('#'+this.id)+14;
        var dstY = objJQuery[i].offsetTop  - unitPosY('#'+this.id)+14;
        var distance =  calcHypotenuse(dstX, dstY);
        distance = parseInt(distance);



        // dans ce tour de bouble si l'ennemi actuellement traiter
        // à une distance de moins de 128 pixels alors on agit
        if(distance < 128){

          // ralentit l'animation du tire qui est lié à la diminition
          // de la vie de l'ennemi et sa destruction
          if((this.counter % 10) == 0){
            // si l'unité n'a pas d'audio alors on lui en ajoute un
            // qui démarre automatiquement
            if($('#soundFX-'+this.id).length == 0){
              $( '#'+this.id).append( '<audio id="soundFX-'+this.id+'" src="asset/sound/effect/uzi-submachine-gun.ogg" loop autoplay></audio>' );
            }else{
              // sinon c'est qu'on a déjà un audio html dans l'unité

              //l'unité se tourne vers l'ennemi
              $('#'+this.id).css('transform', 'rotate('+_360(dstX, dstY)+'deg)');
              // ça barre de vie elle évite de tourné. ce qui a pour effet
              // au moins de la laisser tout le temp horizontale
              $('#'+this.id+' .health-bar').css('transform', 'rotate(-'+_360(dstX, dstY)+'deg)');

              // recuperation de la balise audio appartenant a l'unité
              var SFX = document.getElementById('soundFX-'+this.id);

              // si le tire est caché et que l'audio du tire est synchronisé
              // alors on affiche le tir et tout le reste
              if($('#'+this.id+' .fireContainer div').css('display') == 'none' && SFX.currentTime > 0.5 && SFX.currentTime < 3.5){
                $('#'+this.id+' .fireContainer div').css('display', 'block');
                var idEnemy = parseInt(objJQuery[i].id.replace('unit', ''))-1;
                // perte de la vie de l'enneni
                window['gameUnit'][idEnemy].health += -10;
                // si l'ennemi a sa vie en dessous de 2
                // alors on le tue
                if(  window['gameUnit'][idEnemy].health < 2){
                  // suppression de l'ennemi
                  $('#'+objJQuery[i].id).remove();
                  // pour évité les bugs de tir continue suppression de tout les audio
                  $('audio').remove();

                  // pour éviter le bug du tir continu on cache tout les tirs
                  $('.fireContainer div').css('display', 'none');
                }
              }else{
                // pour faire un effet de clignotement quand l'unité tir
                // le tir doit être caché aussitôt qu'il est affiché
                $('#'+this.id+' .fireContainer div').css('display', 'none');
              }

            } // fin du else quand la balise audio est presente dans l'unité
          } // fin du compteur qui ralenti l'annimation des tire
        } // fin de la distance de vue pour agir
      } // fin de la boucle des ennemi par drapeau
    }); // fin du foreach

  }
}
