exports.up = async function (knex) {
  await knex.schema.createTable("materials", function (t) {
    t.increments("id").unsigned().primary();
    t.integer("power_level");
    t.integer("qty");
    t.timestamp("deleted_at");
  });
  await knex.schema.createTable("compositions", function (t) {
    t.integer("parent_id").index();
    t.integer("material_id").index();
    t.integer("qty");
  });
  await knex.schema.createTable("weapons", (t) => {
    t.increments("id").unsigned().primary();
    t.string("name");
    t.integer("power_level");
    t.integer("qty");
  });
  await knex.schema.createTable("weapon_materials", (t) => {
    t.integer("weapon_id").index().references("id").inTable("weapons");
    t.integer("material_id").index().references("id").inTable("materials");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("materials");
  await knex.schema.dropTable("compositions");
  await knex.schema.dropTable("weapons");
  await knex.schema.dropTable("weapon_materials");
};
