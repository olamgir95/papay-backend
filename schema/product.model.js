const mongoose = require("mongoose");
const {
  member_type_enums,
  status_type_enums,
  ordinary_enums,
  product_size_enums,
  product_status_enums,
  product_collection_enums,
  product_volume_enums,
} = require("../lib/config");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_collection: {
      type: String,
      required: true,
      enum: {
        values: product_collection_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_status: {
      type: String,
      required: true,
      default: "PAUSED",
      enum: {
        values: product_status_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_prices: {
      type: Number,
      required: true,
    },
    product_discount: {
      type: Number,
      required: false,
      default: 0,
    },
    product_left_cnt: {
      type: Number,
      required: true,
    },
    product_size: {
      type: String,
      default: "normal",
      required: function () {
        const sized_list = ["dish", "salad", "dessert"];
        return sized_list.includes(this.product_collection);
      },
      enum: {
        values: product_size_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },
    product_volume: {
      type: String,
      default: 1,
      required: function () {
        return this.product_collection === "drink";
      }, //todo

      enum: {
        values: product_volume_enums,
        message: "{VALUE} is not among permitted enum values",
      },
    },

    product_description: {
      type: String,
      required: true,
    },
    product_images: {
      type: Array,
      required: false,
      default: [],
    },
    restaurant_mb_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: false,
    },

    product_views: {
      type: Number,
      required: false,
      default: 0,
    },
    product_likes: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);
productSchema.index(
  { restaurant_mb_id: 1, product_name: 1, product_size: 1, product_volume: 1 },
  { unique: true }
);
module.exports = mongoose.model("Product", productSchema);
