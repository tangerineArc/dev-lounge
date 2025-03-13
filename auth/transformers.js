import * as db from "../db/queries.js";

const serializer = (member, done) => {
  done(null, member.id);
}

const deserializer = async (id, done) => {
  try {
    const member = await db.selectMemberById(id);

    done(null, member);
  } catch (err) {
    done(err);
  }
}

export { serializer, deserializer };
