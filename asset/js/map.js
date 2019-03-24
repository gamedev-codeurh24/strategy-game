$(function(){
    window.map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,1,1,1,1,1,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    // adapte la taille de a div de la map pour
    // ne pas décaller les div du cadriallage
    var mapXElem = window.map[0].length;
    var mapW = mapXElem*64;
    $('.map').css('width', mapW+'px');


    window.map.forEach(function(item1, index1, array1) {
        $( '.map' ).append('<div>');
        item1.forEach(function(item, index, array) {
          $( '.map' ).append( '<div class="map-item map'+(item+1)+'"><div style="position:absolute;margin-top:20px" class="infoPath"></div></div>' );
          // $( '.map' ).append( '<div class="map-item map'+(item+1)+'">'+(index)+','+(index1)+'<div style="position:absolute;margin-top:20px" class="infoPath"></div></div>' );
        });
        $( '.map' ).append('</div>');
    });
})
