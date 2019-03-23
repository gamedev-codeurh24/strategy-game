$(function(){

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
    window.unit1X = unitPosX('.unit1');
    window.unit1Y = unitPosY('.unit1');

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
    // creer un chemin pour l'unité pour évité un obstacle

    // calcule tout les 64 px si il y a un obstacle
    for (var i = window.unit1Y; i < window.targetPathY; i+=64) {

      // ligne par ligne de la map:
      // detection tout les 64 px a partir de la position de l'unité.
      // La colonne des x est bloquer à la position de l'unité.
      // ligne de la map window.map[pixel2IdArr(i)
      // colonne de la map => pixel2IdArr(window.unit1X)
      console.log('['+pixel2IdArr(i)+'] = '+window.map[pixel2IdArr(i)][pixel2IdArr(window.unit1X)]);

      // si il y a un obstacle alors on cherche une autre case
      if (window.map[pixel2IdArr(i)][pixel2IdArr(window.unit1X)] == 1) {

      }
    }

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
