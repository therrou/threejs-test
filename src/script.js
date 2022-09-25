import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import * as dat from 'lil-gui'
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Model loader 
// const gltfLoader = new GLTFLoader()
// gltfLoader.load(
//     '/models/neon_letters/scene.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(5, 5, 5)
//         gltf.scene.position.set(-10, 4.5, 0)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)
//     }
// )




// Font loader
const fontLoader = new FontLoader()
fontLoader.load("./fonts/Neon_Regular.json", (font) => {
    const textGeometry = new TextGeometry(
        "Tomy Bunker",
        {
            font,
            size: 0.3,
            height: 0.2,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        }
    )
    textGeometry.center()
    const material = new THREE.MeshPhysicalMaterial({ color: 0xff0000, reflectivity: 1, clearcoat: 1, metalness: 1, roughness: 0.8 })
    const text = new THREE.Mesh(textGeometry, material)
    text.position.set(0, 2.2, 2.75)
    scene.add(text)
    tick()
})
// Scene
const scene = new THREE.Scene()

const planeIframe = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({
        color: "red"
    })
)
planeIframe.position.set(-10, 4.5, 0)
planeIframe.rotation.y = Math.PI * 0.5
scene.add(planeIframe)

// Fog 
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog
/**
 * Textures
 */
// door texture k
const textureLoader = new THREE.TextureLoader()
const colorDoorTexture = textureLoader.load('/textures/door/color.jpg')
const aoDoorTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const heightDoorTexture = textureLoader.load('/textures/door/height.jpg')
const metallicDoorTexture = textureLoader.load('/textures/door/metalness.jpg')
const normalDoorTexture = textureLoader.load('/textures/door/normal.jpg')
const alphaDoorTexture = textureLoader.load('/textures/door/alpha.jpg')   
const roughnessDoorTexture = textureLoader.load('/textures/door/roughness.jpg')

// bricks texture 
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// Pipe Texture 
const pipeColorTexture = textureLoader.load('/textures/concrete/BaseColor.jpg')
const pipeAmbientOcclusionTexture = textureLoader.load('/textures/concrete/AmbientOcclusion.jpg')
const pipeNormalTexture = textureLoader.load('/textures/concrete/Normal.jpg')
const pipeRoughnessTexture = textureLoader.load('/textures/concrete/Roughness.jpg')
const pipeHeightTexture = textureLoader.load('/textures/concrete/Height.png')

// window texture
const windowTexture = textureLoader.load('/textures/window/color.jpg')
const windowAmbientOcclusionTexture = textureLoader.load('/textures/window/ambientOcclusion.jpg')
const windowAlphaTexture = textureLoader.load('/textures/window/glass.jpg')
const windowRoughnessTexture = textureLoader.load('/textures/window/roughness.jpg')
const windowNormalTexture = textureLoader.load('/textures/window/normal.jpg')
const windowHeightTexture = textureLoader.load('/textures/window/height.png')

// roof texture 
const roofColorTexture = textureLoader.load('/textures/roof/Metal_006_baseColor.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('/textures/roof/Metal_006_ambientOcclusion.jpg')
const roofNormalTexture = textureLoader.load('/textures/roof/Metal_006_normal.jpg')
const roofRoughnessTexture = textureLoader.load('/textures/roof/Metal_006_roughness.jpg')
const roofHeightTexture = textureLoader.load('/textures/roof/Metal_006_height.png')
const roofMetalnessTexture = textureLoader.load('/textures/roof/metallic.jpg')


// Character Group 

const character = new THREE.Group()

const head = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.15, 35, 35),
    new THREE.MeshBasicMaterial({color: "#9E5217"}))
head.position.y = 1
head.position.z = 4

const body = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.3, 0.5, 0.2),
    new THREE.MeshBasicMaterial({color: "#9E5217"}))
body.position.y = 0.6
body.position.z = 4

const leftEye = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.02, 5, 5),
    new THREE.MeshBasicMaterial({color: "black"}))
leftEye.position.x = 0.05
leftEye.position.y = 1
leftEye.position.z = 4.15

const rightEye = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.02, 5, 5),
    new THREE.MeshBasicMaterial({color: "black"}))
rightEye.position.x = -0.05
rightEye.position.y = 1
rightEye.position.z = 4.15

const degreesToRadians = (degrees) => {
	return degrees * (Math.PI / 180)
}

const leftArm = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.1, 0.3, 0.1),
    new THREE.MeshBasicMaterial({color: "#9E5217"}))
leftArm.position.y = 0.65
leftArm.position.z = 4
leftArm.position.x = -0.25
leftArm.rotation.z = degreesToRadians(-30)

// leftArm.rotation.z = -0.5
const rightArm = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.1, 0.3, 0.1),
    new THREE.MeshBasicMaterial({color: "#9E5217"}))
rightArm.position.y = 0.625
rightArm.position.z = 4
rightArm.position.x = 0.225
rightArm.rotation.z = degreesToRadians(30)
character.add(head, body, leftArm, rightArm, leftEye, rightEye)

scene.add(character)

/**
 * House
 */

const house = new THREE.Group();

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(5, 2.5, 5),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
        displacementScale: 0.1,
    })
)
walls.position.y = 2.5 / 2

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial(
        {
            map: colorDoorTexture,
            aoMap: aoDoorTexture,
            displacementMap: heightDoorTexture,
            displacementScale: 0.1,
            metalnessMap: metallicDoorTexture,
            normalMap: normalDoorTexture,
            transparent: true,
            alphaMap: alphaDoorTexture,
            roughnessMap: roughnessDoorTexture
        }
    )
    )
door.position.y = 0.9   
door.position.z = 2.5 + 0.01
house.add(walls, door)
const windowMaterial = new THREE.MeshStandardMaterial(
    {
        map: windowTexture,
        aoMap: windowAmbientOcclusionTexture,
        transparent: true,
        alphaMap: windowAlphaTexture,
        roughnessMap: windowRoughnessTexture,
        normalMap: windowNormalTexture,
        displacementMap: windowHeightTexture,
        displacementScale: 0,
    }
)
const houseWindow1 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    windowMaterial
        )


const houseWindow2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
   windowMaterial)

houseWindow1.position.x = -2.5 - 0.01
houseWindow1.position.y = 1.5
houseWindow1.position.z = -1.5
houseWindow1.rotation.y = - Math.PI * 0.5

houseWindow2.position.x = 2.5 + 0.01
houseWindow2.position.y = 1.5
houseWindow2.position.z = 1.5
houseWindow2.rotation.y = Math.PI * 0.5

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4.0, 1, 4),
    new THREE.MeshStandardMaterial(
        {
            map: roofColorTexture,
            aoMap: roofAmbientOcclusionTexture,
            normalMap: roofNormalTexture,
            roughnessMap: roofRoughnessTexture,
            displacementMap: roofHeightTexture,
            displacementScale: 0,
            metalnessMap: roofMetalnessTexture
        }
    )
    )


const pipe = new THREE.Mesh(
    new THREE.BoxGeometry(1,1, 1),
    new THREE.MeshStandardMaterial({
        map: pipeColorTexture,
        aoMap: pipeAmbientOcclusionTexture,
        normalMap: pipeNormalTexture,
        roughnessMap: pipeRoughnessTexture,
        displacementMap: pipeHeightTexture,
        displacementScale: 0,
     })
)
pipe.position.y = 3
pipe.position.x = 2
pipe.position.z = -0.5


roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25

const busheGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })
const bush1 = new THREE.Mesh(busheGeometry, bushMaterial)
bush1.position.set(2, 0.2, 2.8)
bush1.scale.set(0.5, 0.5, 0.5)
const bush2 = new THREE.Mesh(busheGeometry, bushMaterial)
bush2.position.set(-2, 0.1, 2.8)
bush2.scale.set(0.25, 0.25, 0.25)
const bush3 = new THREE.Mesh(busheGeometry, bushMaterial)
bush3.position.set(-1.35, 0.2, 2.8)
bush3.scale.set(0.5, 0.5, 0.5)

const gravesGroup = new THREE.Group()

for( let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 5 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.8, 0.2),
        new THREE.MeshStandardMaterial({ color: '#b2b6b1' })
    )
    grave.position.set(x, 0.3, z)
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    gravesGroup.add(grave)
}

house.add(walls, roof, houseWindow1, houseWindow2, pipe, bush1, bush2, bush3)


scene.add(house)
scene.add(gravesGroup)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.11)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.11)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

const doorLight = new THREE.PointLight('red', 1, 7)
doorLight.position.set(0, 2, 3.5)
house.add(doorLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor('#262837')
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()