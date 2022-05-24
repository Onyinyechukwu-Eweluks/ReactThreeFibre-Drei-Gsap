import React, { useEffect, useRef } from 'react';
import { angleInRad } from './angle';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'
import gsap from 'gsap';

const Three = () => {

    const orbitControls = useRef(null)
    const ballRef = useRef(null)

    useFrame((state) => {
        let { x, y } = state.mouse
        if (!!orbitControls.current) {
            orbitControls.current.setAzimuthalAngle(-x * angleInRad(45))
            orbitControls.current.setPolarAngle((y + 0.5) * angleInRad(60))
            orbitControls.current.update()
        }
    })

    useEffect(() => {
        console.log(ballRef.current)

         // Timeline
         const timeline = gsap.timeline({ paused: true });

         // x-axis motion
         timeline.to(ballRef.current.position, {
             x: 1,
             duration: 2,
             ease: "power2.out"
         });

         // y-axis motion
         timeline.to(ballRef.current.position, {
             y: 0.5,
             duration: 1,
             ease: "bounce.out"
         }, "<");

         // Play
         timeline.play();
    }, [ballRef.current])

    // useEffect(() => {
    //     if (!!orbitControls.current) {
    //         console.log(orbitControls.current)
    //     }
    // }, [orbitControls.current])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls ref={orbitControls} minPolarAngle={angleInRad(60)} maxPolarAngle={angleInRad(80)} />
          
            {/* Ball */}
            <mesh position={[-2,1.5,0]} castShadow ref={ballRef} >
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial metalness={0.6} roughness={0.2} />
            </mesh>


            {/* Floor */}
            <mesh rotation={[-(angleInRad(90)),0,0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>
            {/* <mesh rotation={[-(angleInRad(90)),0,0]} receiveShadow>
                <planeGeometry args={[7, 7]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh> */}

            {/* light */}
            <ambientLight args={["#ffffff", 0.05]} />

            <spotLight args={["#ffffff", 1.5, 7, angleInRad(45), 0.4]} position={[-3, 1, 0]} castShadow />

            <Environment background >
  <mesh scale={100}>
    <sphereGeometry args={[1, 64, 64]} />
    <meshBasicMaterial color="#1ea3d8" side={THREE.BackSide} />
  </mesh>
</Environment>
        </>
    );
};

export default Three;