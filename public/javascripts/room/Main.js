
$(document).ready(function () {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        $(window).width() / $(window).height(),    // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maxymalna renderowana odległość od kamery
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xaaaaaa);
    var floorGeo = new THREE.BoxGeometry(400,2,400)
    var floorMat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( "/gfx/floor.png" ),        
    })
    var floor = new THREE.Mesh(floorGeo,floorMat)
    scene.add(floor)
    var wall1Geo = new THREE.BoxGeometry(300,300,2)
    var wall1Mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( "/gfx/lama.png" ),
    })
    var wall1 = new THREE.Mesh(wall1Geo,wall1Mat)
    wall1.position.set(-100,0,200)
    scene.add(wall1)
    wall1.name="trophy"
    var wall2 = wall1.clone();
    wall2.position.z = -200
    wall2.name="map"
    scene.add(wall2)
    var wall3Geo = new THREE.BoxGeometry(2,300,300)
    var wall3Mat = new THREE.MeshNormalMaterial({
        color:0xffffff
    })
    var wall3 = new THREE.Mesh(wall3Geo,wall3Mat)
    wall3.position.set(200,0,0);
    wall3.name = "quiz";
    scene.add(wall3);
    var wall4 = wall3.clone();
    wall4.position.x = -200;
    scene.add(wall4)
    camera.position.set(0,50,0)
    var wall5 = wall1.clone();
    wall5.position.set(140,0,140)
    scene.add(wall5)
    wall5.lookAt(new THREE.Vector3(0,0,0))
    var wall6 = wall1.clone();
    wall6.position.set(140,0,-140)
    scene.add(wall6)
    wall6.lookAt(new THREE.Vector3(0,0,0));
    var lookPoint = new THREE.Mesh();
    lookPoint.position.x = 100
    lookPoint.position.y = 50
    lookPoint.position.z = 0
    scene.add(lookPoint)    
    $("#root").append(renderer.domElement);
    var counter = 0;
    var rotateDelta = new THREE.Vector2();
    var point = new THREE.Vector3(100,50,0);
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
            $("#l").hide()
            point = new THREE.Vector3(0,50,-100);
            counter+=1
        }
        if(counter == -1){
            $("#r").show()
            point = new THREE.Vector3(100,50,0);
            counter+=1
        }
    })
    $("#r").click(function(){
        if(counter == 0){
            $("#r").hide()
            point = new THREE.Vector3(0,50,100);
            counter-=1
        }
        if(counter == 1){
            $("#l").show()
            point = new THREE.Vector3(100,50,0);
            counter-=1
        }
    })
    $(document).mousedown(function (event) {
        var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children,true);
        if (intersects.length > 0) {
            var name = intersects[0].object.name;
            if(name != ""){
                window.location.href = "/" + name;
            }
        }
    })
    function render() {
        var windowHeight = $(window).height()
        var windowWidth = $(window).width()
        renderer.setSize(windowWidth, windowHeight);
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
