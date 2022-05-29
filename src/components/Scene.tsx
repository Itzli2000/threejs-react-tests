import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene as ThreeScene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Scene = () => {
  const canvasRef = useRef(null);

  const scene = new ThreeScene();
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1,
  });
  const cube = new Mesh(geometry, material);
  let renderer: WebGLRenderer;
  let camera: PerspectiveCamera;
  let controls: OrbitControls;
  let light = new AmbientLight(0x00ffff, 2);
  scene.add(light);

  const initScene = () => {
    cube.rotateX(0.5);
    cube.rotateY(0.5);
    scene.add(cube);

    camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight);
    camera.position.set(0, 0, 3);
    scene.add(camera);

    renderer = new WebGLRenderer({
      canvas: canvasRef.current as unknown as HTMLCanvasElement,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    controls = new OrbitControls(camera, renderer.domElement);
    animate();
  };

  const handleSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  useEffect(() => {
    if (canvasRef.current) initScene();
    window.addEventListener("resize", handleSize, false);
    return () => {
      window.removeEventListener("resize", handleSize, false);
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="webgl"></canvas>;
};

export default Scene;
