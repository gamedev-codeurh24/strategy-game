let HealthBar = {
  healthBar(){
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
  }
}
