loadAPI(7);

host.setShouldFailOnDeprecatedUse(true);

host.defineController("AKAI", "MAX25", "0.1", "0e1c6407-2583-41c4-b597-763ee49f7ba4", "sperryfl");

host.defineMidiPorts(3, 3);

if (host.platformIsWindows())
{
   // host.addDeviceNameBasedDiscoveryPair(["Input Port 0", "Input Port 1", "Input Port 2"], ["Output Port 0", "Output Port 1", "Output Port 2"]);
}
else if (host.platformIsMac())
{
   host.addDeviceNameBasedDiscoveryPair(["Akai MAX25 Port A", "Akai MAX25 Port B", "Akai MAX25 Remote"], ["Akai MAX25 Port A", "Akai MAX25 Port B", "Akai MAX25 Remote"]);
}
else if (host.platformIsLinux())
{
   // host.addDeviceNameBasedDiscoveryPair(["Input Port 0", "Input Port 1", "Input Port 2"], ["Output Port 0", "Output Port 1", "Output Port 2"]);
}

const MAX25_BTN_PLAY    = 0x5E;
const MAX25_BTN_STOP    = 0x5D;
const MAX25_BTN_REC     = 0x5F;
//const DEV_BTN_FWD     = 0x5C;
//const DEV_BTN_BACK    = 0x5B;
//const DEV_BTN_LOCATE  = 0x58;

var transport = null;

function init() 
{
   var inputPort = host.getMidiInPort(0);
   inputPort.setMidiCallback(onMidi0);
   
   noteIn = inputPort.createNoteInput("Midi Port 1", "8?????", "9?????", "B001??", "B040??", "D0????", "E0????");

   transport = host.createTransport();
   host.getMidiInPort(0).setMidiCallback(onMidi0);
   host.getMidiInPort(0).setSysexCallback(onSysex0);
   host.getMidiInPort(1).setMidiCallback(onMidi1);
   host.getMidiInPort(1).setSysexCallback(onSysex1);
   host.getMidiInPort(2).setMidiCallback(onMidi2);
   host.getMidiInPort(2).setSysexCallback(onSysex2);



   println("MAX25 initialized!");
}

// Called when a short MIDI message is received on MIDI input port 0.
function onMidi0(status, data1, data2) 
{
   printMidi(status, data1, data2)
}

// Called when a MIDI sysex message is received on MIDI input port 0.
function onSysex0(data) 
{
   // MMC Transport Controls:
   switch (data) {
      case "f07f7f0605f7":
         transport.rewind();
         break;
      case "f07f7f0604f7":
         transport.fastForward();
         break;
      case "f07f7f0601f7":
         transport.stop();
         break;
      case "f07f7f0602f7":
         transport.play();
         break;
      case "f07f7f0606f7":
         transport.record();
         break;
   }
}

// Called when a short MIDI message is received on MIDI input port 1.
function onMidi1(status, data1, data2) 
{
   // TODO: Implement your MIDI input handling code here.
}

// Called when a MIDI sysex message is received on MIDI input port 1.
function onSysex1(data) 
{

}
// Called when a short MIDI message is received on MIDI input port 2.
function onMidi2(status, data1, data2) 
{
   // TODO: Implement your MIDI input handling code here.
}

// Called when a MIDI sysex message is received on MIDI input port 2.
function onSysex2(data) 
{

}

function flush() 
{
   // TODO: Flush any output to your controller here.
}

function exit() 
{

}