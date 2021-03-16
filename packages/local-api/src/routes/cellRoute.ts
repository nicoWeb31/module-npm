import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell{
    id: string;
    content: string;
    type: 'text' | 'code';
}

export const createCellRouter = (fileName: string, dir: string) :any => {
    const router = express.Router();
    router.use(express.json());


    const fullPath = path.join(dir, fileName)

    router.get("/cells", async (req, res, next) => {
        try {
            //read file
            const result = await fs.readFile(fullPath, {encoding : 'utf8'});
            res.send(JSON.parse(result));
        } catch (error) {
            if(error.code === 'ENOENT') {
                //add code to create a file and add default cells 
                await fs.writeFile(fullPath, '[]', 'utf8');
                res.send([]);
            }else {
                throw error;
            }
        }

        //if read throws an error 

        //inspect the error, see if it says that the file doesn't exist
        //parse list of cells out of it
        //send list of cells
    });

    router.post("/cells", async (req, res, next) => {
        //take the list of cells from request objec
        //seialze them
        const { cells }: {cells: Cell[]} = req.body;
        await fs.writeFile(fullPath,JSON.stringify(cells), 'utf8');

        res.send({status: 'ok'})

        //Write the cells in to the file
    });
};
