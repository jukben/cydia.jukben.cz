function GlitchMe() {
  const aspectRatio = window.innerWidth / window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

  const webGLRenderer = new THREE.WebGLRenderer();
  webGLRenderer.setClearColor(new THREE.Color(0xeeeeee));
  webGLRenderer.setSize(window.innerWidth, window.innerHeight);

  // load wallpaper
  const map = new THREE.TextureLoader().load("wallpaper.jpeg");
  map.minFilter = THREE.LinearFilter;

  var wallpaperMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(10 * aspectRatio, 10),
    new THREE.MeshLambertMaterial({
      map
    })
  );

  scene.add(wallpaperMesh);

  // set the position of the image mesh in the x,y,z dimensions
  wallpaperMesh.position.set(0, 0, 0);

  camera.position.z = 6.5;

  const clock = new THREE.Clock();

  const spotLight = new THREE.DirectionalLight(0xffffff);
  spotLight.position.set(0, 0, 1);
  spotLight.intensity = 1;

  scene.add(spotLight);

  document.getElementById("tweak").appendChild(webGLRenderer.domElement);

  const renderPass = new THREE.RenderPass(scene, camera);
  const effectGlitch = new THREE.GlitchPass(64);

  const composer = new THREE.EffectComposer(webGLRenderer);
  composer.addPass(renderPass);
  composer.addPass(effectGlitch);

  render();

  function render() {
    var delta = clock.getDelta();

    requestAnimationFrame(render);

    composer.render(delta);
  }
}

window.onload = GlitchMe;
