# VideoKiosk
This code shows how we can limit user interface of Cisco video devices, so that it can be used as Video Kiosk in remote office of a bank, for example. 
Customers of a bank can use video device to have video communication with agent, but we want to make it simple for use and limit some default options like: place video call to any SIP URI destination, start whiteboarding, join Webex session, change audio settings or place video on mute. 
We also want to push customized warning messages to video devices if customer tries to change audio settings or place call on audio mute. 
The code was created based on examples available at https://roomos.cisco.com/macros and is used for cloud registered device. 
For on prem registered device, there is no Video Mute midcall button, so following line should be deleted from the code:
xapi.config.set('UserInterface Features Call VideoMute', 'Hidden');
For on prem registered device, if you want to remove Keypad, Hold and Transfer buttons from user interface when device has active call and you don't want to have on screen display for encryption indicator, following code lines should be used: 
xapi.config.set('UserInterface Features Call Keypad', 'Hidden');
xapi.config.set('UserInterface Features Call MidCallControls', 'Hidden');
xapi.config.set('UserInterface OSD EncryptionIndicator', 'AlwaysOff');
