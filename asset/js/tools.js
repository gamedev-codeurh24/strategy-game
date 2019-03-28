$(function(){
  $('.building').click(function(){
    log("test");
    $('#infantry-tool').css('display', 'flex')
  })

  $('#infantry-machine-gun').click(function(){
    alert('Machine Gun');
  })

  $('#infantry-rocket-launcher').click(function(){
    alert('Rocket Launcher');
  })

})
