
$(document).ready(function () {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        $(window).width() / $(window).height(),    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maxymalna renderowana odległość od kamery
    );
    var renderer = new THREE.WebGLRenderer();
    var windowHeight = $(window).height()
    var windowWidth = $(window).width()
    renderer.setSize(windowWidth, windowHeight);
    renderer.setClearColor(0xaaaaaa);
    var floorGeo = new THREE.BoxGeometry(100,2,100)
    var floorMat = new THREE.MeshNormalMaterial({
        color:0xffffff
    })
    var floor = new THREE.Mesh(floorGeo,floorMat)
    scene.add(floor)
    var wall1Geo = new THREE.BoxGeometry(100,100,2)
    var wall1Mat = new THREE.MeshNormalMaterial({
        color:0xff000000
    })
    var wall1 = new THREE.Mesh(wall1Geo,wall1Mat)
    wall1.position.set(0,0,50)
    scene.add(wall1)
    var wall2 = wall1.clone();
    wall2.position.z = -50
    scene.add(wall2)
    var wall3Geo = new THREE.BoxGeometry(2,100,100)
    var wall3Mat = new THREE.MeshNormalMaterial({
        color:0xffffff
    })
    var wall3 = new THREE.Mesh(wall3Geo,wall3Mat)
    wall3.position.set(50,0,0);
    scene.add(wall3);
    var wall4 = wall3.clone();
    wall4.position.x = -50;
    scene.add(wall4)
    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    camera.position.set(0,25,0)
    var lookPointG = new THREE.BoxGeometry(2,2,2);
    var lookPointM = new THREE.MeshNormalMaterial({
        color:0xffffff
    })
    var lookPoint = new THREE.Mesh(lookPointG,lookPointM);
    lookPoint.position.x = 100
    lookPoint.position.y = 25
    lookPoint.position.z = 0
    scene.add(lookPoint)    
    $("#root").append(renderer.domElement);
    var counter = 0;
    var rotateDelta = new THREE.Vector2();
    var point = new THREE.Vector3(100,25,0);
    $(document).keydown(function(e){
        if(e.key == "a" || e.key == "A"){
            $("#l").click()
        }
        if(e.key == "d" || e.key == "D"){
            $("#r").click()
        }
    })
    $("#l").click(function(){
        if(counter == 0){
            point = new THREE.Vector3(0,25,-100);
            counter+=1
        }
        if(counter == -1){
            point = new THREE.Vector3(100,25,0);
            counter+=1
        }
    })
    $("#r").click(function(){
        if(counter == 0){
            point = new THREE.Vector3(0,25,100);
            counter-=1

        }
        if(counter == 1){
            point = new THREE.Vector3(100,25,0);
            counter-=1
        }
    })
    function render() {
        if(Math.floor(lookPoint.position.clone().distanceTo(point)) >1){
            rotateDelta = point.clone().sub(lookPoint.position).normalize()
            lookPoint.translateOnAxis(rotateDelta, 4)
        }
        camera.lookAt(lookPoint.position)
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render()
})
