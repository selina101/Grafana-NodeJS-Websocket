const {WebSocketServer} = require('ws')
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {

	ws.on('error', console.error);
	ws.on('message', function message(data) {
		console.log('received: %s', data);
	});

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

  let count_2 = 0;
  let direction_2=0;
  setInterval(function () {
    ws.send(JSON.stringify({ count_2: count_2 }));
    // console.log("count: " + count);
    if(direction_2==0)
    {
    	count_2=count_2+1;
    }
    else{
    	count_2=count_2-1;
    }
    
    if (count_2 > 150) {
      direction_2=1;
    }
    if (count_2 < 1){
    	direction_2=0;
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