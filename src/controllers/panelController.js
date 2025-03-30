const Panel = require("../config/models/panelModel");

module.exports.createPanel = async (req, res) => {
  try {
    const { panel, price, dis_price } = req.body;
    const newPanel = new Panel({ panel, price, dis_price });
    await newPanel.save();

    res.status(201).json({ status: true, data: newPanel, err: {} });
  } catch (error) {
    res.status(400).json({ status: false, data: {}, err: error });
  }
};

module.exports.getPanels = async (req, res) => {
  try {
    const panels = await Panel.find();
    res.status(200).json({ status: true, data: panels, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.getPanelById = async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id);
    if (!panel) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Panel not found" });
    }
    res.status(200).json({ status: true, data: panel, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.updatePanel = async (req, res) => {
  try {
    const updatedPanel = await Panel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPanel) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Panel not found" });
    }
    res.status(200).json({ status: true, data: updatedPanel, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};

module.exports.deletePanel = async (req, res) => {
  try {
    const deletedPanel = await Panel.findByIdAndDelete(req.params.id);
    if (!deletedPanel) {
      return res
        .status(404)
        .json({ status: false, data: {}, err: "Panel not found" });
    }
    res.status(200).json({ status: true, data: {}, err: {} });
  } catch (error) {
    res.status(500).json({ status: false, data: {}, err: error });
  }
};
