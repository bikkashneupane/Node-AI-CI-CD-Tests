import { Router, Request, Response } from "express";

const router = Router();

// Mock data
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

// GET all users
router.get("/", (req: Request, res: Response) => {
  res.json(users);
});

// GET user by ID
router.get("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// POST create new user
router.post("/", (req: Request, res: Response) => {
  console.log(req.body);

  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user by ID
router.put("/:id", (req: Request, res: Response) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// DELETE user by ID
router.delete("/:id", (req: Request, res: Response) => {
  users = users.filter((u) => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

export const userRouter = router;
