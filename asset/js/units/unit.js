
class RootUnit extends BasicElementOfWar  {
  counter = 0;
  

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
    super('unit');
    
    // place l'unité sur la map
    this.x = x;
    this.y = y;
    this.path.x  = x;
    this.path.y  = y;

    this.lastArrPos = {x,y};
    this.lastArrPos.x = pixel2IdArr(x);
    this.lastArrPos.y = pixel2IdArr(y);




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
    super.loop();
    this.counter++;

    this.updatePosition();

    this.moveUnit();

    this.shotOnEnemy();
  }
  // apparence de l'unité
  skin() {
    var id = super.skin();
    $( id ).append('<div class="unit-logo"></div>');
    $( id  ).append('<div class="fireContainer"><div></div></div>');
  }

  updatePosition(){
    // s'il appartient à un camp alors il peut être mis sur la carte prévu
    // pour ce camp
    if(this.camp != ''){

      // tant que les maps n'existent pas ont attent
      // avant de poursuivre
      if(window.mapUnit != undefined){
        // met à jour la carte des emplacements des unitées

        
        // if(this.id == 'unit4'){
        //   log('MAJ', pixel2IdArr(unitPosX('#'+this.id)))
        // }
        // si la position actuelle sur le quadriallage est a zero alors que elle devrai etre à 1 
        if( window.mapUnit[this.camp][pixel2IdArr(unitPosY('#'+this.id))][pixel2IdArr(unitPosX('#'+this.id))] ==  0) {
          
          // on passe cette case à 1
          window.mapUnit[this.camp][pixel2IdArr(unitPosY('#'+this.id))][pixel2IdArr(unitPosX('#'+this.id))] = 1;

          // l'ancienne case peut revenir à zero si en y ou en x a changé
          if(pixel2IdArr(unitPosY('#'+this.id)) != this.lastArrPos.y || pixel2IdArr(unitPosX('#'+this.id)) != this.lastArrPos.x){
            
            // ancienne position passe a zéro
              window.mapUnit[this.camp][this.lastArrPos.y][this.lastArrPos.x] = 0;
              // l'ancienne position devient la position actuelle
              this.lastArrPos.y = pixel2IdArr(unitPosY('#'+this.id));
              this.lastArrPos.x = pixel2IdArr(unitPosX('#'+this.id));            
          }

        }else{
          // console('déjà pris');  
        }
      }

    }
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
// Object.assign(RootUnit.prototype, HealthBar);


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
