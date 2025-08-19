//index.ts
import server from './server';
import { PORT } from './config/envs';
import dbCon from './config/dcCon';


dbCon().then((res) => {
    console.log("Conexión a la base de datos establecida");
    server.listen( PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });                 
}).catch((err) => {
    console.error("Error conectando a la base de datos");
    process.exit(1); 
});
