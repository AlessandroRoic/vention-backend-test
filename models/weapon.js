const db = require("../config/dbConfig.js");
const Material = require("./material");
const weapons_table = "weapons";
const weapon_materials_table = "weapon_materials";

class Weapon {
  constructor({ id, name, power_level, qty }) {
    this.id = id;
    this.name = name;
    this.power_level = power_level;
    this.qty = qty;
  }

  // Quest 2
  static async getPowerLevel(id) {
    try {
      const weaponMaterials = await db(weapon_materials_table)
        .select("material_id")
        .where("weapon_id", id);
      if (!weaponMaterials.length)
        throw new Error("Weapon materials not found");
      let totalPowerLevel = 0;
      for (let { material_id } of weaponMaterials) {
        totalPowerLevel += await Material.getPowerLevel(material_id);
      }
      return totalPowerLevel;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Quest 3
  static async updatePowerLevel(materialId) {
    try {
      const relatedWeapons = await db(weapon_materials_table).where(
        "material_id",
        materialId
      );
      let updatedWeapons = [];
      for (let { weapon_id } of relatedWeapons) {
        const updatedPowerLevel = await Weapon.getPowerLevel(weapon_id);
        const updatedWeapon = await db(weapons_table)
          .where("id", weapon_id)
          .update("power_level", updatedPowerLevel)
          .returning("*");
        updatedWeapons.push(updatedWeapon);
      }
      return updatedWeapons;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Quest 5
  static async getMaxQty(id) {
    try {
      const weaponMaterials = await db(weapon_materials_table)
        .select("material_id")
        .where("weapon_id", id);

      if (!weaponMaterials.length)
        throw new Error("Weapon materials not found");

      let maxMaterialQtys = [];
      for (let { material_id } of weaponMaterials) {
        const maxMaterialQty = await Material.getMaxQty(material_id);
        maxMaterialQtys.push(maxMaterialQty);
      }

      return Math.min(...maxMaterialQtys);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Weapon;
