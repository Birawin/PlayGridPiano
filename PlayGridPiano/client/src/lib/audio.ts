// Utility to generate frequencies for piano notes
const A4 = 440; // A4 note frequency in Hz

const getNoteFrequency = (note: number): number => {
  // 12th root of 2 raised to the power of semitones from A4
  return A4 * Math.pow(2, (note - 69) / 12);
};

export class PianoSound {
  private context: AudioContext | null;
  private gainNode: GainNode | null;

  constructor() {
    this.context = null;
    this.gainNode = null;
    this.initializeAudio();
  }

  private initializeAudio() {
    try {
      this.context = new AudioContext();
      this.gainNode = this.context.createGain();
      this.gainNode.connect(this.context.destination);
      this.gainNode.gain.value = 0.2; // Slightly increased volume
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  playNote(note: number, duration: number = 0.5) {
    if (!this.context || !this.gainNode) {
      this.initializeAudio();
    }

    if (!this.context || !this.gainNode) {
      console.error('Audio context not available');
      return;
    }

    try {
      const oscillator = this.context.createOscillator();
      const noteGain = this.context.createGain();

      oscillator.connect(noteGain);
      noteGain.connect(this.gainNode);

      oscillator.type = 'sine';
      oscillator.frequency.value = getNoteFrequency(note);

      // Enhanced envelope for better sound
      const now = this.context.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(1, now + 0.01);
      noteGain.gain.linearRampToValueAtTime(0.7, now + 0.1);
      noteGain.gain.linearRampToValueAtTime(0, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (error) {
      console.error('Error playing note:', error);
    }
  }

  // Resume audio context on user interaction
  resume() {
    if (this.context?.state === 'suspended') {
      this.context.resume().catch(console.error);
    } else if (!this.context) {
      this.initializeAudio();
    }
  }
}

export const pianoSound = new PianoSound();