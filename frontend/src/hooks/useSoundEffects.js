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

    // Layer 1 — soft swish (low-mid paper sweep)
    const swishDur = 0.45;
    const swishBuf = ctx.createBuffer(1, Math.floor(sr * swishDur), sr);
    const swishData = swishBuf.getChannelData(0);
    for (let i = 0; i < swishData.length; i++) {
      const t = i / swishData.length;
      swishData[i] = (Math.random() * 2 - 1) * Math.pow(Math.sin(t * Math.PI), 1.2);
    }
    const swishSrc = ctx.createBufferSource();
    swishSrc.buffer = swishBuf;
    const lp1 = ctx.createBiquadFilter();
    lp1.type = 'lowpass'; lp1.frequency.value = 800;
    const bp1 = ctx.createBiquadFilter();
    bp1.type = 'bandpass'; bp1.frequency.value = 600; bp1.Q.value = 0.8;
    bp1.frequency.linearRampToValueAtTime(300, now + swishDur);
    const g1 = ctx.createGain();
    g1.gain.setValueAtTime(0.28, now);
    g1.gain.exponentialRampToValueAtTime(0.001, now + swishDur);
    swishSrc.connect(lp1); lp1.connect(bp1); bp1.connect(g1); g1.connect(ctx.destination);
    swishSrc.start(now);

    // Layer 2 — gentle thud (page landing)
    const thudDur = 0.15;
    const thudBuf = ctx.createBuffer(1, Math.floor(sr * thudDur), sr);
    const thudData = thudBuf.getChannelData(0);
    for (let i = 0; i < thudData.length; i++) {
      thudData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / thudData.length, 4);
    }
    const thudSrc = ctx.createBufferSource();
    thudSrc.buffer = thudBuf;
    const lp2 = ctx.createBiquadFilter();
    lp2.type = 'lowpass'; lp2.frequency.value = 300;
    const g2 = ctx.createGain();
    const thudT = now + 0.3;
    g2.gain.setValueAtTime(0.3, thudT);
    g2.gain.exponentialRampToValueAtTime(0.001, thudT + thudDur);
    thudSrc.connect(lp2); lp2.connect(g2); g2.connect(ctx.destination);
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
