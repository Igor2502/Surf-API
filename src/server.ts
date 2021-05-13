import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import './util/module-alias';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';
import * as database from '@src/database';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpres();
    this.setupController();
    await this.databaseSetup();
  }

  private setupExpres(): void {
    this.app.use(bodyParser.json());
  }

  private setupController(): void {
    const forecastController = new ForecastController();
    this.addControllers([forecastController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }
}
