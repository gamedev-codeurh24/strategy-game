function unit(id,x,y){
  $( '.units' ).append( '<div class="unit" id="unit'+(id)+'" style="left:'+x+'px;top:'+y+'px;"></div>' );
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

// renvoi la position reel de l'image. (son centre par rapport au left)
function unitPosX(selecteurCSS){
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

function log(msg){
  console.log(msg);
}





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