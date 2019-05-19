
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
    var wall1Geo = new THREE.BoxGeometry(200,200,2)
    var wall2Mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( "/gfx/bg2.jpg" ),
    })
    var wall10Geo = new THREE.BoxGeometry(200,200,2)
    var wall10Mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( "/gfx/bg3.jpg" ),
    })
    var wall10 = new THREE.Mesh(wall10Geo,wall10Mat)
    var wall1 = new THREE.Mesh(wall1Geo,wall10Mat)
    wall1.position.set(-40,50,200)
    scene.add(wall1)
    var wall2Geo = new THREE.BoxGeometry(2,200,200)
    var wall2 = new THREE.Mesh(wall1Geo,wall2Mat)
    wall2.position.z = -200
    wall2.position.y = 50
    wall2.position.x = -40
    // wall2.name="map"
    scene.add(wall2)
    var wall3Geo = new THREE.BoxGeometry(2,200,200)
    var wall3Mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( "/gfx/bg1.png" ),
    })
    var wall3 = new THREE.Mesh(wall3Geo,wall3Mat)
    wall3.position.set(200,50,0);
    wall3.name = "quiz";
    scene.add(wall3);
    var wall4Mat = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load( "/gfx/bg2.jpg" ),
    })
    var wall4 = new THREE.Mesh(wall3Geo,wall4Mat)

    wall4.position.x = -200;
    scene.add(wall4)
    camera.position.set(0,50,0)
    var wall5 = wall10.clone();
    wall5.position.set(118,50,140)
    scene.add(wall5)
    wall5.lookAt(new THREE.Vector3(0,50,0))
    var wall6 = wall10.clone();
    wall6.position.set(118,50,-140)
    scene.add(wall6)
    wall6.lookAt(new THREE.Vector3(0,50,0));
    wall1.name="map"
    var lookPoint = new THREE.Mesh();
    lookPoint.position.x = 100
    lookPoint.position.y = 50
    lookPoint.position.z = 0
    scene.add(lookPoint)    
    $("#root").append(renderer.domElement);
    var counter = 0;
    var rotateDelta = new THREE.Vector2();
    var point = new THREE.Vector3(100,50,0);
    var loader = new THREE.GLTFLoader()
    loader.load(
        // resource URL
        '/gfx/models/bookshelf.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            scene.add( gltf.scene );
            gltf.scene.children[2].name = ""
            gltf.scene.scale.set(50,50,50)
            gltf.scene.position.set(-20,50,-190)
            gltf.scene.lookAt(new THREE.Vector3(-20,30,0))
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
            console.log(error)
            console.log( 'An error happened' );
    
        }
    );
    loader.load(
        // resource URL
        '/gfx/models/frame.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.children[2].name = "map"
            scene.add( gltf.scene );
            gltf.scene.scale.set(15,15,15)
            gltf.scene.position.set(0,70,170)
            gltf.scene.rotation.x = 300
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
            console.log(error)
            console.log( 'An error happened' );
    
        }
    );
    loader.load(
        // resource URL
        '/gfx/models/text.gltf',
        // called when the resource is loaded
        function ( gltf ) {
            gltf.scene.children[2].name = "quiz"
            scene.add( gltf.scene );
            gltf.scene.scale.set(15,15,15)
            gltf.scene.position.set(100,50,10)
            gltf.scene.lookAt(camera.position)
        },
        // called while loading is progressing
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
            console.log(error)
            console.log( 'An error happened' );
    
        }
    );
    $(document).keydown(function(e){
        if(e.key == "a" || e.key == "A"){
            $("#l").click()
        }
        if(e.key == "d" || e.key == "D"){
            $("#r").click()
        }
        if(e.key == "w" || e.key == "W"){
            if(counter == -1){
                window.location.href = "/map";
            } else if (counter == 0) {
                window.location.href = "/quiz";
            } else {
                // window.location.href = "/trophy";
            }
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
    $("#root").mousedown(function (event) {
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
        var windowHeight = $(window).height() - $("nav").height()
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
