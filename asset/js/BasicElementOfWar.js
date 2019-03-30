class BasicElementOfWar {
    health = 100;
    healthTemp = 100;
    camp = '';
    id;
    firstName ='';
    sizeW;
    sizeH;
    viewSizeW;
    viewSizeH;

    constructor(firstName){
      this.firstName = firstName;
      this.globalAccess('game'+this.capitalizeFirstLetter(firstName), firstName);
      
      // lance une boucle dans le batiment pour la faire vivre
      this.interval = setInterval( () => { this.loop(); },10);

    }

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    loop(){
      if(this.camp != '' && $( '#'+this.id  ).hasClass( this.camp ) === false){
        $( '#'+this.id ).addClass( this.camp );
      }

      if(this.healthTemp != this.health){
        var sizeW = $('#'+this.id).width();
        if(this.health >= 80 ){
          $('#'+this.id+' .health-bar').css('background', '#0F07');
          $('#'+this.id+' .health-bar').css('width', parseInt((sizeW*1))+'px');
  
        }else if(this.health >= 60 && this.health < 80){
          $('#'+this.id+' .health-bar').css('background', '#b4ff00b5');
          $('#'+this.id+' .health-bar').css('width', parseInt((sizeW*0.8))+'px');
  
        }else if(this.health >= 40  && this.health < 60){
          $('#'+this.id+' .health-bar').css('background', '#ffe000b5');
          $('#'+this.id+' .health-bar').css('width', parseInt((sizeW*0.6))+'px');
  
        }else if(this.health >= 20  && this.health < 40){
          $('#'+this.id+' .health-bar').css('background', '#ff7600b5');
          $('#'+this.id+' .health-bar').css('width', parseInt((sizeW*0.4))+'px');
  
        }else{
          $('#'+this.id+' .health-bar').css('background', '#ff1800b5');
          $('#'+this.id+' .health-bar').css('width', parseInt((sizeW*0.2))+'px');
        }
        this.healthTemp = this.health;
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
      
      var id = '#'+this.id
      
      

      $( '.'+this.firstName+'s' ).append( '<div class="'+this.firstName+'" id="'+(this.id)+'" style="left:'+(this.x-(0))+'px;top:'+(this.y-(0))+'px;"></div>' );
      
      // met tout element sur la carte visible en fond noir
      $(id).css('background', '#000');
      // ce fond noir disparait lorsqu'un autre element enfant a l'id 
      // est ajouté
      this.taskDeleteBackground = setInterval(() => {
        if($(id).attr('class').trim().split(' ').length > 1 && $(id).children().length > 2){
          $(id).css('background', '');
          clearInterval(this.taskDeleteBackground);
        }
      }, 50);
      // si au bout de 3s l'element ne contient rien d'autre 
      // alors on ne continu pas d'attendre
      setTimeout(() => { clearInterval(this.taskDeleteBackground); }, 3000);
      
  
      this.sizeW = parseInt($(id).css('width'));
      this.sizeH = parseInt($(id).css('height'));
  
      $(id).css('left', '-='+(this.sizeW/2)+'px');
      $(id).css('top', '-='+(this.sizeH/2)+'px');
  
  
      $( id ).append('<div class="health-bar"></div>');
      $(id+' .health-bar').css('width', this.sizeW+'px');

      $( id  ).append('<div class="unit-view"></div>');
      this.viewSizeW =  parseInt($(id+' .unit-view').width());
      this.viewSizeH =  parseInt($(id+' .unit-view').width());
  
      $(id+' .unit-view').css({
        left: '-'+((this.viewSizeW/2)-this.sizeW/2)+'px',
        top: '-'+((this.viewSizeH/2)-this.sizeH/2)+'px'
      })

      return id;  
    }




}