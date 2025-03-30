const Size = require("../config/models/sizeModel");

module.exports.createSize = async (req, res) => {
  try {
    const { size, price, dis_price } = req.body;

    const existingSize = await Size.findOne({ size });
    if (existingSize) {
      return res
        .status(400)
        .json({
          status: false,
          data: {},
          err: { message: "Size already exists" },
        });
    }

    const newSize = new Size({ size, price, dis_price });
    await newSize.save();

    res.status(201).json({ status: true, data: newSize, err: {} });
  } catch (error) {
    return res.status(400).json({ status: false, data: {}, err: error });
  }
};

module.exports.getAllSizes = async (req, res) => {
  try {
    const sizes = await Size.find();
    res.status(200).json({ status: true, data: sizes, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.getSizeById = async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: { message: "Size not found" } });
    }
    res.status(200).json({ status: true, data: size, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.updateSize = async (req, res) => {
  try {
    const { size, price, dis_price } = req.body;
    const updatedSize = await Size.findByIdAndUpdate(
      req.params.id,
      { size, price, dis_price },
      { new: true, runValidators: true }
    );

    if (!updatedSize) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: { message: "Size not found" } });
    }

    res.status(200).json({ status: true, data: updatedSize, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.deleteSize = async (req, res) => {
  try {
    const deletedSize = await Size.findByIdAndDelete(req.params.id);
    if (!deletedSize) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: { message: "Size not found" } });
    }

    res.status(200).json({ status: true, data: deletedSize, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};
