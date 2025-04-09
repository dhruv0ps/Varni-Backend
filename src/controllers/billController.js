const mongoose = require("mongoose");
const Panel = require("../config/models/panelModel");
const Material = require("../config/models/materialModel");
const Size = require("../config/models/sizeModel");
const Accessories = require("../config/models/accessoriesModel");
const IconModular = require("../config/models/iconModel");
const ColorModular = require("../config/models/colorModel");
const Bill = require("../config/models/billModel");

module.exports.generateBillDetails = async (req, res) => {
  try {
    const { panel, material, size, accessories, icons, colors, quantity } = req.body;

    let unitTotalPrice = 0;
    let billDetails = [];

    const panelData = await Panel.findOne({ panel });
    if (!panelData) throw new Error(`Panel "${panel}" not found`);

    const materialData = await Material.findOne({ material });
    if (!materialData) throw new Error(`Material "${material}" not found`);

    const sizeData = await Size.findOne({ size });
    if (!sizeData) throw new Error(`Size "${size}" not found`);

    billDetails.push({
      category: "Panel",
      name: panelData.name,
      price: panelData.dis_price || panelData.price,
    });

    billDetails.push({
      category: "Material",
      name: materialData.name,
      price: materialData.dis_price || materialData.price,
    });

    billDetails.push({
      category: "Size",
      name: sizeData.name,
      price: sizeData.dis_price || sizeData.price,
    });

    unitTotalPrice = billDetails.reduce((total, item) => total + item.price, 0);

    const calculateModularPrice = async (items, Model, categoryName) => {
      let categoryDetails = [];

      for (let item of items) {
        const modularData = await Model.findOne({ "subModules.name": item.name });

        if (modularData) {
          const subModule = modularData.subModules.find(sub => sub.name === item.name);
          if (subModule) {
            categoryDetails.push({
              name: subModule.name,
              price: subModule.price,
            });
          }
        }
      }

      if (categoryDetails.length > 0) {
        billDetails.push({
          category: categoryName,
          items: categoryDetails,
          total: categoryDetails.reduce((sum, item) => sum + item.price, 0),
        });
      }
    };

    if (accessories?.length > 0) await calculateModularPrice(accessories, Accessories, "Accessories");
    if (icons?.length > 0) await calculateModularPrice(icons, IconModular, "Icons");
    if (colors?.length > 0) await calculateModularPrice(colors, ColorModular, "Colors");

    let totalPrice = unitTotalPrice * quantity;

    return res.status(200).json({ 
      status: true, 
      data: { billDetails, unitTotalPrice, totalPrice }, 
      err: {} 
    });

  } catch (error) {
    return res.status(500).json({ 
      status: false, 
      data: {}, 
      err: error.message 
    });
  }
};

module.exports.calculateBill = async (req, res) => {
  try {
    const { panel, material, size, accessories, icons, colors, quantity } = req.body;

    let unitTotalPrice = 0;
    let billDetails = [];

    const panelData = await Panel.findOne({ panel });
    if (!panelData) throw new Error(`Panel "${panel}" not found`);

    const materialData = await Material.findOne({ material });
    if (!materialData) throw new Error(`Material "${material}" not found`);

    const sizeData = await Size.findOne({ size });
    if (!sizeData) throw new Error(`Size "${size}" not found`);

    billDetails.push({
      category: "Panel",
      name: panelData.name,
      price: panelData.dis_price || panelData.price,
    });

    billDetails.push({
      category: "Material",
      name: materialData.name,
      price: materialData.dis_price || materialData.price,
    });

    billDetails.push({
      category: "Size",
      name: sizeData.name,
      price: sizeData.dis_price || sizeData.price,
    });

    unitTotalPrice = billDetails.reduce((total, item) => total + item.price, 0);

    const calculateModularPrice = async (items, Model, categoryName) => {
      let categoryDetails = [];

      for (let item of items) {
        const modularData = await Model.findOne({ "subModules.name": item.name });

        if (modularData) {
          const subModule = modularData.subModules.find(sub => sub.name === item.name);
          if (subModule) {
            categoryDetails.push({
              name: subModule.name,
              price: subModule.price,
            });
          }
        }
      }

      if (categoryDetails.length > 0) {
        billDetails.push({
          category: categoryName,
          items: categoryDetails,
          total: categoryDetails.reduce((sum, item) => sum + item.price, 0),
        });
      }
    };

    if (accessories?.length > 0) await calculateModularPrice(accessories, Accessories, "Accessories");
    if (icons?.length > 0) await calculateModularPrice(icons, IconModular, "Icons");
    if (colors?.length > 0) await calculateModularPrice(colors, ColorModular, "Colors");

    let totalPrice = unitTotalPrice * quantity;

    const newBill = await Bill.create({
      quantity,
      unitTotalPrice,
      totalPrice,
      billDetails,
    });

    return res.status(200).json({ status: true, data: newBill, err: {} });

  } catch (error) {
    return res.status(500).json({ status: false, data: {}, err: error.message });
  }
};

