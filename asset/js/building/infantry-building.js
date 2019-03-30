
class Building extends BasicElementOfWar {
  

  constructor(x, y) {
    super('building');    
    this.firstName = 'building';
    

    // place l'unité sur la map
    this.x = x;
    this.y = y;

    // ajoute une apparence a l'unité
    // et le place sur la carte
    this.skin();
  }



  loop(){
    super.loop();
  }

  // apparence de l'unité
  skin = () => {
    var id = super.skin();
    
    $( id  ).append('<div class="flag-color"><div>');
    $( id ).append('<div class="img"><div>');


    // return id
  }
}

class InfantryBuilding extends Building {

  constructor(x, y){
    super(x, y);
    this.skin();
  }

  skin = () => {
    
    log(document.getElementById(this.id).offsetWidth);
    $('#'+this.id).addClass('infantry');
  }
}

var B;
B = new InfantryBuilding(640,256);
B.camp(2);
