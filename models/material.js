const db = require("../config/dbConfig.js");
const material_table = "materials";
const compositions_table = "compositions";

class Material {
  constructor(payload) {
    this.id = payload.id;
    this.power_level = payload.power_level;
    this.qty = payload.qty;
    this.deleted_at = payload.deleted_at;
  }

  static async find(id) {
    try {
      const material = await db(material_table).where("id", id).first();
      return new Material(material);
    } catch (e) {
      throw new Error("Material not found");
    }
  }

  static async getPowerLevel(materialId) {
    try {
      const compositions = await db(compositions_table).where(
        "parent_id",
        materialId
      );
      const material = await await db(material_table)
        .select("power_level")
        .where("id", materialId)
        .first();

      if (!compositions.length) return material_table.power_level;

      let materialPowerLevel = material.power_level;
      for (let { material_id, qty } of compositions) {
        const compositionPowerLevel = await this.getPowerLevel(material_id);
        materialPowerLevel += compositionPowerLevel * qty;
      }

      return materialPowerLevel;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updatePowerLevel(id, newPowerLevel) {
    try {
      const updatedMaterial = await db(material_table)
        .where("id", id)
        .update("power_level", newPowerLevel)
        .returning("*");
      if (!updatedMaterial) throw new Error("Material not found");
      return updatedMaterial;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(id, { power_level, qty }) {
    try {
      const updatedMaterial = await db(material_table)
        .where("id", id)
        .update({ power_level, qty })
        .returning("*");
      if (!updatedMaterial) throw new Error("Material not found");
      return updatedMaterial;
    } catch (error) {
      throw new Error(error);
    }
  }

  // QUEST 5
  static async getMaxQty(id) {
    try {
      const compositions = await db(compositions_table).where("parent_id", id);
      const material = await db(material_table).where("id", id).first();

      if (!compositions.length) return material.qty;

      let compositionMaxQtys = material.qty;
      for (let { material_id, qty } of compositions) {
        const compositionQty = await this.getMaxQty(material_id);
        compositionMaxQtys += Math.floor(compositionQty / qty);
      }

      return compositionMaxQtys;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Material;
