class BasicElementOfWar {
    health = 100;
    camp = '';
    id;
    firstName ='';

    constructor(){
      
      this.globalAccess('game'+this.capitalizeFirstLetter(this.firstName), this.firstName);
      
      // lance une boucle dans le batiment pour la faire vivre
      this.interval = setInterval( () => { this.loop(); },10);

    }

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    loop(){
      if(this.camp != ''){
        $( '#'+this.id ).addClass( this.camp );
      }
    }

    // function de choix du camp d'appartenance
    camp =   (id) => {
      this.camp = 'camp'+id;
    }

    globalAccess(GlobalVar, firstName){
      // lance une boucle dans le batiment pour la faire vivre
      // this.interval = setInterval( () => { this.loop(); },10);
      // variable globale qui recense les batiments
      if( window[GlobalVar] === undefined){
        window[GlobalVar] = [];
      }
      // génération de l'id du batiment
      this.id = firstName+(window[GlobalVar].length+1);
      // ajoute l'unité à la variable globale qui les regroupes
      window[GlobalVar].push(this);
    }


    skin () {
      console.log('skin army');
      var id = '#'+this.id

      $( '.'+this.firstName+'s' ).append( '<div class="'+this.firstName+'" id="'+(this.id)+'" style="left:'+(this.x-(0))+'px;top:'+(this.y-(0))+'px;"></div>' );
  
      $(id).css('background', '#000');
  
      var sizeW = parseInt($(id).css('width'));
      var sizeH = parseInt($(id).css('height'));
  
      $(id).css('left', '-='+(sizeW/2)+'px');
      $(id).css('top', '-='+(sizeH/2)+'px');
  
  
      $( id ).append('<div class="health-bar"><div>');
      $(id+' .health-bar').css('width', sizeW+'px');

      $( id  ).append('<div class="unit-view"><div>');
      var viewSizeW =  parseInt($(id+' .unit-view').width());
      var viewSizeH =  parseInt($(id+' .unit-view').width());
  
      $(id+' .unit-view').css({
        left: '-'+((viewSizeW/2)-sizeW/2)+'px',
        top: '-'+((viewSizeH/2)-sizeH/2)+'px'
      })

      return id;  
    }




}