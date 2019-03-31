// class MoveUnit{
let MoveUnit = {

 moveUnit(){
  // calcule les distances
  // distante horizontale en x
  var dstX = this.path.x - unitPosX('#'+this.id);
  // distance verticale en y
  var dstY = this.path.y - unitPosY('#'+this.id);
  // ditance à vol d'oiseau
  var distance =  calcHypotenuse(dstX, dstY) ;


  if(distance > 0) {
    

    if(this.path.data.length){

      getUnitGame(this.id).updatePosition();
      // log(window.mapUnit);
      // cette condition permet de preciser a la derniere position
      // du chemin l'exactitude en x et y du clic de souris sur la
      // carte
      if(this.path.data.length == 1 ){
        // distante horizontale en x
        var dstX0 = ((this.path.data[0].x*64)+(this.path.x%64)) - unitPosX('#'+this.id);
        // distance verticale en y
        var dstY0 = ((this.path.data[0].y*64)+(this.path.y%64)) - unitPosY('#'+this.id);
      }else{
        // distante horizontale en x
        var dstX0 = ((this.path.data[0].x*64)+32) - unitPosX('#'+this.id);
        // distance verticale en y
        var dstY0 = ((this.path.data[0].y*64)+32) - unitPosY('#'+this.id);
      }
      
      //l'unité se tourne vers l'endroit où il va
      var degres = _360(dstX0, dstY0);
      if( degres > 90 && degres < 270){
        
        $('#'+this.id).css('transform', 'rotate('+degres+'deg) scaleY(-1)');
      }else{
        $('#'+this.id).css('transform', 'rotate('+degres+'deg) scaleY(1)');
      }

      // ditance à vol d'oiseau
      var distance0 =  calcHypotenuse(dstX0, dstY0) ;

      // calcule la vitesse de direction
      this.vx0 = dstX0 / distance0;
      this.vy0 = dstY0 / distance0;


      if(distance0 <= 0){
        this.path.data.splice(0, 1)
        // getUnitGame(this.id).updatePosition();
        // log(window.mapUnit);
      }else{
        if (this.vx0 >= 0) {
          $( '#'+this.id ).css( 'left', '+='+(Math.abs(this.vx0))+'px' );
        }else{
          $( '#'+this.id ).css( 'left', '-='+(Math.abs(this.vx0))+'px' );
        }
        if (this.vy0 >= 0) {
          $( '#'+this.id ).css( 'top', '+='+(Math.abs(this.vy0))+'px' );
        }else{
          $( '#'+this.id ).css( 'top', '-='+(Math.abs(this.vy0))+'px' );
        }
      }
    }// condition qui permet de continuer tant que le chemin existe
  } // condidition tant qu'il y a une distance

}
};
