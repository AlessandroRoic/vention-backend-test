const { getPowerLevel, updatePowerLevel, getMaxQty } = require("../models/weapon");

const WeaponService = () => {
  const getPower = async (id) => getPowerLevel(id);

  const updatePower = async (materialId) => updatePowerLevel(materialId);
  
  const getMaxQuantity = async (id) => getMaxQty(id)

  return {
    getPower,
    updatePower,
    getMaxQuantity
  };
};

module.exports = WeaponService;
