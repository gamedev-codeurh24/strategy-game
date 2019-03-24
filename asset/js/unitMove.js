window.mapCollision = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

$(function(){


  function Unit(selecteurCSS){
    var self = this;

    self.health = 100;

    // nom de l'id de l'unité
    self.id = document.querySelector(selecteurCSS).id;

    self.path = [];

    // empeche le deplacement de l'unité pour rien en boucle
    self.move = false;

    // position de départ pour aller a un endroi
    self.startPath = {
      x: unitPosX(selecteurCSS),
      y: unitPosY(selecteurCSS)
    }

    // position d'arrivé pour aller a un endroi
    self.endPath = {
      x: unitPosX(selecteurCSS),
      y: unitPosY(selecteurCSS)
    };

    self.fire = function(id,id2, dstX, dstY){
      $(id).css('border', '1px solid red');
      var idName = $(id).attr('id')
      var SFX = document.getElementById('soundFX-'+idName);
      if(id == '#unit1'){
        log('fire unit1');
      }
      if($(id+' .fireContainer div').css('display') == 'none' && SFX.currentTime > 0.5 && SFX.currentTime < 3.5){
        $(id+' .fireContainer div').css('display', 'block');
      }else{
        $(id+' .fireContainer div').css('display', 'none');
      }
      $(id2).css('border', '1px solid red');
      $(id).css('transform', 'rotate('+_360(dstX, dstY)+'deg)');
      $(id+' .health-bar').css('transform', 'rotate(-'+_360(dstX, dstY)+'deg)');
    }

    // ajoute des drapeaux ennemis
    self.enemy = {
      flag: [],
      add: function(flag){
        this.flag.push(flag);
      }
    }

    // compteur qui ralenti l'annimation des tires
    self.compteur = 0;

    // fonction qui gere les ennemis dans un perimetre de l'unité
    self.hasSeen = function() {

      /*
         A re-vérifier les commentaire ci dessous.
         si apres un ennemi tué, il reste le bogue
         du tire en boucle avec l'audio
      */
      // pour ne pas rester bloquer de tirer quand on n'as fini
      // de tuer l'ennemi
      // if(self.enemy.flag.length == 0){
      //   console.log(self.id)
      //   $('#'+self.id+' .fireContainer div').css('display', 'none');
      //   if($('#soundFX-'+self.id).length != 0){
      //     var SFX = document.getElementById('soundFX-'+self.id);
      //     SFX.pause();
      //     SFX.currentTime = 0;
      //   }
      // }

      // pour chaque drapeau ennemi
      self.enemy.flag.forEach(function(element) {
        // récupere le resultat pour optimiser le temps de traitement
        // c'est l'objet jquery contenant tout les ennemi du drapeau element
        var objJQuery = $('.'+element);
        // détermine en une seul fois la longueur du tableau ( de l'objet )
        // pour éviter de refaire le calcule a chaque tour de boucle
        var n = objJQuery.length;


        // la boucle
        // pour chaque balise ennemi
        for (var i = 0; i < n; i++) {
          // on verifie la distance entre l'unité chaque ennemi
          var dstX = objJQuery[i].offsetLeft - unitPosX('#'+self.id)+14;
          var dstY = objJQuery[i].offsetTop  - unitPosY('#'+self.id)+14;
          var distance =  calcHypotenuse(dstX, dstY);
          distance = parseInt(distance);

          self.compteur++;

          // dans ce tour de bouble si l'ennemi actuellement traiter
          // a une distance de moins de 128 pixel alors on agit
          if(distance < 128){

            // ralenti l'annimation du tire qui est lier a la diminition
            // de la vie de l'ennemie et sa destruction
            if((self.compteur % 10) == 0){
              // si l'unité n'a pas d'audio alors on lui en ajoute un
              // qui démarre automatiquement
              if($('#soundFX-'+self.id).length == 0){
                $( '#'+self.id).append( '<audio id="soundFX-'+self.id+'" src="asset/sound/effect/uzi-submachine-gun.ogg" loop autoplay></audio>' );
              }else{
                // sinon c'est qu'on a deja un audio html dans l'unité

                //l'unité se tourne vers l'ennemi
                $('#'+self.id).css('transform', 'rotate('+_360(dstX, dstY)+'deg)');
                // ça barre de vie elle évite de tourné. ce qui a pour effet
                // au moins de la laisser tout le temp horizontale
                $('#'+self.id+' .health-bar').css('transform', 'rotate(-'+_360(dstX, dstY)+'deg)');

                // recuperation de la balise audio appartenant a l'unité
                var SFX = document.getElementById('soundFX-'+self.id);

                // si le tire est caché et que l'audio du tire est synchronisé
                // alors ont affiche le tire et tout le reste
                if($('#'+self.id+' .fireContainer div').css('display') == 'none' && SFX.currentTime > 0.5 && SFX.currentTime < 3.5){
                  $('#'+self.id+' .fireContainer div').css('display', 'block');
                  var idEnemy = parseInt(objJQuery[i].id.replace('unit', ''))-1;
                  // perte de la vie de l'enneni
                  window.units[idEnemy].health += -10;
                  // si l'ennemi a sa vie en en dessous de 2
                  // alors on le tue
                  if(  window.units[idEnemy].health < 2){
                    // suppression de l'ennemi
                    $('#'+objJQuery[i].id).remove();
                    // pour évité les bug de tire continue suppression de tout les audio
                    $('audio').remove();

                    // pour éviter le bug di tire continue ont cache tout les tires
                    $('.fireContainer div').css('display', 'none');
                  }
                }else{
                  // pour faire un effet de clignotement quand l'unité tire
                  // le tire doit etre caché aussitot qu'il est affiché
                  $('#'+self.id+' .fireContainer div').css('display', 'none');
                }

              } // fin du else quand la balise audio est presente dans l'unité
            } // fin du compteur qui ralenti l'annimation des tire
          } // fin de la distance de vue pour agir
        } // fin de la boucle des ennemi par drapeau
      }); // fin du foreach

    }



    // si l'unité est selectionné est que tu clic a un endroi sur la map
    // alors la la fini du chemin de l'unité qui etait a l'endroit meme de
    // cette meme unité change a la position de la souris au moment du clic
    // document.querySelector('.map').addEventListener("click", function(){
    $('body').on('click', '.map', function(){


      if(self.isSelected()){
        self.endPath.x =  event.pageX-mapPosX();
        self.endPath.y =  event.pageY-mapPosY();

        var x1 = pixel2IdArr(unitPosX(selecteurCSS));
        var y1 = pixel2IdArr(unitPosY(selecteurCSS));
        var x2 = pixel2IdArr(self.endPath.x);
        var y2 = pixel2IdArr(self.endPath.y);

        var grid = new PF.Grid(window.mapCollision);
        var finder = new PF.JumpPointFinder();
        // var finder = new PF.AStarFinder();
        var path = finder.findPath(x1, y1, x2, y2, grid);
        path.forEach(function(element) {
          self.path.push({x:element[0], y:element[1]})
        });
        // log(self.path);

        self.move = true;


      }
    });


    // function du est exécuté a l'appel de la function parente
    self.contructor = function(){
      self.interval = setInterval(function() { self.loop(); },10);
    };
    self.contructor();

    // BOUCLE de l'unité pour l'annimé
    self.loop = function(){

      self.hasSeen();

      var sizeW = $('#'+self.id).width();
      if(self.health >= 80 ){
        $('#'+self.id+' .health-bar').css('background', '#0F07');
        $('#'+self.id+' .health-bar').css('width', parseInt((sizeW*1))+'px');

      }else if(self.health >= 60 && self.health < 80){
        $('#'+self.id+' .health-bar').css('background', '#b4ff00b5');
        $('#'+self.id+' .health-bar').css('width', parseInt((sizeW*0.8))+'px');

      }else if(self.health >= 40  && self.health < 60){
        $('#'+self.id+' .health-bar').css('background', '#ffe000b5');
        $('#'+self.id+' .health-bar').css('width', parseInt((sizeW*0.6))+'px');

      }else if(self.health >= 20  && self.health < 40){
        $('#'+self.id+' .health-bar').css('background', '#ff7600b5');
        $('#'+self.id+' .health-bar').css('width', parseInt((sizeW*0.4))+'px');

      }else{
        $('#'+self.id+' .health-bar').css('background', '#ff1800b5');
        $('#'+self.id+' .health-bar').css('width', parseInt((sizeW*0.2))+'px');
      }



      if(self.move){




        if(self.path == []){
          log('Aucun chemin');
          return false;
        }

        try {
          if(typeof self.path[1].x == 'undefined' || typeof self.path[1].y == 'undefined'){
            self.move = false;
            return false;
          }
        }
        catch(error) {
          //console.error(error);
          //log('stop move ');
          return false;
        }


        self.endPath.x = ((self.path[1].x)*64)+32
        self.endPath.y = ((self.path[1].y)*64)+32
        // log('['+self.path[0].x+']['+self.path[0].y+']x:'+self.endPath.x+'  y:'+self.endPath.y );




        // distance en px entre l'unité et le pointeur de la souris
        var dstUnit1X = self.endPath.x - unitPosX(selecteurCSS);
        var dstUnit1Y = self.endPath.y - unitPosY(selecteurCSS);
        var distance =  calcHypotenuse(dstUnit1X, dstUnit1Y) ;

        // (le pas) vitesse de déplacement de l'unité.
        // (inferieur a 1 pixel) car le coté adjacente
        // ou le coté oposé a l'hypoténuse est toujours plus petite que
        // l'hypoténuse (la distance humaine)
        self.vx = dstUnit1X / distance;
        self.vy = dstUnit1Y / distance;

        // si la cible (au clic) par rapport a l'unité a une distance plus grande que 10px alors
        // on déplace l'unité
        if (Math.abs(distance) > 10) {
          // si le pas d'avancement est positif alors on incrémente
          // le déplacement de l'unité
          if (self.vx >= 0) {
            $( selecteurCSS ).css( 'left', '+='+(Math.abs(self.vx))+'px' );
          }else{

            // valeur absolue pour éviter ce genre de chose:
            // '-='+(-10)+'px' qui fait planter la décrémentation
            $( selecteurCSS ).css( 'left', '-='+(Math.abs(self.vx))+'px' );
          }
        }else{
          if(self.path.length > 1){
            //log('path max '+self.path.length);
            self.path.splice(0, 1);
            //log(self.path);
            try {
              self.endPath.x = ((self.path[1].x)*64)+32
              self.endPath.y = ((self.path[1].y)*64)+32
            }
            catch(error) {
              //console.error(error);
              //log('stop move ');
              self.move = false;
            }
          }else{
            //log('stop move ');
            self.move = false;
          }

        }

        if (Math.abs(distance) > 10) {
          if (self.vy >= 0) {
            $( selecteurCSS ).css( 'top', '+='+(Math.abs(self.vy))+'px' );
          }else{
            $( selecteurCSS ).css( 'top', '-='+(Math.abs(self.vy))+'px' );
          }
        }else{
          if(self.path.length > 1){
            //log('path max '+self.path.length);
            self.path.splice(0, 1);
            //log(self.path);


            try {
              self.endPath.x = ((self.path[1].x)*64)+32
              self.endPath.y = ((self.path[1].y)*64)+32
            }
            catch(error) {
              //console.error(error);
              //log('stop move ');
              self.move = false;
            }
          }else{
            //log('stop move ');
            self.move = false;
          }
        }

      }

    };

    self.clearLoop = function(){
      clearInterval(self.interval);
    };

    self.isSelected = function(){
      var found = window.unitSelected.indexOf(self.id)
      // si il n'est pas deja selectionné
      // alors on l'ajoute a la liste
      if (found == -1) {
        return false;
      }else{
        return true;
      }
    };
  }
  window.units = [];
  window.units[0] = new Unit('#unit1');
  window.units[0].enemy.add('camp2');

  window.units[1] = new Unit('#unit2');
  window.units[1].enemy.add('camp2');

  window.units[2] = new Unit('#unit3');
  window.units[2].enemy.add('camp2');

  window.units[3] = new Unit('#unit4');
  window.units[3].enemy.add('camp1');

  window.units[4] = new Unit('#unit5');
  window.units[4].enemy.add('camp1');








  // au debut l'unité est à la même position que la cible
  // car l'unité doit rester à sa position
  window.targetPathX=window.unit1X;
  window.targetPathY=window.unit1Y;


  // change de place la cible pour que l'unité la suive
  $('.map').click(function(){

    /*
    ######################################
    # CHANGE DE PLACE LA CIBLE DU CHEMIN #
    ######################################
    */
    // change / bloque a chaque clic de la souris
    // la position de la cible par rapport au pointeur de la souris
    window.targetPathX = window.mouseX;
    window.targetPathY = window.mouseY;

    // position de l'unité
    window.unit1X = unitPosX('#unit1');
    window.unit1Y = unitPosY('#unit1');

    // distance en px entre l'unité et le pointeur de la souris
    var dstUnit1X = window.targetPathX - window.unit1X;
    var dstUnit1Y = window.targetPathY - window.unit1Y;
    var distance =  calcHypotenuse(dstUnit1X, dstUnit1Y) ;

    // (le pas) vitesse de déplacement de l'unité.
    // (inferieur a 1 pixel) car le coté adjacente
    // ou le coté oposé a l'hypoténuse est toujours plus petite que
    // l'hypoténuse (la distance humaine)
    window.vx = dstUnit1X / distance;
    window.vy = dstUnit1Y / distance;

    /*
    ##################################
    # TROUVE LE CHEMIN LE PLUS COURT #
    ##################################
    */



    // var easystar = new EasyStar.js();
    // easystar.setGrid(window.mapCollision);
    // easystar.setAcceptableTiles([0]);
    // var x1 = pixel2IdArr(window.unit1X);
    // var y1 = pixel2IdArr(window.unit1Y);
    // var x2 = pixel2IdArr(window.targetPathX);
    // var y2 = pixel2IdArr(window.targetPathY);
    // easystar.findPath(x1, y1, x2, y2, function(path){
    //   // $('.info').text(vx+' ______ '+vy );
    //   console.log(path);
    // });
    // easystar.calculate();

  })

  // tant que la distance n'est pas réduite
  // alors on deplace l'unité
  var taskUnitMove = setInterval(function(){

    var distance = distanceClic('.unit1');

    // petite sécurité pour éviter de lancer cette partie si on a pas toutes
    // les variables. notament le pas de déplacement (vx inclus vy)
    if (window.vx !== undefined) {
      // si la cible (au clic) par rapport a l'unité a une distance plus grande que 10px alors
      // on déplace l'unité
      if (Math.abs(distance) > 10) {
        // si le pas d'avancement est positif alors on incrémente
        // le déplacement de l'unité
        if (window.vx >= 0) {
          $( '.unit1' ).css( 'left', '+='+(Math.abs(window.vx))+'px' );
        }else{

          // valeur absolue pour éviter ce genre de chose:
          // '-='+(-10)+'px' qui fait planter la décrémentation
          $( '.unit1' ).css( 'left', '-='+(Math.abs(window.vx))+'px' );
        }
      }

      if (Math.abs(distance) > 10) {
        if (window.vy >= 0) {
          $( '.unit1' ).css( 'top', '+='+(Math.abs(window.vy))+'px' );
        }else{
          $( '.unit1' ).css( 'top', '-='+(Math.abs(window.vy))+'px' );
        }
      }
    }

  },10);
})
