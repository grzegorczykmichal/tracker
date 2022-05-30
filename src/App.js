import { useEffect, useRef, useState } from "react";
import { Synth, now, Transport, Loop, Oscillator } from "tone";

import "./styles.css";

//play a middle 'C' for the duration of an 8th note

const synth = new Synth().toDestination();

const Key = ({ note, black, className, onClick }) => {
  return (
    <button
      onClick={() => onClick(note)}
      onMouseDown={() => {
        synth.triggerAttackRelease(note, "8n");
      }}
      type="button"
      className={`key ${black ? "black" : "white"} ${className}`}
    >
      {note}
    </button>
  );
};

const Octave = ({ onClick }) => {
  return (
    <>
      <div className="octave" onMouseEnter={() => {}} onMouseLeave={() => {}}>
        <Key onClick={onClick} note="C4" className="c" synth={synth} />
        <Key
          onClick={onClick}
          note="C#4"
          className="cc"
          synth={synth}
          black={true}
        />
        <Key onClick={onClick} note="D4" className="d" synth={synth} />
        <Key onClick={onClick} note="D#4" className="dd" synth={synth} black />
        <Key onClick={onClick} note="E4" className="e" synth={synth} />
        <Key onClick={onClick} note="F4" className="f" synth={synth} />
        <Key onClick={onClick} note="F#4" className="ff" synth={synth} black />
        <Key onClick={onClick} note="G4" className="g" synth={synth} />
        <Key onClick={onClick} note="G#4" className="gg" synth={synth} black />
        <Key onClick={onClick} note="A4" className="a" synth={synth} />
        <Key onClick={onClick} note="A#4" className="aa" synth={synth} black />
        <Key onClick={onClick} note="B4" className="b" synth={synth} />
      </div>
    </>
  );
};

export default function App() {
  const [col, setCol] = useState([]);
  const collect = (note) => {
    setCol([...col, note]);
  };

  const isPlaying = useRef(false);
  const osc = useRef(new Oscillator().toDestination());

  const handlePlay = () => {
    // const n = now();
    // col.forEach((element, i) => {
    //   synth.triggerAttackRelease(element, "16n", n + i * 0.25);
    // });\
    if (!isPlaying.current) {
      Transport.scheduleRepeat((time) => {
        osc.current.start(time).stop(time + 0.1);
      }, "4n");
      Transport.start();
      isPlaying.current = true;
    } else {
      Transport.stop();
      Transport.clear();
      Transport.dispose();
      isPlaying.current = false;
    }
    // console.log(loop.current);
    // Transport.bpm.set(20);
    // Transport.start();
  };

  const handleBpm = (e) => {
    Transport.bpm.value = e.target.value;
  };

  return (
    <div className="App">
      <Octave onClick={collect} />
      <button onClick={handlePlay}>play</button>
      <div>sq {col.join("\u2018")}</div>
      <input onChange={handleBpm} />
    </div>
  );
}
