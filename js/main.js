const clock = new THREE.Clock();
let stuff = 10;

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const shape = [];
const geometry = [];

mouseShiftX = 0;


const star = [];
const pic = [];
const starColor = [];
let scrollSpeed = 5;
starColor[0] = new THREE.MeshBasicMaterial({ color: 0xff8a80 });
starColor[1] = new THREE.MeshBasicMaterial({ color: 0xff80ab });
starColor[2] = new THREE.MeshBasicMaterial({ color: 0xea80fc });
starColor[3] = new THREE.MeshBasicMaterial({ color: 0x80d8ff });
starColor[4] = new THREE.MeshBasicMaterial({ color: 0xb9f6ca });
starColor[5] = new THREE.MeshBasicMaterial({ color: 0xffff8d });
starColor[6] = new THREE.MeshBasicMaterial({ color: 0xffffff });
const FXMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
const UIField = new THREE.Object3D();
UIField.position.z = -100;

rotationPosition = 0;//270/180*Math.PI;

fog = [];
fogAngle = [0,50,115,180,235,290];
fogRadius = 770;




constellationCoords = [
    [[-30,0],[-30,10],[-20,20],[-10,20],[0,10],[10,20],[20,20],[30,10],[30,0],[0,-30]]
]
constellationLines = [
    [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,0]
]
constellationPosition = [

  [360-15,20],
  [360-10,70],
    [10,70],

  [45,70],
  [55,20],

  [90,55],
  [110,15],
  [120,60],
  [140,70],


  [174,60],
  [175,20],
  [190,75],

  [220,70],
  [230,40],
  [260,25],

  [270,80],
  [295,67],
  [308,28],
  [315,70]
]
constellations = constellationPosition.length;

constellationCollider = [];
constellationLineMaterial = [];

// toy basics
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container = document.getElementById('container');
container.appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 4*3000);
//camera.position.x = UIField.position.x = -50;

cameraMainY = 700;
camera.position.y = UIField.position.y = cameraMainY;
//camera.position.z = 3000;

const scene = new THREE.Scene();
scene.add(camera, UIField);
window.addEventListener( 'resize', onWindowResize, false );
document.body.addEventListener('click', onDocumentClick, false);
document.body.addEventListener('touchstart', onDocumentTouchStart, false);
document.body.addEventListener('touchmove', onDocumentTouchMove, false);
document.body.addEventListener('mousedown', onDocumentMouseDown, false);
document.body.addEventListener('mousemove', onDocumentMouseMove, false);
document.ontouchmove = function(event){ event.preventDefault(); };

shape[0] = new THREE.Shape();
shape[0].absarc(-6, 6, 6, 0, -Math.PI / 2, true);
shape[0].absarc(-6, -6, 6, Math.PI / 2, 0, true);
shape[0].absarc(6, -6, 6, -Math.PI, -Math.PI * 1.5, true);
shape[0].absarc(6, 6, 6, -Math.PI / 2, -Math.PI, true);
geometry[0] = new THREE.ShapeBufferGeometry(shape[0], 1);
geometry[1] = new THREE.CircleBufferGeometry(3, 10);

starGroup = new THREE.Group();
scene.add(starGroup);
for (let i = 0; i < 5000; i++) {
  if (Math.random() < 0.06) {
    star[i] = new THREE.Mesh(geometry[Math.round(Math.random())], FXMaterial);
  } else {
    star[i] = new THREE.Mesh(geometry[Math.round(Math.random())], starColor[Math.floor(Math.random() * 6)]);
  }

  //let z =  -1000 - Math.random() * 999/20;
  let z = -1100 - Math.random()*500;
  let kk = 1200*2
  star[i].position.set(-kk + Math.random() * kk*2, -kk + Math.random() * kk*2,z);
  //scene.add(star[i]);

  starGroup.add(star[i]);
  /*
  if (z<-2000)
    layer[0].add(star[i])
  else
    layer[1].add(star[i])*/
}







constellationGroup = [];
constellationStar = [];

for (let i=0;i<constellations;i+=1)
{
  g = new THREE.Group();

  ss =[]


  vertices = []



  for (let j = 0;j<constellationCoords[0].length;j++)
  {



    let s = new THREE.Mesh(geometry[0], starColor[6]);
    let xx = constellationCoords[0][j][0]*3;
    let yy = constellationCoords[0][j][1]*3;
    let zz = Math.random()*40;



    s.position.set(xx,yy,zz);
    ss.push(s);
    g.add(s);

    vertices.push(new THREE.Vector3(xx, yy, zz))
  }
  constellationStar.push(ss);
  constellationGroup.push(g);

  scene.add(g);

  var positions = new Float32Array(vertices.length * 3);
  for (let j = 0; j < vertices.length; j++) {

    positions[j * 3] = vertices[j].x;
    positions[j * 3 + 1] = vertices[j].y;
    positions[j * 3 + 2] = vertices[j].z;

  }


  var lineGeometry = new THREE.BufferGeometry();
  lineGeometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  lineGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array(constellationLines[0]), 1));


  // line material
  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,opacity:0,transparent:true
  });

  var line = new THREE.LineSegments(lineGeometry, lineMaterial);
  g.add(line);

  var collider = new THREE.Mesh(new THREE.SphereGeometry(90,32,32),new THREE.MeshBasicMaterial( {color: 0xffff00,opacity:0} ))
  collider.material.transparent = true

  g.add(collider);
  constellationCollider.push(collider);
  constellationLineMaterial.push(lineMaterial);




}







/*
layer = []

for (let i=0;i<3;i++)
{
  let g = new THREE.Group();
  scene.add(g);
  layer.push(g);
}*/



planet = null;
buttonBack = null;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// DRAW GRAPHICS WITH LOADED ASSETS
function createGraphics() {
// draw buttons text
  /*for (let i = 0; i < 8; i++) {
    shape[0] = CircleRegular.generateShapes(buttonText[i], 1.4);
    geometry[0] = new THREE.ShapeBufferGeometry(shape[0], 2);
    geometry[0].computeBoundingBox();
    let xMid = -0.5 * (geometry[0].boundingBox.max.x - geometry[0].boundingBox.min.x);
    let yMid = -0.5 * (geometry[0].boundingBox.max.y - geometry[0].boundingBox.min.y);
    geometry[0].translate(xMid, yMid, 0);
    button[i].text = new THREE.Mesh(geometry[0], spaceBlueMaterial);
    button[i].text.position.z = 0.04;
    button[i].add(button[i].text);
  }*/

  planet = new THREE.Sprite(pic[0]);
  planet.scale.set(800, 800, 1)
  planet.position.set(0, 0, -900);

  scene.add(planet);

  buttonBack = new THREE.Sprite(pic[7]);
  buttonBack.scale.set(442*0.15,184*0.15,1);
  buttonBack.position.set(0,0,-860);



  scene.add(buttonBack);




  for (let i=0;i<6;i++)
  {
    f = new THREE.Sprite(pic[i+1]);
  //  f.center = new THREE.Vector2(0.5,0);
    let aa = fogAngle[i]/180*Math.PI;
    //f.material.rotation.z = aa
    f.scale.set(800*(pic[i+1].map.image.width/pic[i+1].map.image.height),800,1);


    f.material.opacity = 0.2;
    //f.position.set(Math.cos(aa)*fogRadius,Math.sin(aa)*fogRadius,-1100);
    fog.push(f)
    scene.add(f)
  }



  new THREE.Sprite()

}



// check loading progress
function checkLoading() {
  stuff --;
  if (stuff == 0) {
    createGraphics();
  }
}

// load fonts
new THREE.FontLoader().load('fonts/CirceRoundedExtraBoldRegular.json', function(font) {
  CirceRoundedExtraBoldRegular = font;
  checkLoading();
});
new THREE.FontLoader().load('fonts/CircleRegular.json', function(font) {
  CircleRegular = font;
  checkLoading();
});


// load textures
let p = 0;
loadPics();
function loadPics() {
  new THREE.TextureLoader().load(`textures/texture${p}.png`, function(texture) {
    pic[p] = new THREE.SpriteMaterial({ map: texture, color: 0xffffff });
    checkLoading();
    p ++;
    if (p < 8) loadPics();
  });
}





zooming = false;
zoomed = false;
targetRotation = -1;

function zoomToConstellation(id) {
  console.log('ZOOM');
  console.log(id);

  zooming = true;
  zoomed = true;


  if (rotationPosition>=360)
    rotationPosition-=360;

  if (rotationPosition<0)
    rotationPosition+=360;


  targetRotation = constellationPosition[id][0];

  // w/h=0.46 ->0
  // w/h=1.77 ->1
  let kk = (window.innerHeight/window.innerWidth-0.46)/1.31;
  if (kk<0)
    kk=0;
  if (kk>1)
    kk =1;
  kk = 1-kk;
  targetY = 350+100*kk+constellationPosition[id][1]*6;//450+constellationPosition[id][1]*6;
  targetZ = -400-250*kk;//-650;

  targetButtonY = targetY-160+kk*80;

  if (rotationPosition>=0 && rotationPosition<90 && targetRotation>=270 && targetRotation<360)
    targetRotation-=360;

  if (targetRotation>=0 && targetRotation<90 && rotationPosition>=270 && rotationPosition<360)
    targetRotation+=360;


  rotSpeed = 0;

  let dur = 0.5;

  gsap.to(this, { duration: dur, rotationPosition: targetRotation, ease: "power0", repeat: 0 ,onComplete: function() {
    zooming = false;

      gsap.to(constellationLineMaterial[id], { duration: dur, opacity: 1, ease: "power0", repeat: 0 });

  }
  })


  gsap.to(camera.position, {duration:dur,z:targetZ,y:targetY, ease: "power0", repeat: 0 })

  gsap.to(buttonBack.position, {duration:dur,y:targetButtonY, ease: "power0", repeat: 0 })

}


function zoomBack() {

  zooming = true;

  dur = 0.5;

  gsap.to(camera.position, {duration:dur,z:0,y:cameraMainY, ease: "power0", repeat: 0,onComplete: function() {
      zooming = false;
      zoomed = false;
    } })

  gsap.to(buttonBack.position, {duration:dur,y:0, ease: "power0", repeat: 0 })
}


// render
loop();
function loop() {
  delta = clock.getDelta();

  //camera.position.z -= scrollSpeed * delta * 60000 / window.innerWidth
  //camera.rotation.z -= 0.1* delta


  //layer[0].rotation.z+=0.02*delta;
  //layer[1].rotation.z+=0.05*delta;

  //let d = 0.2*delta;
  //rotationPosition+=d;


  if (planet)
  {




    if (!zoomed)
    {
      rrs = 0.002;
      if (rotSpeed>rrs)
        rotSpeed-= rrs;
      else if (rotSpeed<-rrs)
        rotSpeed+=rrs;
      else
        rotSpeed = 0;



      rotationPosition+=rotSpeed/Math.PI*180*60*delta;
      console.log(delta)
    }



    starGroup.rotation.z=rotationPosition/180*Math.PI;
    planet.material.rotation = rotationPosition/180*Math.PI;




    for (let i=0;i<6;i++)
    {
      f = fog[i];

      let aa = -fogAngle[i]/180*Math.PI+rotationPosition/180*Math.PI+90/180*Math.PI;
      f.material.rotation = aa-90/180*Math.PI;
      f.position.set(Math.cos(aa)*fogRadius,Math.sin(aa)*fogRadius,-1010);

    }

    for (let i=0;i<constellations;i++)
    {

      let aa = -constellationPosition[i][0]/180*Math.PI+rotationPosition/180*Math.PI+90/180*Math.PI;
      let r = 500+constellationPosition[i][1]*6;
      constellationGroup[i].position.set(Math.cos(aa)*r,Math.sin(aa)*r,-950);

      constellationGroup[i].rotation.z=aa-90/180*Math.PI;

    }
  }





  UIField.position.set(camera.position.x, camera.position.y, camera.position.z - 100);

  renderer.render(scene, camera);
  requestAnimationFrame( loop );
}


mouseStartX = 0;
function onDocumentClick(event) {

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


  console.log('MM '+mouse.x+' '+mouseStartX)
  if (Math.abs(mouse.x-mouseStartX)>0.1)
    return;
  console.log('click');

  raycaster.setFromCamera(mouse, camera);

  if (!zoomed)
  {
    currId = -1;
    for (let i=0;i<constellations;i++)
    {
      intersects = raycaster.intersectObject(constellationCollider[i]);
      if (intersects.length > 0)
        currId = i;

    }
    if (currId!==-1)
    {
      zoomToConstellation(currId);
      document.body.style.cursor = "default";

    }

  }
  else
  {
    if (!zooming)
    {
      if (mouse.y<-0.6)
      {
        zoomBack();
        document.body.style.cursor = "default";
      }

    }
  }







}
function onDocumentTouchStart(event) {

  event.preventDefault();
  mouseShiftX = event.touches[0].clientX;
}



rotSpeed = 0;
maxRotSpeed = 0.1;




function onDocumentTouchMove(event) {



  event.preventDefault();

  rotSpeed = -(event.touches[0].clientX - mouseShiftX) * 0.002;


  if (rotSpeed>maxRotSpeed)
    rotSpeed = maxRotSpeed;


  if (rotSpeed<-maxRotSpeed)
    rotSpeed = -maxRotSpeed;

  mouseShiftX = event.touches[0].clientX;


}


function onDocumentMouseDown(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  mouseShiftX = mouse.x;

  mouseStartX = mouse.x;


}
function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);


  if (!zoomed)
  {
    currId = -1;
    for (let i=0;i<constellations;i++)
    {
      intersects = raycaster.intersectObject(constellationCollider[i]);
      if (intersects.length > 0)
        currId = i;

    }
    if (currId!==-1)
      document.body.style.cursor = "pointer";
    else
      document.body.style.cursor = "default";

    if ((event.buttons & 1) === 1)
    {

      rotSpeed = -(mouse.x - mouseShiftX) ;


      if (rotSpeed>maxRotSpeed)
        rotSpeed = maxRotSpeed;


      if (rotSpeed<-maxRotSpeed)
        rotSpeed = -maxRotSpeed;

      mouseShiftX = mouse.x;

    }
  }
  else
  {
    if (mouse.y<-0.6)
    {
      document.body.style.cursor = "pointer";
    }
    else
    {
      document.body.style.cursor = "default"
    }
  }










}

// on window resize
function onWindowResize() {
  lim = 349.73 - 116.58 * window.innerWidth / window.innerHeight;
  if (window.innerWidth / window.innerHeight < 1) {
    //textBackLandscape.visible = false;
    //textBackPortrait.visible = true;
  }
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}