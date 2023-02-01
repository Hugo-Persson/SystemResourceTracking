import express from "express";
import { exit } from "process";
import prom from "prom-client";





class AvanzaConnector{
  private app = express()
  private port = Number(process.env.PORT) || 3000;
  private updateInterval = (Number(process.env.UPDATE_INTERVAL) || 60*5)*1000; // 1000 ms, total 5 min


  constructor(){
    this.init();
    prom.collectDefaultMetrics();
    
  }

 

 

 
  
  public async init(){
    this.app.listen(this.port,  "0.0.0.0", () => {
      console.log(`Example app listening on port ${this.port}`)
    })
    this.app.get("/metrics", this.metrics.bind(this));


    
  }



  private async metrics(req: express.Request, res: express.Response){

    res.contentType(prom.register.contentType);
    res.send(await prom.register.metrics());

  }
  public getEnv(prop: string) : string{
    return process.env[prop] || (()=> {console.log(`Missing ${prop}`); exit(-1);})();  
  }
}

new AvanzaConnector();