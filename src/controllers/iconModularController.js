const IconModular = require("../config/models/iconModel");

module.exports.createIconModular = async (req, res) => {
  try {
    const { modularType, subModules } = req.body;

    const existingEntry = await IconModular.findOne({ modularType });
    if (existingEntry) {
      return res
        .status(400)
        .json({ status: false, data: {}, err: "ModularType already exists" });
    }

    const newIconModular = new IconModular({ modularType, subModules });
    await newIconModular.save();

    res.status(201).json({ status: true, data: newIconModular, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.getAllIconModulars = async (req, res) => {
  try {
    const iconModulars = await IconModular.find();
    res.status(200).json({ status: true, data: iconModulars, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.getIconModularById = async (req, res) => {
  try {
    const iconModular = await IconModular.findById(req.params.id);
    if (!iconModular) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Icon Modular not found" });
    }
    res.status(200).json({ status: true, data: iconModular, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.updateIconModular = async (req, res) => {
  try {
    const { modularType, subModules } = req.body;
    const updatedIconModular = await IconModular.findByIdAndUpdate(
      req.params.id,
      { modularType, subModules },
      { new: true, runValidators: true }
    );

    if (!updatedIconModular) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Icon Modular not found" });
    }

    res.status(200).json({ status: true, data: updatedIconModular, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.deleteIconModular = async (req, res) => {
  try {
    const deletedIconModular = await IconModular.findByIdAndDelete(
      req.params.id
    );
    if (!deletedIconModular) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Icon Modular not found" });
    }

    res.status(200).json({ status: true, data: {}, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};
