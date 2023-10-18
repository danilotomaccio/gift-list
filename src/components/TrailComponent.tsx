import React, { useRef, useEffect, useState, useCallback } from 'react';
import { rgbaFromVar } from '../utils/style';

export const TrailComponent: React.FC<{ points: [number, number][] }> = ({ points }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let prevPos = useRef({ x: 0, y: 0 });
    let currentPos = useRef({ x: 0, y: 0 });
    let lastFlash = useRef(0);
    let flashFreq = useRef(0);
    let flashOn = useRef(false);
    const drawing = useRef(false);
    const bgColor = rgbaFromVar('--md-sys-color-background', .1);

    const [currentPointIndex, setCurrentPointIndex] = useState(0);

    const calculateDistance = (pos1: { x: number, y: number }, pos2: [number, number]) => {
        return Math.hypot(pos2[0] - pos1.x, pos2[1] - pos1.y);
    };

    const fadeTrail = useCallback((ctx: CanvasRenderingContext2D) => {
        if (!ctx) return;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }, [bgColor]);


    let accTime = 0;
    let spenTime = 0;
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (drawing.current) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Pulisci il canvas

            // Disegna cerchi nei punti specificati
            for (const point of points) {
                ctx.beginPath();
                ctx.arc(point[0], point[1], 10, 0, 2 * Math.PI);  // Disegna un cerchio con raggio di 10
                ctx.fillStyle = 'red';
                ctx.fill();
            }

            // Disegna cerchio centrale se flashOn è true
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const flashElapsedTime = performance.now() - lastFlash.current;

            if (flashElapsedTime >= flashFreq.current) {
                flashOn.current = !flashOn.current;
                lastFlash.current = flashElapsedTime;
            }

            if (flashOn.current) {
                console.log(`acc: ${performance.now() - spenTime}`);
                accTime = performance.now();
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
                ctx.fillStyle = 'blue';
                ctx.fill();
            } else {
                console.log(`spen: ${performance.now() - accTime}`);
                spenTime = performance.now();
            }

            const pPos = prevPos.current;
            const cPos = currentPos.current;

            if (pPos.x !== cPos.x && pPos.y !== cPos.y) {
                ctx.beginPath();
                ctx.moveTo(pPos.x, pPos.y);
                ctx.lineTo(cPos.x, cPos.y);
                ctx.strokeStyle = 'blue';
                ctx.lineWidth = 5;
                ctx.stroke();
                prevPos.current = cPos;
            }
        }

        // fadeTrail(ctx);  // Chiamata a fadeTrail
    }, [points, fadeTrail]);

    const update = useCallback(() => {
        draw();
        requestAnimationFrame(update);
    }, [draw]);

    const drawTrail = (event: MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas || !drawing) return;
        const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;
        const rect = canvas.getBoundingClientRect();
        const posX = clientX - rect.left;
        const posY = clientY - rect.top;

        currentPos.current = { x: posX, y: posY };

        if (currentPointIndex < points.length) {
            const distance = calculateDistance(prevPos.current, points[currentPointIndex]);

            flashFreq.current = distance * 10;

            if (distance < 50) {
                setCurrentPointIndex(prevIndex => prevIndex + 1);
            }
        }
    };

    const startDrawing = (event: MouseEvent | TouchEvent) => {
        drawing.current = true;

        const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
            currentPos.current = { x: clientX - rect.left, y: clientY - rect.top };
        }
    };

    const endDrawing = () => {
        drawing.current = false;
    };

    useEffect(() => {
        requestAnimationFrame(update);
    });


    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mouseup', endDrawing);
            canvas.addEventListener('mousemove', drawTrail);
            canvas.addEventListener('touchstart', startDrawing);
            canvas.addEventListener('touchend', endDrawing);
            canvas.addEventListener('touchmove', drawTrail);
        }

        /* const fadeInterval = setInterval(() => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx) {
                fadeTrail(ctx);
            }
        }, 10); */

        return () => {
            if (canvas) {
                canvas.removeEventListener('mousedown', startDrawing);
                canvas.removeEventListener('mouseup', endDrawing);
                canvas.removeEventListener('mousemove', drawTrail);
                canvas.removeEventListener('touchstart', startDrawing);
                canvas.removeEventListener('touchend', endDrawing);
                canvas.removeEventListener('touchmove', drawTrail);
            }
            // clearInterval(fadeInterval);
        };
    }, [fadeTrail]);


    useEffect(() => {
        const handleTouchMove = (event: TouchEvent) => {
            event.preventDefault();
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
        }

    }, []);

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};
