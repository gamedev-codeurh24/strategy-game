function unit(id,x,y){
  var self = this;
  self.id = '#unit'+id;
  self.camp = '';

  $( '.units' ).append( '<div class="unit" id="unit'+(id)+'" style="left:'+x+'px;top:'+y+'px;"></div>' );
  $( self.id  ).append('<div class="health-bar"><div>');
  $( self.id  ).append('<div class="unit-view"><div>');
  $( self.id  ).append('<div class="unit-logo"><div>');
  $( self.id  ).append('<div class="fireContainer"><div></div></div>');

  self.camp = function(id){
    self.camp = 'camp'+id ;
    $( self.id ).append('<img src="asset/img/unit'+id+'.png" />')
    $( self.id ).addClass( self.camp );
  }

  return self;

}

function calcAngleDegrees(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
}
function _360(x, y){
    var d = calcAngleDegrees(x, y);
    if( d >= 0 ){
        return d;
    }else{
        return (360+d);
    }
}

function calcHypotenuse(a, b) {
  return(Math.sqrt((a * a) + (b * b)));
}

// distance reel a vol d'oiseau
function dist(x1,y1, x2,y2){
  // distance en x toujour positif
  var dx  = Math.abs(x1-x2);
  // distance en y toujour positif
  var dy  = Math.abs(y1-y2);
  // distance a vol d'oiseau
  return  calcHypotenuse(dx, dy) ;
}



// calcule une distance entre une unité et un clic
function distanceClic(selecteurCSS){

    // position X de l'unité
    var pointX = unitPosX(selecteurCSS);
    // position Y de l'unité
    var pointY = unitPosY(selecteurCSS);

    // distance en X (abscisse) entre la cible (le clic) et l'unité
    var dstUnitX = window.targetPathX - pointX;
    // distance en Y (ordonnée) entre la cible et l'unité
    var dstUnitY = window.targetPathY - pointY;
    // ditstance a 360 degrees qui correspond a la distance réel
    // pour un humain
    return  calcHypotenuse(dstUnitX, dstUnitY) ;
}

function mapPosX(){
  return parseInt($('.map').css('left'))
}

function mapPosY(){
  return parseInt($('.map').css('top'))
}

// renvoi la position reel de l'image. (son centre par rapport au left)
// function unitPosX(selecteurCSS){
//   return (document.querySelector(selecteurCSS).offsetLeft) +(document.querySelector(selecteurCSS).offsetWidth/2);
// }
// renvoi la position reel de l'image. (son centre par rapport au top)
// function unitPosY(selecteurCSS){
// return (document.querySelector(selecteurCSS).offsetTop) +(document.querySelector(selecteurCSS).offsetHeight/2);
// }

// renvoi la position reel de l'image. (son centre par rapport au left)
function unitPosX(selecteurCSS){
  // var elm = document.querySelector(selecteurCSS);
  // log((elm.offsetLeft - elm.parentNode.offsetLeft+1)+' == '+parseInt(   $(selecteurCSS).css('left')  ))
  // log((document.querySelector(selecteurCSS).offsetLeft) +(document.querySelector(selecteurCSS).offsetWidth/2));
  // log(parseInt(   $(selecteurCSS).css('left')  ) +(parseInt($(selecteurCSS).css('width'))/2));
  return parseInt(   $(selecteurCSS).css('left')  ) +(parseInt($(selecteurCSS).css('width'))/2);
}
// renvoi la position reel de l'image. (son centre par rapport au top)
function unitPosY(selecteurCSS){
    return parseInt(   $(selecteurCSS).css('top')  ) +(parseInt($(selecteurCSS).css('height'))/2);
}

// retourne l'indice de tableau de la map
// par rapport a un pixel en y
function pixel2IdArr(pixelY){

  // ici seul le niveau 1 nous interesse

  // (pixelY / 64) cette valeur sans la virgule represente
  // une valeur en pixel en desous de celui fournis par rapport a un multiple de 64
  // exemple 100 c'est environ 1.5 * 64. Ont retient le 1 qui represente 64 c'est aussi
  // le numero de l'indice du tableau de la map qui est entre 64 et 128
  // dans notre exemple 1 est retourné
  return Math.floor(pixelY / 64);
}



var log = console.log.bind(window.console);

function pathWork(idx,idy, mp, SX,SY,EX,EY, sizeX){
  if(mp[EY+idy][EX+idx] != -1){
    $('.map-item:eq('+((sizeX*(EY+idy))+(EX+idx))+')').css('background', 'red');
    $('.map-item:eq('+((sizeX*(EY+idy))+(EX+idx))+') .infoPath').text(dist(SX,SY, EX+idx,EY+idy).toFixed(2));

    window.mp[EY+idy][EX+idx] = dist(SX,SY, EX+idx,EY+idy).toFixed(2);
    return dist(SX,SY, EX+idx,EY+idy).toFixed(2);
  }{
    $('.map-item:eq('+((sizeX*(EY+idy))+(EX+idx))+') .infoPath').text(dist(SX,SY, EX+idx,EY+idy).toFixed(2));
  }
  return 99999999;
}
