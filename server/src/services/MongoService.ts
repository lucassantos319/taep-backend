import {MongoClient} from 'mongodb'

class MongoService {

    async AddAtividade(atividadeId,userIdCreator,projetoId,data){
        
        const uri = "mongodb+srv://atividades_adm:atv123456@atividadetaep.tgnau.mongodb.net/taep?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        client.connect(err => {
            const collection = client.db("taep").collection("atividades_taep");
            // perform actions on the collection object
            collection.insertOne({atividadeId,userIdCreator,projetoId,data})
        });
        client.close();
        return true;
    }


    async GetAtividade(userIdCreator,projetoId,data){
        const uri = "mongodb+srv://atividades_adm:atv123456@atividadetaep.tgnau.mongodb.net/taep?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        client.connect(err => {
            const collection = client.db("taep").collection("atividades_taep");
            // perform actions on the collection object
            collection.insertOne({userIdCreator,projetoId,data})
        });
        client.close();
        return true;
    }


    async GetAtividadeByAtividadeId(atividadeId,userIdCreator,projetoId){
      
        const uri = "mongodb+srv://atividades_adm:atv123456@atividadetaep.tgnau.mongodb.net/taep?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        
        await client.connect();
        const colletion = await client.db("taep").collection("atividades_taep");
        const data = await colletion.find({atividadeId:atividadeId,projectId:projetoId}).toArray();

        client.close();
        return data;

    }

    async GetAtividadeByProjectId(projetoId){
        
        const uri = "mongodb+srv://atividades_adm:atv123456@atividadetaep.tgnau.mongodb.net/taep?retryWrites=true&w=majority";
        const client = new MongoClient(uri);
        
        await client.connect();
        const colletion = await client.db("taep").collection("atividades_taep");
        const data = await colletion.find({projetoId:projetoId}).toArray();

        client.close();
        return data;
    }


}

export {MongoService};