import { User } from "../model/usuario";
import { app } from "../server";
import { UserService } from "../service/usuario";

export function UserController() {
  const list: User[] = [];
  const service = new UserService(list);

  
  app.get("/users", (req, res) => {
    const users = service.getUsers();
    res.json(users);
  });


  app.post("/users", (req, res) => {
    const userData = req.body;
    const newUser = service.createUser(userData);
    res.status(201).json(newUser);
  });


  app.get("/users/search", (req, res) => {
    const { nome, idade } = req.query;

    
    if (nome) {
      const user = service.getUserByNome(nome as string);
      if (user) {
        return res.status(200).json(user);
      }
    }


    if (idade) {
      const idadeNumber = parseInt(idade as string);
      const user = service.getUserByIdade(idadeNumber);
      if (user) {
        return res.status(200).json(user);
      }
    }
    
    return res.status(404).json({ message: "Usuário não encontrado" });
  });
}