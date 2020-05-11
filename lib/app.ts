import * as express from "express";
import * as bodyParser from "body-parser";
import { Router } from "./routes/Router";

class App {
  public app: express.Application;
  public routePrv: Router = new Router();

  constructor() {
    this.app = express();
    this.config();
  }

  // Server configs
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use("/", this.routePrv.getRouter());
  }
}

export default new App().app;
