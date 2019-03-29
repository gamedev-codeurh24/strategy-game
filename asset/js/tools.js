$(function(){
  $('.building').click(function(){
    log("test");
    $('#infantry-tool').css('display', 'flex')
  })

  $('#infantry-machine-gun').click(function(){
    // alert('Machine Gun');
    var progressBar = $(this).parent().find('.progress-bar');
    progressBar.css('height', '100%');
    var RU;
    var taskCreateInfantry = setInterval(() => {
      if(  progressBar.height() > 0 ) {
        progressBar.css('height', '-=1px');
      }else{
        var idBuilding = window.buildingSelected[0];
        var x = $('#'+idBuilding).position().left;
        var y = $('#'+idBuilding).position().top;

        RU = new RootUnit(x+90,y+90);
        RU.camp(2);
        RU.enemy.add('camp1');
        clearInterval(taskCreateInfantry);
      }
    }, 50);
  })

  $('#infantry-rocket-launcher').click(function(){
    alert('Rocket Launcher');
  })

})
