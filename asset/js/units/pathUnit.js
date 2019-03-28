let PathUnit = {

 pathUnit(){
   if(this.isSelected()){
     this.path.x =  event.pageX-mapPosX();
     this.path.y =  event.pageY-mapPosY();
     var x1 = pixel2IdArr(unitPosX('#'+this.id));
     var y1 = pixel2IdArr(unitPosY('#'+this.id));
     var x2 = pixel2IdArr(this.path.x);
     var y2 = pixel2IdArr(this.path.y);

     var grid = new PF.Grid(window.mapCollision);
     var finder = new PF.JumpPointFinder();
     // var finder = new PF.AStarFinder();
     var path = finder.findPath(x1, y1, x2, y2, grid);
     path.forEach( (element) => {
       this.path.data.push({x:element[0], y:element[1]})
     });
   }
 }

}
