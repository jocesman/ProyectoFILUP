// src/server.ts
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import api from "./routes";
import chalk from "chalk";

const server = express();
server.use(cors());
server.use(express.json());

// Middleware para mostrar el método HTTP
server.use((req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime(); // tiempo inicial

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const duration = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2); // ms

    const time = new Date().toISOString();
    const method = chalk.blue(req.method);
    const url = chalk.green(req.originalUrl);
    const status =
      res.statusCode >= 500
        ? chalk.red(res.statusCode)
        : res.statusCode >= 400
        ? chalk.yellow(res.statusCode)
        : chalk.cyan(res.statusCode);

    console.log(
      `[${time}] ${method} ${url} → ${status} (${duration} ms)`
    );
  });

  next();
});

server.use("/api", api);

export default server;
