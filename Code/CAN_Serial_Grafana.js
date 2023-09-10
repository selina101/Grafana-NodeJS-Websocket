const {WebSocketServer} = require('ws')
//const {SerialPort} = require('serialport')
// const { createRawChannel } = require('socketcan');

// var channel = createRawChannel("can0", true);
const wss = new WebSocketServer({ port: 8080 });


// If grafana connection
wss.on('connection', function connection(ws) {

	ws.on('error', console.error);
	ws.on('message', function message(data) {
		console.log('received: %s', data);
	});


  // LOG CAN MESSAGES
  /*channel.addListener("onMessage", function(msg) 
  { 
    var dataCAN=msg.data;
    var idCAN=msg.id;

    // ATTENTION! LES ID SBG SONT EN HEXA LES IDS DANS LE CODE SONT EN DECIMAL

    if (idCAN==304) //IF ID IS STATUS INFO
    {
      console.log("STATUS INFO");
      console.log(msg);
      var dataINT= dataCAN.readUInt16LE(0);
      console.log("msg data" + dataINT);
      ws.send(JSON.stringify({ StatusInFO: dataINT })); 
    }

    if (idCAN==308) //IF ID IS POSITION INFO 0x134
    {
      console.log("POSITION  INFO");
      var latitude = msg.data.readUInt32LE(0);
      var longitude = msg.data.readUInt32LE(4);
      latitude=latitude/10000000
      longitude=longitude/10000000
      console.log("latitude : " +latitude );  
      console.log("longitude : " + longitude);  

      ws.send(JSON.stringify({ latitude: latitude })); 
      ws.send(JSON.stringify({ longitude: longitude })); 
    }

    if (idCAN==313) //IF ID IS VELOCITY INFO IN BODY REFERENCE
    {
      console.log("VELOCITY INFO");
      var SpeedN = msg.data.readUInt16LE(0);
      var SpeedE = msg.data.readUInt16LE(2);
      var SpeedD = msg.data.readUInt16LE(4);
      
      SpeedN=SpeedN/100; //Speed in m/s
      SpeedE=SpeedE/100; //Speed in m/s
      SpeedD=SpeedD/100; //Speed in m/s

      SpeedN=SpeedN*1.94384; //Speed in knots
      SpeedE=SpeedE*1.94384; //Speed in knots
      SpeedD=SpeedD*1.94384; //Speed in knots

      console.log("SpeedN : " +SpeedN );
      console.log("SpeedE : " +SpeedE );
      console.log("SpeedD : " +SpeedD );
      
      ws.send(JSON.stringify({ SpeedN: SpeedN })); 
      ws.send(JSON.stringify({ SpeedE: SpeedE }));
      ws.send(JSON.stringify({ SpeedD: SpeedD }));
            
    }

    if (idCAN==306) //0x132 --> RollPitchYaw
    {
      console.log("ROLL, Pitch, YAW");
      var Roll = msg.data.readUInt16LE(0);
      var Pitch = msg.data.readUInt16LE(2);
      var Yaw = msg.data.readUInt16LE(4);

      Roll=Roll/10000;
      Pitch=Pitch/10000;
      Yaw=Yaw/10000;



      console.log("Roll" + Roll);
      console.log("Pitch" + Pitch);
      console.log("Yaw" + Yaw);

      ws.send(JSON.stringify({Roll: Roll}));
    }



  } );
  
  //Start CAN
  channel.start();
*/
  // Je te laisse les exmples ci-dessous, si tu veux voir comment faire 
  // SEND RANDOM DATA TO GRAFANA
  
  let count = 0;
  let direction=0;
  setInterval(function () {
    ws.send(JSON.stringify({ noeuds: count }));
    // console.log("count: " + count);
    if(direction==0)
    {
    	count=count+0.1;
    }
    else{
    	count=count-0.1;
    }
    
    if (count > 80) {
      direction=1;
    }
    if (count < 1){
    	direction=0;
    }
  }, 100);



  //SEND SERIAL DATA TO GRAFANA

  // lineReader.on('line', function (line) {
  //   // console.log("sensor" +line);
  //   line=parseInt(line);
  //   // console.log("Typeof data: " + typeof line);
  //   ws.send(JSON.stringify({ data: line }));
  // });
  
 
	console.log('New connection');
});
