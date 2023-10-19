export function simulatePWM(frequency: number, dutyCycle: number, duration: number) {
    const period = 1000 / frequency;
    const onTime = period * dutyCycle;
    const offTime = period - onTime;
    
    const pattern: number[] = [];
    
    for (let time = 0; time < duration; time += period) {
      pattern.push(onTime, offTime);
    }
    
    navigator.vibrate(pattern);
    console.log(pattern);
    
  }
  