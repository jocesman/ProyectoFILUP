// config/dcCon.ts
import { MONGODB_URI } from "./envs";

const moongoose = require("mongoose");
const dcCon = async () => {
    //conexión a la BD
    await moongoose.connect(MONGODB_URI);
};

export default dcCon;