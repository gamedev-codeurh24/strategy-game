$(function(){
  window.keyPressed = [];
  document.addEventListener('keydown', (event) => {
    // verifie que la touche pressé n'existe pas deja dans la
    // liste des touche presser en down
    var found = window.keyPressed.indexOf(event.key)

    // si elle n'a jamais ete retenu dans la liste
    // alors on l'ajoute
    if (found == -1) {
      window.keyPressed.push(event.key);
    }
  });

  document.addEventListener('keyup', (event) => {
    window.keyPressed = [];
  });
})
