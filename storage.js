let isStorageAvailable = storageAvailability("localStorage");
let isPreferencesInitialized = false;


/*-----------------------------関数-*/


function storageAvailability(type) {
  let storage;
  try {
    storage = window[type];
    storage.setItem("test", "1");
    storage.removeItem("test");

    return true;
  } catch (e) {
    return false;
  }
}


function loadPreferences(type) {
  console.log("NT: Importing Preferences.");

  if (type == "storage") {
    loadPreferencesByStorage();
  }
  else if (type == "link") {
    loadPreferencesByLink();
  }
}


function loadPreferencesByStorage() {
  const preferences = JSON.parse(localStorage.getItem("preferences"));

  timerEl.volumeBar.value = preferences.alarmVolume;
  timerEl.muteCheckbox.checked = preferences.isMuted;
  timerEl.autoStopCheckbox.checked = preferences.isAutoStopEnabled;
  timerEl.stayAwakeCheckbox.checked = preferences.isStayAwakeEnabled;

  asyncMute();
  asyncAutoStopMode();
  asyncStayAwake();

  console.log("NT: storage loaded.");
}


function loadPreferencesByLink() {
  //記述
}


function savePreferences(mode) {
  if (mode !== "default" && !isPreferencesInitialized) return;

  const preferences = {
    alarmVolume: timerEl.volumeBar.value,
    isMuted: timerEl.muteCheckbox.checked,
    isAutoStopEnabled: timerEl.autoStopCheckbox.checked,
    isStayAwakeEnabled: timerEl.stayAwakeCheckbox.checked
  }

  console.log(preferences.alarmVolume);
  localStorage.setItem("preferences", JSON.stringify(preferences));

  console.log("NT: Preferences Saved.");
}


function initializePreferences() {
  if (!isStorageAvailable) return;

  if (localStorage.getItem("preferences")) { //ストレージに設定が保存されていれば読み込む
    console.log("NT: Loading Preferences.");
    loadPreferences("storage");

  } else { //なければ初期設定を保存
    console.log("NT: Saving Default.");
    savePreferences("default");

  }

  isPreferencesInitialized = true;
}


/*-----------------------------実行-*/


timerEl.volumeBar.onchange = savePreferences;
timerEl.muteCheckbox.onchange = savePreferences;
timerEl.autoStopCheckbox.onchange = savePreferences;
timerEl.stayAwakeCheckbox.onchange = savePreferences;

initializePreferences();