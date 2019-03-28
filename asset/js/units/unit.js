
class RootUnit  {
  counter = 0;
  camp = '';

  // chemin
  path = {
    // position du bout du chemin en x
    x:0,
    // position du bout du chemin en y
    y:0,
    // tableau du chemin complet
    data: []
  };

  // vitesse de direction pour chaque etape du chemin (path)
  // le chemin est un tableau (path.data).
  // une etape du chemin represente un element x y du tableau
  // ces valeurs vx0 et vy0 permettent d'accomplir une partie du chemin
  vx0;
  vy0;

  constructor(x, y) {
    this.health = 100;

    // place l'unité sur la map
    this.x = x;
    this.y = y;
    this.path.x  = x;
    this.path.y  = y;
    // lance un boucle dans l'unité pour la faire vivre
    this.interval = setInterval( () => { this.loop(); },10);
    // variable globale qui recense les unités
    if( window['gameUnit'] === undefined){
      window['gameUnit'] = [];
    }
    // génération de l'id de l'unité
    this.id = 'unit'+(window.gameUnit.length+1);
    // ajoute l'unité a la variable globale qui les regroupes
    window['gameUnit'].push(this);


    // ajoute une apparence a l'unité
    // et le place sur la carte
    this.skin();

    // met en place l'evenement clic de la souris
    this.mouseClic();

  }

  // function d'evenement au clic de la souris par rapport
  // à l'unité
  mouseClic(){
    $('body').on('click', '.map', () => {
      this.pathUnit();
    });
  }

  // boucle qui fait vivre l'unité
  loop() {
    this.counter++;

    if(this.camp != ''){
      $( '#'+this.id ).addClass( this.camp );
    }

    this.moveUnit();

    this.shotOnEnemy();

    this.healthBar();


  }
  // apparence de l'unité
  skin = () => {
    var id = '#'+this.id
    $( '.units' ).append( '<div class="unit" id="'+(this.id)+'" style="left:'+(this.x-16)+'px;top:'+(this.y-16)+'px;"></div>' );
    $( id ).append('<div class="health-bar"><div>');
    $( id  ).append('<div class="unit-view"><div>');
    $( id ).append('<div class="unit-logo"><div>');
    $( id  ).append('<div class="fireContainer"><div></div></div>');

  }
  // function de choix du camp d'appartenance
  camp =   (id) => {
    this.camp = 'camp'+id;
  }

  enemy = {
    flag: [],
    add: function(flag){
      this.flag.push(flag);
    }
  }

  isSelected = () => {
    var found = window.unitSelected.indexOf(this.id)
    // si il n'est pas deja selectionné
    // alors on l'ajoute a la liste
    if (found == -1) {
      return false;
    }else{
      return true;
    }
  }




}
Object.assign(RootUnit.prototype, MoveUnit);
Object.assign(RootUnit.prototype, PathUnit);
Object.assign(RootUnit.prototype, ShotOnEnemy);
Object.assign(RootUnit.prototype, HealthBar);


var RU;
RU = new RootUnit(128,128);
RU.camp(1);
RU.enemy.add('camp2');
RU = new RootUnit(192,128);
RU.camp(1);
RU.enemy.add('camp2');
RU = new RootUnit(128,192);
RU.camp(1);
RU.enemy.add('camp2');


RU = new RootUnit(128,480);
RU.camp(2);
RU.enemy.add('camp1');
