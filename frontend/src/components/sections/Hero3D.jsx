import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- Utility: Generate Points from Text using HTML5 Canvas ---
const getPointsFromText = (text, size = 100, radius = 2) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 500; // Resolution
    const height = 200;
    canvas.width = width;
    canvas.height = height;

    // Draw text
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height); // Clear properly
    ctx.fillStyle = '#000000';
    ctx.font = `bold ${size}px Arial`; // Using system font
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const points = [];

    // Scan for dark pixels (our text)
    // Reduce density by stepping > 1, random offsets help with organic feel
    const step = 4;
    for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
            const index = (Math.floor(y) * width + Math.floor(x)) * 4;
            // If pixel is darker than threshold, it's part of the text
            if (data[index] < 128) {
                // Normalize coordinates to -radius to +radius range
                const px = (x / width - 0.5) * radius * 4; // Scale width
                const py = -(y / height - 0.5) * radius * 1.5; // Scale height (flip Y)
                const pz = (Math.random() - 0.5) * 0.2; // Slight depth
                points.push(new THREE.Vector3(px, py, pz));
            }
        }
    }
    return points;
};

// Generate a random cloud sphere as fallback/initial
const getSpherePoints = (count, radius = 1.5) => {
    const points = [];
    for (let i = 0; i < count; i++) {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        points.push(new THREE.Vector3(
            radius * Math.cos(theta) * Math.sin(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(phi)
        ));
    }
    return points;
};

const MorphingParticles = () => {
    const ref = useRef();
    const { viewport } = useThree();

    const words = ["AI", "BackEnd", "Football", "ML", "Data", "WebDev", "Basketball", "Gaming"];
    const [index, setIndex] = useState(0);

    // Config
    const particleCount = 2000;
    const clickZoneRef = useRef(null);

    // Pre-calculate target positions for all words
    const targets = useMemo(() => {
        const sphere = getSpherePoints(particleCount);

        const wordPoints = words.map(word => {
            const pts = getPointsFromText(word, 80, 2);
            // If text has fewer points than particleCount, fill remainder with random sphere points (background noise)
            // If more, truncate.
            const mixed = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount; i++) {
                let v;
                if (i < pts.length) {
                    v = pts[i];
                } else {
                    // Fallback to a random dispersed point for unused particles
                    const r = 3 + Math.random() * 2;
                    const theta = Math.random() * 2 * Math.PI;
                    const phi = Math.acos(2 * Math.random() - 1);
                    v = new THREE.Vector3(
                        r * Math.sin(phi) * Math.cos(theta),
                        r * Math.sin(phi) * Math.sin(theta),
                        r * Math.cos(phi)
                    );
                }
                mixed[i * 3] = v.x;
                mixed[i * 3 + 1] = v.y;
                mixed[i * 3 + 2] = v.z;
            }
            return mixed;
        });

        const spherePacked = new Float32Array(particleCount * 3);
        sphere.forEach((v, i) => {
            spherePacked[i * 3] = v.x;
            spherePacked[i * 3 + 1] = v.y;
            spherePacked[i * 3 + 2] = v.z;
        });

        // Add sphere as the 'initial' state if wanted, or just cycle words
        return wordPoints;
    }, []);

    // Current interpolation state
    // We need a stable buffer for the geometry
    const positions = useMemo(() => new Float32Array(particleCount * 3), []);

    // Initialize positions with the first target
    useMemo(() => {
        const t = targets[0];
        for (let i = 0; i < t.length; i++) positions[i] = t[i];
    }, []);

    useFrame((state, delta) => {
        if (!ref.current) return;

        const currentPositions = ref.current.geometry.attributes.position.array;
        const targetPositions = targets[index];

        // Lerp factor
        const speed = 4 * delta;

        for (let i = 0; i < particleCount * 3; i++) {
            currentPositions[i] += (targetPositions[i] - currentPositions[i]) * speed;
        }

        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    const handleClick = () => {
        setIndex((prev) => (prev + 1) % words.length);
    };

    return (
        <group onClick={handleClick}>
            {/* Invisible click catcher if needed, but Points onClick works in recent Drei/Fiber versions usually.
               However, points can be hard to click if small. Let's add a transparent plane. */}
            <mesh visible={false} scale={[5, 5, 1]} position={[0, 0, 0]}>
                <planeGeometry />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#a855f7"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
};

const Hero3D = () => {
    return (
        <div className="w-full h-full cursor-pointer" title="Click to change | Drag to rotate">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <MorphingParticles />
                <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default Hero3D;
