<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">

    <title>Strategy</title>
    <link rel="icon" type="image/png" href="asset/img/icon.png" />

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
    <link rel="stylesheet" href="asset/css/master.css" />
    <link rel="stylesheet" href="asset/css/building.css" />
    <link rel="stylesheet" href="asset/css/tool.css" />
</head>

<body>
    <div class="render">
        <div class="UI container-fluid">
            <div class="row">
                <div class="col-12 info">
                    informations
                    <div id="money">$<span></span></div>
                    <div>
                        <span id="info1"></span> - <span id="info2"></span>
                    </div>
                </div>
                <div class="offset-10 col-2 offset-lg-11 col-lg-1 tools">
                    <div class="row" id="infantry-tool">
                        <div class="col-6 pl-0 pr-0">
                            <div class="progress-bar"></div>
                            <div class="number-tasks"></div>
                            <img id="infantry-machine-gun" src="/asset/img/tool/infantry/infantry-machine-gun.png" alt="picture infantry machine gun">
                        </div>
                        <div class="col-6 pl-0 pr-0">
                            <div class="progress-bar"></div>
                            <div class="number-tasks"></div>
                            <img id="infantry-rocket-launcher" src="/asset/img/tool/infantry/rocket-launcher.png" alt="picture rocket launcher">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="map"></div>
        <div class="units"></div>
        <div class="buildings"></div>
    </div>
    <audio id="soundFX" src="asset/sound/effect/uzi-submachine-gun.ogg" loop></audio>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="asset/js/external/pathfinding-browser.min.js"></script>
    <script src="asset/js/globals.js"></script>
    <script src="asset/js/functions.js"></script>
    <script src="asset/js/tools.js"></script>
    <script src="asset/js/device/keyControlPressed.js"></script>
    <script src="asset/js/map.js"></script>
    <!-- https://github.com/qiao/PathFinding.js/ -->

    <script src="asset/js/mouseMoveMap.js"></script>


    <script src="asset/js/selection/deselect.js"></script>
    <script src="asset/js/selection/selectUnit.js"></script>
    <script src="asset/js/selection/buildingSelection.js"></script>

    <script src="asset/js/BasicElementOfWar.js"></script>
    
    <script src="asset/js/units/moveUnit.js"></script>
    <script src="asset/js/units/pathUnit.js"></script>
    <script src="asset/js/units/shotOnEnemy.js"></script>
    <script src="asset/js/units/healthBar.js"></script>
    <script src="asset/js/units/unit.js"></script>

    <script src="asset/js/building/infantry-building.js"></script>
    <script src="asset/js/game.js"></script>
    <script>
        document.addEventListener('keypress', (event) => {
            if (event.key == 'p') {
                window.isPaused = !window.isPaused;
            }
        });
    </script>
    <script src="asset/js/game.js"></script>
</body>

</html> 