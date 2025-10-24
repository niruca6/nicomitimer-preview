let isWakeLockSupported = false;
let isStayAwakeEnabled = false;
let wakeLock = null;


/*-----------------------------関数-*/


function checkWakeLockSupport() {
  if ("wakeLock" in navigator) {
    isWakeLockSupported = true;
    console.log("ブラウザーはWakeLock API に対応しています。");

    window.alert("ブラウザーはWakeLock API に対応しています。")
  } else {
    hideStayAwakeCheckbox();
    console.log("ブラウザーはロックに対応していません。");
  }
}


async function requestWakeLock() {
  if(!isWakeLockSupported) return;

  try {
    wakeLock = await navigator.wakeLock.request("screen");
    window.alert("WakeLock APIを呼び出しました。");

  } catch (e) {
    console.log(`${e.name}, ${e.message}`);
  }
}


function asyncStayAwake() {

  setTimeout(() => {

    if (timerEl.stayAwakeCheckbox.checked) {
      isStayAwakeEnabled = true;
      requestWakeLock();
    } else {
      isStayAwakeEnabled = false;
      wakeLock = null;

      console.log("WakeLock APIを解除しました。");
    }

  }, 30);

}


function hideStayAwakeCheckbox() {
  timerEl.stayAwakeCheckbox.style.display = "none";
  timerEl.stayAwakeCheckboxLabel.style.display = "none";
}


/*-----------------------------イベント-*/


document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if(isStayAwakeEnabled) requestWakeLock();
  } else {
    wakeLock = null;
  }
});


/*-----------------------------実行-*/


checkWakeLockSupport();