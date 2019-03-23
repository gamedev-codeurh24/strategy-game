<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">

        <title>Strategy</title>
        <link rel="icon" type="image/png" href="asset/img/icon.png" />

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
        <link rel="stylesheet" href="asset/css/master.css" />
    </head>
    <body>
        <div class=" render">
            <div class="UI container-fluid">
                <div class="row">
                    <div class="col-12 info">
                        information
                        <div>
                          <span id="info1"></span> - <span id="info2"></span>
                        </div>
                    </div>
                    <div class="offset-10 col-2 tools">
                        tools
                    </div>
                </div>
            </div>
            <div class="map"></div>
            <div class="units"></div>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="asset/js/globals.js"></script>
        <script src="asset/js/functions.js"></script>
        <script src="asset/js/map.js"></script>
        <script src="asset/js/easystar-0.4.3.min.js"></script>
        <script src="asset/js/unit.js"></script>
        <script src="asset/js/mouseMoveMap.js"></script>
        <script src="asset/js/trajectory.js"></script>
        <script src="asset/js/selectUnit.js"></script>
        <script src="asset/js/unitMove.js"></script>
        <script>
        document.addEventListener('keypress', (event) => {
            if( event.key == 'p' ){
                window.isPaused = !window.isPaused ;
            }
        });
        </script>
        <script src="asset/js/game.js"></script>
    </body>
</html>
