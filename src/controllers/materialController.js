const Material = require("../config/models/materialModel");

module.exports.createMaterial = async (req, res) => {
  try {
    const { material, price, dis_price } = req.body;

    const existingMaterial = await Material.findOne({ material });
    if (existingMaterial) {
      return res
        .status(400)
        .json({ status: false, data: {}, err: "Material already exists" });
    }

    const newMaterial = new Material({ material, price, dis_price });
    await newMaterial.save();

    res.status(201).json({ status: true, data: newMaterial, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json({ status: true, data: materials, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Material not found" });
    }
    res.status(200).json({ status: true, data: material, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.updateMaterial = async (req, res) => {
  try {
    const { material, price, dis_price } = req.body;
    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      { material, price, dis_price },
      { new: true, runValidators: true }
    );

    if (!updatedMaterial) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Material not found" });
    }

    res.status(200).json({ status: true, data: updatedMaterial, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.deleteMaterial = async (req, res) => {
  try {
    const deletedMaterial = await Material.findByIdAndDelete(req.params.id);
    if (!deletedMaterial) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Material not found" });
    }

    res.status(200).json({ status: true, data: {}, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};
