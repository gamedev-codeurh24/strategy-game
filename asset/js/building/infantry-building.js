
class Building  extends BasicElementOfWar {
  

  constructor(x, y) {
    super();    
    super.firstName = 'building';

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

    $(id+' .img').css({
      'backgroundImage': 'url(/asset/img/batiment/infantry-building.png)'
    });

  }
}


var B;
B = new Building(640,256);
B.camp(2);
