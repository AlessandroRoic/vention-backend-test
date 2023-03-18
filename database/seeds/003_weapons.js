exports.seed = (knex) =>
  knex("weapons")
    .del()
    .then(() =>
      knex("weapons").insert([
        {
          id: 1,
          name: "Excalibur",
          power_level: 0,
          qty: 1,
        },
        {
          id: 2,
          name: "Magic Staff",
          power_level: 0,
          qty: 1,
        },
      ])
    );
