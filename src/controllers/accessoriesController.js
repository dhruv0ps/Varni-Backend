const Accessories = require("../config/models/accessoriesModel");

module.exports.createAccessory = async (req, res) => {
  try {
    const { modularType, subModules } = req.body;

    const existingAccessory = await Accessories.findOne({ modularType });
    if (existingAccessory) {
      return res
        .status(400)
        .json({
          status: false,
          data: {},
          err: "Accessory with this modularType already exists",
        });
    }

    const newAccessory = new Accessories({ modularType, subModules });
    await newAccessory.save();

    res.status(201).json({ status: true, data: newAccessory, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};

module.exports.getAllAccessories = async (req, res) => {
  try {
    const accessories = await Accessories.find();
    res.status(200).json({ status: true, data: accessories, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};

module.exports.getAccessoryById = async (req, res) => {
  try {
    const accessory = await Accessories.findById(req.params.id);
    if (!accessory) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Accessory not found" });
    }
    res.status(200).json({ status: true, data: accessory, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};

module.exports.updateAccessory = async (req, res) => {
  try {
    const { modularType, subModules } = req.body;
    const updatedAccessory = await Accessories.findByIdAndUpdate(
      req.params.id,
      { modularType, subModules },
      { new: true, runValidators: true }
    );

    if (!updatedAccessory) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Accessory not found" });
    }

    res.status(200).json({ status: true, data: updatedAccessory, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};

module.exports.deleteAccessory = async (req, res) => {
  try {
    const deletedAccessory = await Accessories.findByIdAndDelete(req.params.id);
    if (!deletedAccessory) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Accessory not found" });
    }

    res.status(200).json({ status: true, data: {}, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};
