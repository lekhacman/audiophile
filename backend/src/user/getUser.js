import { paramsSchema } from "./schema.js";
import userRepository, { USER_ROLE } from "./userRepository.js";
import { pick } from "ramda";

export default async function getUser(req, res) {
  if (
    req.user.role !== USER_ROLE.ADMIN &&
    req.params.id !== req.user.username
  ) {
    return res.status(403).send();
  }

  const user = await userRepository.get(req.user.username);
  if (!user) {
    return res.status(404).send("No such user");
  }
  return res.send(pick(["role"], user));
}
getUser.options = { schema: { params: paramsSchema } };
