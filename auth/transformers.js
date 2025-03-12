import * as db from "../db/queries.js";

const serializer = (user, done) => {
  done(null, user.id);
}

const deserializer = async (id, done) => {
  try {
    const user = await db.selectUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
}

export { serializer, deserializer };
