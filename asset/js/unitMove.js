window.mapCollision = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0,-1,-1,-1,-1,-1,-1,-1, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

$(function(){


  function Unit(selecteurCSS){
    var self = this;

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
    }

    // si l'unité est selectionné est que tu clic a un endroi sur la map
    // alors la la fini du chemin de l'unité qui etait a l'endroit meme de
    // cette meme unité change a la position de la souris au moment du clic
    document.querySelector('.map').addEventListener("click", function(){
      if(self.isSelected()){
        self.endPath.x =  event.pageX;
        self.endPath.y =  event.pageY;

        var easystar = new EasyStar.js();
        easystar.setGrid(window.mapCollision);
        easystar.setAcceptableTiles([0]);
        var x1 = pixel2IdArr(unitPosX(selecteurCSS));
        var y1 = pixel2IdArr(unitPosY(selecteurCSS));
        var x2 = pixel2IdArr(self.endPath.x);
        var y2 = pixel2IdArr(self.endPath.y);
        easystar.findPath(x1, y1, x2, y2, function(path){
          log(path);
          self.path = path;
        });
        easystar.calculate();


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


      if(self.move){




        if(self.path == []){
          log('Aucun chemin');
          return false;
        }

        if(self.path[1].x === undefined || self.path[1].y === undefined){
          self.move = false;
          return false;
        }

        self.endPath.x = ((self.path[1].x)*64)+32
        self.endPath.y = ((self.path[1].y)*64)+32
        log('['+self.path[0].x+']x:'+self.endPath.x+'  y:'+self.endPath.y );




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
            log('path max '+self.path.length);
            self.path.splice(0, 1);
            log(self.path);
            try {
              self.endPath.x = ((self.path[1].x)*64)+32
              self.endPath.y = ((self.path[1].y)*64)+32
            }
            catch(error) {
              //console.error(error);
              log('stop move ');
              self.move = false;
            }
          }else{
            log('stop move ');
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
            log('path max '+self.path.length);
            self.path.splice(0, 1);
            log(self.path);


            try {
              self.endPath.x = ((self.path[1].x)*64)+32
              self.endPath.y = ((self.path[1].y)*64)+32
            }
            catch(error) {
              //console.error(error);
              log('stop move ');
              self.move = false;
            }
          }else{
            log('stop move ');
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

  var run = new Unit('#unit1');
  run = new Unit('#unit2');
  run = new Unit('#unit3');

  // run.start();







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
