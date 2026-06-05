import { useRef, useCallback } from 'react';

export const useSoundEffects = () => {
  const enabledRef = useRef(localStorage.getItem('bookSound') !== 'off');
  const ctxRef = useRef(null);

  const getCtx = async () => {
    if (!enabledRef.current) return null;
    if (!ctxRef.current)
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    if (ctxRef.current.state === 'suspended')
      await ctxRef.current.resume();
    return ctxRef.current;
  };

  const playPageTurn = useCallback(async () => {
    const ctx = await getCtx(); if (!ctx) return;
    const sr = ctx.sampleRate;
    const now = ctx.currentTime;

    // ── LAYER 1: Soft page turn — parchment rustle (shaped noise, mid frequencies)
    const rustle = ctx.createBuffer(2, Math.floor(sr * 0.55), sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = rustle.getChannelData(ch);
      for (let i = 0; i < d.length; i++) {
        const t = i / d.length;
        // envelope: fast attack, sustain, slow tail
        const env = Math.pow(Math.sin(t * Math.PI), 0.7) * (1 - t * 0.4);
        d[i] = (Math.random() * 2 - 1) * env;
      }
    }
    const rustleSrc = ctx.createBufferSource();
    rustleSrc.buffer = rustle;
    // Band the noise to paper frequencies (400–3000 Hz)
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 400;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 3000;
    // Sweep the bandpass to mimic paper moving
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.Q.value = 1.2;
    bp.frequency.setValueAtTime(1800, now);
    bp.frequency.exponentialRampToValueAtTime(600, now + 0.45);
    const rustleGain = ctx.createGain();
    rustleGain.gain.setValueAtTime(0, now);
    rustleGain.gain.linearRampToValueAtTime(0.22, now + 0.04);
    rustleGain.gain.setValueAtTime(0.22, now + 0.25);
    rustleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    rustleSrc.connect(hp); hp.connect(bp); bp.connect(lp); lp.connect(rustleGain);
    rustleGain.connect(ctx.destination);
    rustleSrc.start(now);

    // ── LAYER 2: Magical whoosh — pitched sweep (sine + sawtooth blend)
    const whooshOsc1 = ctx.createOscillator();
    const whooshOsc2 = ctx.createOscillator();
    whooshOsc1.type = 'sine';
    whooshOsc2.type = 'sawtooth';
    // Sweep pitch upward then settle — like magic energy releasing
    whooshOsc1.frequency.setValueAtTime(180, now);
    whooshOsc1.frequency.exponentialRampToValueAtTime(520, now + 0.18);
    whooshOsc1.frequency.exponentialRampToValueAtTime(320, now + 0.45);
    whooshOsc2.frequency.setValueAtTime(200, now);
    whooshOsc2.frequency.exponentialRampToValueAtTime(480, now + 0.2);
    whooshOsc2.frequency.exponentialRampToValueAtTime(280, now + 0.45);
    // Sawtooth is harsh — tame with lowpass
    const whooshFilter = ctx.createBiquadFilter();
    whooshFilter.type = 'lowpass';
    whooshFilter.frequency.setValueAtTime(600, now);
    whooshFilter.frequency.exponentialRampToValueAtTime(200, now + 0.45);
    const whooshGain = ctx.createGain();
    whooshGain.gain.setValueAtTime(0, now);
    whooshGain.gain.linearRampToValueAtTime(0.09, now + 0.06);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
    whooshOsc1.connect(whooshGain);
    whooshOsc2.connect(whooshFilter); whooshFilter.connect(whooshGain);
    whooshGain.connect(ctx.destination);
    whooshOsc1.start(now); whooshOsc1.stop(now + 0.5);
    whooshOsc2.start(now); whooshOsc2.stop(now + 0.5);

    // ── LAYER 3: Soft bell chime — pure sine harmonics at page land
    // Three harmonically related notes: root + major third + fifth
    const chimeT = now + 0.38; // fires as page lands
    const chimeNotes = [523.25, 659.25, 783.99]; // C5, E5, G5 — a bright major chord
    chimeNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      // Slight detune for warmth
      osc.detune.value = (i - 1) * 4;
      const chimeGain = ctx.createGain();
      const onset = chimeT + i * 0.045; // stagger each note slightly
      chimeGain.gain.setValueAtTime(0, onset);
      chimeGain.gain.linearRampToValueAtTime(0.1 - i * 0.02, onset + 0.012);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, onset + 1.1);
      // Gentle reverb-like effect using delay feedback
      const delay = ctx.createDelay(0.5);
      delay.delayTime.value = 0.12 + i * 0.04;
      const fbGain = ctx.createGain();
      fbGain.gain.value = 0.25;
      const chimeLp = ctx.createBiquadFilter();
      chimeLp.type = 'lowpass'; chimeLp.frequency.value = 4000;
      osc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeGain.connect(delay); delay.connect(fbGain);
      fbGain.connect(chimeLp); chimeLp.connect(delay);
      chimeLp.connect(ctx.destination);
      osc.start(onset); osc.stop(onset + 1.4);
    });

    // ── LAYER 4: Page thud — low percussive hit as page settles
    const thudBuf = ctx.createBuffer(1, Math.floor(sr * 0.12), sr);
    const thudData = thudBuf.getChannelData(0);
    for (let i = 0; i < thudData.length; i++)
      thudData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / thudData.length, 5);
    const thudSrc = ctx.createBufferSource();
    thudSrc.buffer = thudBuf;
    const thudLp = ctx.createBiquadFilter();
    thudLp.type = 'lowpass'; thudLp.frequency.value = 280;
    const thudGain = ctx.createGain();
    const thudT = now + 0.36;
    thudGain.gain.setValueAtTime(0.18, thudT);
    thudGain.gain.exponentialRampToValueAtTime(0.001, thudT + 0.12);
    thudSrc.connect(thudLp); thudLp.connect(thudGain); thudGain.connect(ctx.destination);
    thudSrc.start(thudT);
  }, []);

  const playHover = useCallback(async () => {
    const ctx = await getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.frequency.value = 440;
    g.gain.setValueAtTime(0.05, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.03);
  }, []);

  const playWaxSeal = useCallback(async () => {
    const ctx = await getCtx(); if (!ctx) return;
    // Low thud
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.frequency.value = 80;
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(g); g.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.12);
    // Crackle
    const size = Math.floor(ctx.sampleRate * 0.06);
    const buf  = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const ng  = ctx.createGain();
    const t   = ctx.currentTime + 0.08;
    ng.gain.setValueAtTime(0.2, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    src.connect(ng); ng.connect(ctx.destination);
    src.start(t);
  }, []);

  const setEnabled = useCallback((val) => {
    enabledRef.current = val;
    localStorage.setItem('bookSound', val ? 'on' : 'off');
  }, []);

  const isEnabled = () => enabledRef.current;

  return { playPageTurn, playHover, playWaxSeal, setEnabled, isEnabled };
};
