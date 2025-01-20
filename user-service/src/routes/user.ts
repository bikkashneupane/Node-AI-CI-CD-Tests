import { Router, Request, Response, NextFunction } from "express";
import { validateUser } from "../middlewares/joiValidator";
import { IUser } from "../schema/userSchema";
import { getUsers } from "../controllers/user";

const router = Router();

// Mock data
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

// GET
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsers({});
    console.log(users, "users");
    users?.length > 0
      ? res.json({ users })
      : next({ status: 404, message: "No users found" });
  } catch (error) {
    next(error);
  }
});

// POST
router.post(
  "/",
  validateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password }: IUser = req.body;
    } catch (error) {
      next(error);
    }
  }
);
// UPDATE
// DELETE

export const userRouter: Router = router;
