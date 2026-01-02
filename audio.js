const audioctx = new AudioContext();
let alarm = {}




/**
 * 
 * @param {Text} url 
 * @returns
 */
async function loadAudio(url) {

  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer()
  const audioBuffer = await audioctx.decodeAudioData(arrayBuffer);

  return audioBuffer;
}


async function loadAlarm(path) {

  const audioBuffer = await loadAudio(path);

  alarm.gainNode = audioctx.createGain();
  alarm.buffer = audioBuffer;

  return true; //とりあえず何か返す
}


function setAlarmVol() {
  const volume = timerEl.volumeBar.value;
  const mute = timerEl.muteCheckbox.checked;

  if(alarm.gainNode) alarm.gainNode.gain.value = mute ? 0 : (volume * 0.01);

  timerEl.volumeBarLabel.textContent = ("Volume: " + volume + "%");
}




loadAlarm("assets/audio/alarm.m4a").then(() => {
  setInterval(setAlarmVol, 30);
});