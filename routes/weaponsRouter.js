const router = require("express").Router();
const WeaponService = require("../services/weaponService");

// Test for quest 2
router.get("/:id/power", async ({ params }, response) => {
  try {
    const weaponPowerLevel = await WeaponService().getPower(params.id);
    response.status(200).json({ data: { weaponPowerLevel } });
  } catch (error) {
    response.status(500).json({ err: error.message });
  }
});

router.get("/:id/max-quantity", async ({ params }, response) => {
  try {
    const weaponMaxQty = await WeaponService().getMaxQuantity(params.id);
    response.status(200).json({ data: { weaponMaxQty } });
  } catch (error) {
    response.status(500).json({ err: error.message });
  }
});

module.exports = router;
