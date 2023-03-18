const router = require("express").Router();

const MaterialService = require("../services/materialService.js");
const WeaponService = require("../services/weaponService");

router.get("/:id", async (req, res) => {
  try {
    const material = await MaterialService().getMaterial(req.params.id);
    res.status(200).json({ data: { material } });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// QUEST 3
router.patch("/:id/power/:power", async (req, res) => {
  try {
    const { id, power } = req.params;
    const updatedMaterials = await MaterialService().updatePower(id, power);
    const updatedWeapons = await WeaponService().updatePower(id);
    res.status(200).json({
      data: { updatedMaterials, updatedWeapons },
      message: "Correctly updated material power level",
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.put("/:id", async ({ params, body }, res) => {
  try {
    const { id } = params;
    const updatedMaterial = await MaterialService().updateMaterial(id, body);
    const updatedWeapons = await WeaponService().updatePower(id);
    res.status(200).json({
      data: { updatedMaterial, updatedWeapons },
      message: "Correctly updated material",
    });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});
module.exports = router;
