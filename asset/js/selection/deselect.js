// deselection
$( 'body' ).contextmenu(function() {
  // deselectionne tout: unité et batiments
  $('.unit').css('border', '1px solid black');
  window.unitSelected = [];
  $('.building').css('border', '0px solid black');
  window.buildingSelected = [];


  // lors de la deselection. les outils
  // n'ont plus rien à proposé car rien n'est selectionné
  $('.tools > .row').css('display', 'none');

  return false;
});
