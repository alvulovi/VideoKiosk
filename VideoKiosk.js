import xapi from 'xapi';

const MYSPEED_DIAL_NUMBER = 'videoagent@balkan.rooms.webex.com';

// Hide user interface menu, default buttons (Call Start, Whiteboard and JoinWebex) and video mute buton during call: 

xapi.config.set('UserInterface SettingsMenu Visibility', 'Hidden');
xapi.config.set('UserInterface Features Call Start', 'Hidden');
xapi.config.set('UserInterface Features Whiteboard Start', 'Hidden');
xapi.config.set('UserInterface Features Call JoinWebex', 'Hidden');
xapi.config.set('UserInterface Features Call VideoMute', 'Hidden');

// Dial specific SIP URI once speed dial button is pressed:
xapi.event.on('UserInterface Extensions Page Action', (event) => {
    if(event.Type == 'Opened' && event.PageId == 'speed_dial'){
         xapi.command("dial", {Number: MYSPEED_DIAL_NUMBER});
    }
});

// Display alert message if mute is pressed and remove alert message if call is unmutted:

xapi.status.on('Audio Microphones Mute', state => {
if (state === "On") {
xapi.command('UserInterface Message Alert Display', {
Title: 'Warning:',
Text: 'Microfon is muted',
});
}else if (state === "Off") {
xapi.command('UserInterface Message Alert clear');

}
});

/* Limit the volume of a video system to a user definede level.
 * Show a message if someone tries to change audio volume.
 */


const FIXED_VOLUME = 70;

function setVolume(vol) {
  xapi.Command.Audio.Volume.Set({ Level: vol });
}

function alert(title, text, duration = 5) {
  xapi.Command.UserInterface.Message.Alert.Display({
    Title: title,
    Text: text,
    Duration: duration,
  });
}

function limitVolume(volume) {
  if (volume != FIXED_VOLUME) {
    setVolume(FIXED_VOLUME);
    alert(
      'Warning:',
      'Volume settings can not be changed!',
    );
  }
}

async function checkInitialVolume() {
  try {
    const volume = await xapi.Status.Audio.Volume.get();
    limitVolume(volume);
  } catch (error) {
    console.error(error);
  }
}

function init() {
  xapi.Status.Audio.Volume.on((volume) => {
    console.log(`Volume changed to: ${volume}`);
    limitVolume(volume);
  });
  checkInitialVolume();
}

init();