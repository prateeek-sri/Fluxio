"use client";
import { useEffect, useRef } from 'react';

export default function GameCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Base dark grid render loop mockup
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#38bdf8';
        ctx.font = '20px sans-serif';
        ctx.fillText('🎮 Cyber Warfare Grid Base [2D Canvas UI]', 50, 50);
    }, []);

    return <canvas ref={canvasRef} width={800} height={600} style={{ border: '2px solid #1e293b', borderRadius: '8px' }} />;
}