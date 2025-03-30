const Panel = require("../config/models/panelModel");
const Material = require("../config/models/materialModel");
const Size = require("../config/models/sizeModel");
const Accessories = require("../config/models/accessoriesModel");
const IconModular = require("../config/models/iconModel");
const ColorModular = require("../config/models/colorModel");

module.exports.calculateBill = async (req, res) => {
  try {
    const { panel, material, size, accessories, icons, colors } = req.body;

    let totalPrice = 0;
    let billDetails = [];

    // Fetch panel price
    const panelData = await Panel.findOne({ panel });
    if (panelData) {
      let price = panelData.dis_price || panelData.price;
      totalPrice += price;
      billDetails.push({ category: "Panel", name: panelData.panel, price });
    }

    // Fetch material price
    const materialData = await Material.findOne({ material });
    if (materialData) {
      let price = materialData.dis_price || materialData.price;
      totalPrice += price;
      billDetails.push({
        category: "Material",
        name: materialData.material,
        price,
      });
    }

    // Fetch size price
    const sizeData = await Size.findOne({ size });
    if (sizeData) {
      let price = sizeData.dis_price || sizeData.price;
      totalPrice += price;
      billDetails.push({ category: "Size", name: sizeData.size, price });
    }

    // Function to calculate price for modular items (Accessories, Icons, Colors)
    const calculateModularPrice = async (items, Model, categoryName) => {
      let totalCategoryPrice = 0;
      let categoryDetails = [];

      for (let item of items) {
        const modularData = await Model.findOne({
          "subModules.name": item.name,
        });

        if (modularData) {
          const subModule = modularData.subModules.find(
            (sub) => sub.name === item.name
          );
          if (subModule) {
            totalCategoryPrice += subModule.price;
            categoryDetails.push({
              name: subModule.name,
              price: subModule.price,
            });
          }
        }
      }

      if (categoryDetails.length > 0) {
        totalPrice += totalCategoryPrice;
        billDetails.push({
          category: categoryName,
          items: categoryDetails,
          total: totalCategoryPrice,
        });
      }
    };

    // Fetch and calculate modular prices
    if (accessories?.length > 0)
      await calculateModularPrice(accessories, Accessories, "Accessories");
    if (icons?.length > 0)
      await calculateModularPrice(icons, IconModular, "Icons");
    if (colors?.length > 0)
      await calculateModularPrice(colors, ColorModular, "Colors");

    return res.status(200).json({
      success: true,
      totalPrice,
      billDetails,
    });
  } catch (error) {
    console.error("Error calculating bill:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to calculate bill. Please try again.",
    });
  }
};
