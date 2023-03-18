const {
  find,
  updatePowerLevel,
  getPowerLevel,
  update,
} = require("../models/material");

const MaterialService = () => {
  const getMaterial = async (id) => find(id);

  const getPower = async (id) => getPowerLevel(id);

  const updateMaterial = async (id, body) => update(id, body);

  const updatePower = async (id, newPowerLevel) =>
    updatePowerLevel(id, newPowerLevel);

  return {
    getMaterial,
    getPower,
    updatePower,
    updateMaterial
  };
};

module.exports = MaterialService;
