
let audioCtx: AudioContext | null = null;
let masterVolume = 0.5;

export const setMasterVolume = (vol: number) => {
  masterVolume = Math.max(0, Math.min(1, vol));
};

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const playSwapSound = () => {
  if (masterVolume <= 0) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Quick high-pitch "zip" sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    
    // Scale volume
    const peakGain = 0.05 * masterVolume;
    gain.gain.setValueAtTime(peakGain, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    console.error('Audio play failed', e);
  }
};

export const playMatchSound = () => {
  if (masterVolume <= 0) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const now = ctx.currentTime;
    
    // Play a major triad (C5, E5, G5)
    const notes = [523.25, 659.25, 783.99]; 
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now); 
      
      const startTime = now + (i * 0.03);
      const peakGain = 0.08 * masterVolume;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });

    // Add a high frequency "sparkle"
    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);
    
    sparkle.type = 'triangle';
    sparkle.frequency.setValueAtTime(1200, now);
    sparkle.frequency.linearRampToValueAtTime(2000, now + 0.2);
    
    const sparklePeak = 0.02 * masterVolume;
    sparkleGain.gain.setValueAtTime(sparklePeak, now);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    
    sparkle.start(now);
    sparkle.stop(now + 0.2);

  } catch (e) {
    console.error('Audio play failed', e);
  }
};

export const playInvalidMoveSound = () => {
  if (masterVolume <= 0) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Low pitched "thud" or "buzz"
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    
    const peakGain = 0.03 * masterVolume;
    gain.gain.setValueAtTime(peakGain, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300;
    
    osc.disconnect(gain);
    osc.connect(filter);
    filter.connect(gain);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    console.error('Audio play failed', e);
  }
};
