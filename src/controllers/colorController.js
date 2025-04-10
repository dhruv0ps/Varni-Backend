const ColorModular = require("../config/models/colorModel");

module.exports.createColorModular = async (req, res) => {
  try {
    const { modularType, subModules } = req.body;

    const existingEntry = await ColorModular.findOne({ modularType });

    if (existingEntry) {
      const isDuplicate = existingEntry.subModules.some(
        (mod) => mod.name.toLowerCase() === subModules.name.toLowerCase()
      );

      if (isDuplicate) {
        return res.status(400).json({
          status: false,
          data: {},
          err: `SubModule with name "${subModules.name}" already exists under "${modularType}"`,
        });
      }

      existingEntry.subModules.push(subModules);
      await existingEntry.save();

      return res.status(200).json({
        status: true,
        data: existingEntry,
        err: {},
      });
    }

    const newColorModular = new ColorModular({
      modularType,
      subModules: [subModules], 
    });

    await newColorModular.save();

    res.status(201).json({
      status: true,
      data: newColorModular,
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      data: {},
      err: error.message,
    });
  }
};

module.exports.getAllColorModulars = async (req, res) => {
  try {
    const colorModulars = await ColorModular.find();
    res.status(200).json({ status: true, data: colorModulars, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};

module.exports.getColorModularById = async (req, res) => {
  try {
    const colorModular = await ColorModular.findById(req.params.id);
    if (!colorModular) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Color Modular not found" });
    }
    res.status(200).json({ status: true, data: colorModular, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};

module.exports.updateColorModular = async (req, res) => {
  try {
    const { modularType, subModules } = req.body;
    const updatedColorModular = await ColorModular.findByIdAndUpdate(
      req.params.id,
      { modularType, subModules },
      { new: true, runValidators: true }
    );

    if (!updatedColorModular) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Color Modular not found" });
    }

    res.status(200).json({ status: true, data: updatedColorModular, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};

module.exports.deleteColorModular = async (req, res) => {
  try {
    const deletedColorModular = await ColorModular.findByIdAndDelete(
      req.params.id
    );
    if (!deletedColorModular) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Color Modular not found" });
    }

    res.status(200).json({ status: true, data: {}, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error.message });
  }
};
