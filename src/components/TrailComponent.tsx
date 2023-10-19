import React, { useRef, useEffect, useCallback } from 'react';
import { hexFromVar } from '../utils/style';
import gsap from 'gsap';

export const TrailComponent: React.FC<{ points: [number, number][] }> = ({ points }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const currentPointIndex = useRef<number>(0);
    const pointsToDraw = useRef<[number, number][]>([]);
    const absPointsRef = useRef<[number, number][]>([]);

    const progress = useRef<number>(0);

    const touchX = useRef<number>(0);
    const touchY = useRef<number>(0);
    const frequency = useRef<number>(0);

    const lastTime = useRef<number>(0);
    const blinkState = useRef<boolean>(true);
    const win = useRef<boolean>(false);

    const errColor = hexFromVar('--md-sys-color-error');
    const secondaryColor = hexFromVar('--md-sys-color-secondary');

    function shuffleArray<T>(array: T[]): T[] {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function absPointsFromRel(pointsArray: [number, number][], canvWidth: number, canvHeight: number) {
        const absPointsArr: [number, number][] = [];
        for (const point of pointsArray) {
            absPointsArr.push([canvWidth / 10 * point[0], canvHeight / 10 * point[1]]);
        }
        return absPointsArr;
    }

    function drawLine(progress: number, pointsArray: [number, number][]) {
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(pointsArray[0][0], pointsArray[0][1]);
            const currentPointAnim = Math.floor((progress) * pointsArray.length);

            if (currentPointAnim > 0) {
                for (let i = 0; i < currentPointAnim; i++) {
                    const point = pointsArray[i];
                    ctx.lineTo(point[0], point[1]);
                    ctx.moveTo(point[0], point[1]);
                }
                if (currentPointAnim < pointsArray.length) {
                    const relProgr = (progress - ((1 / pointsArray.length) * currentPointAnim)) * pointsArray.length;
                    const x = gsap.utils.interpolate(pointsArray[currentPointAnim - 1][0], pointsArray[currentPointAnim][0], relProgr);
                    const y = gsap.utils.interpolate(pointsArray[currentPointAnim - 1][1], pointsArray[currentPointAnim][1], relProgr);
                    ctx.lineTo(x, y);
                } /* else {
                    ctx.beginPath();
                    ctx.arc(pointsArray[pointsArray.length - 1][0], pointsArray[pointsArray.length - 1][1], 20, 0, Math.PI * 2);
                } */
                ctx.stroke();
            }

            for (let i = 0; i < pointsArray.length; i++) {
                const point = pointsArray[i];
                ctx.beginPath();
                ctx.arc(point[0], point[1], 20, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function winAnimation(pointsArray: [number, number][]) {
        gsap.to(progress, {
            current: 1,
            duration: 10,  // Durata dell'animazione in secondi
            onUpdate: () => drawLine(progress.current, pointsArray),  // Aggiorna il disegno in ogni frame
        });
    }

    const toucHandler = useCallback((rect: DOMRect, canvas: HTMLCanvasElement) => (e: TouchEvent) => {
        e.preventDefault();

        touchX.current = e.touches[0].clientX - rect.left;
        touchY.current = e.touches[0].clientY - rect.top;

        const dx = touchX.current - absPointsRef.current[currentPointIndex.current][0];
        const dy = touchY.current - absPointsRef.current[currentPointIndex.current][1];
        const distance = Math.sqrt(dx * dx + dy * dy);

        frequency.current = 15 - (distance / (Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height)) * 14.9);

        if (distance < 30) {
            if (currentPointIndex.current < absPointsRef.current.length - 1) {
                pointsToDraw.current.push(absPointsRef.current[currentPointIndex.current]);
                currentPointIndex.current++;
            } else if (currentPointIndex.current === absPointsRef.current.length - 1) {
                pointsToDraw.current.push(absPointsRef.current[currentPointIndex.current]);
                win.current = true;
                winAnimation([[canvas.width / 2, canvas.height / 2], ...absPointsFromRel(points, rect.width, rect.height)]);
            }
        }

    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const randomPoints = shuffleArray(points);
            absPointsRef.current = absPointsFromRel(randomPoints, rect.width, rect.height);
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctxRef.current = ctx;
                ctx!.fillStyle = secondaryColor;
                ctx!.lineWidth = 10;
                ctx!.strokeStyle = secondaryColor;
            }

            canvas.addEventListener('touchmove', toucHandler(rect, canvas), false);

            // winAnimation([[canvas.width / 2, canvas.height / 2], ...absPointsFromRel(points, rect.width, rect.height)]);
        }

        requestAnimationFrame(draw);

        return () => {
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                canvas.removeEventListener('touchmove', toucHandler(rect, canvas));
            }
        }
    }, [canvasRef]);

    function draw(now: number) {
        if (win.current) {
            return;
        }
        const ctx = ctxRef.current;
        const canvas = canvasRef.current;
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (now - lastTime.current >= (1000 / frequency.current)) {
                blinkState.current = !blinkState.current;
                lastTime.current = now;
            }

            if (blinkState.current) {
                ctx.fillStyle = errColor;
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, frequency.current * 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = secondaryColor;
            }

            if (pointsToDraw.current.length > 0) {
                const ptd = pointsToDraw.current;
                for (let i = 0; i < ptd.length; i++) {
                    const point = ptd[i];
                    ctx.beginPath();
                    ctx.arc(point[0], point[1], 20, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};
