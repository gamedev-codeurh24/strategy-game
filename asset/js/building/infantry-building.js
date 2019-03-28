class Building {
  camp = '';

  constructor(x, y) {
    this.health = 100;

    // place l'unité sur la map
    this.x = x;
    this.y = y;

    // lance un boucle dans le batiment pour la faire vivre
    this.interval = setInterval( () => { this.loop(); },10);
    // variable globale qui recense les batiment
    if( window['gameBuilding'] === undefined){
      window['gameBuilding'] = [];
    }
    // génération de l'id du batiment
    this.id = 'building'+(window.gameBuilding.length+1);
    // ajoute l'unité à la variable globale qui les regroupes
    window['gameBuilding'].push(this);


    // ajoute une apparence a l'unité
    // et le place sur la carte
    this.skin();




  }
  // function de choix du camp d'appartenance
  camp =   (id) => {
    log(id)
    this.camp = 'camp'+id;
  }

  loop(){
    if(this.camp != ''){
      $( '#'+this.id ).addClass( this.camp );
    }
  }

  // apparence de l'unité
  skin = () => {

    var id = '#'+this.id

    $( '.buildings' ).append( '<div class="building" id="'+(this.id)+'" style="left:'+(this.x-(0))+'px;top:'+(this.y-(0))+'px;"></div>' );


    var sizeW = parseInt($(id).css('width'));
    var sizeH = parseInt($(id).css('height'));

    $(id).css('left', '-='+(sizeW/2)+'px');
    $(id).css('top', '-='+(sizeH/2)+'px');


    $( id ).append('<div class="health-bar"><div>');
    $( id  ).append('<div class="unit-view"><div>');
    $( id  ).append('<div class="flag-color"><div>');
    $( id ).append('<div class="img"><div>');

    $(id+' .img').css('background-image', 'url(/asset/img/batiment/infantry-building.png)');

    $(id+' .health-bar').css('width', sizeW+'px');

    var viewSizeW =  parseInt($(id+' .unit-view').width());
    var viewSizeH =  parseInt($(id+' .unit-view').width());

    $(id+' .unit-view').css({
      left: '-'+((viewSizeW/2)-sizeW/2)+'px',
      top: '-'+((viewSizeH/2)-sizeH/2)+'px'
    })

  }
}


var B;
B = new Building(640,256);
B.camp(2);
