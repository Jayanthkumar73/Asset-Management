const express = require("express");
const router = express.Router();
const AssetService = require("../models/Asset-service");
const Dealer = require("../models/Dealers");

// Get combined asset + dealer data
router.get("/assetservice", async (req, res) => {
  try {
    const assets = await AssetService.find();
    const dealers = await Dealer.find();

    const enrichedAssets = assets.map((asset) => {
      const matchedDealer = dealers.find(d => d.dealerName === asset.dealer);

      return {
        id: asset._id,
        assetName: asset.assetName,
        assetType: asset.assetType,
        assetModelId: asset.assetModelId,
        warrantyDate: asset.warrantyDate?.toISOString().split("T")[0],
        repairSentDate: asset.repairSentDate?.toISOString().split("T")[0],
        repairCount: asset.repairCount || 0,
        repairThreshold: asset.repairThreshold || 3,
        dealer: asset.dealer,
        dealerId: matchedDealer ? matchedDealer.dealerId : "N/A",
        entryDate: matchedDealer?.entryDate?.toISOString().split("T")[0] || "N/A",
        description: asset.description || "",
        repairDate: asset.repairDate || null
      };
    });
    console.log(enrichedAssets)
    res.status(200).json(enrichedAssets);
   
  } catch (error) {
    console.error("❌ Error in GET /assetservice:", error);
    res.status(500).json({ error: "Failed to fetch asset data" });
  }
});




// Delete asset
router.delete("/assetservice/model/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const deleted = await AssetService.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Asset not found" });
    res.json(deleted);
  } catch (error) {
    console.error(" Error in DELETE /assetservice/model/:id:", error);
    res.status(500).json({ error: "Failed to delete asset" });
  }
});

// Update asset
router.put("/assets/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedAsset = await AssetService.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.status(200).json(updatedAsset);
  } catch (error) {
    console.error("❌ Error updating asset:", error);
    res.status(500).json({ error: "Failed to update asset" });
  }
});

module.exports = router;
