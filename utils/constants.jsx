import print from "../imgs/print.png";
import box from "../imgs/package.png";

export const PRINTING = "PRINTING";
export const PACKAGING = "PACKAGING";
export const FILTER_ONE = [
  { name: PRINTING, img: print.src },
  { name: PACKAGING, img: box.src },
];

export const FILTER_TWO = [
  {
    category: PACKAGING,
    items: [
      {
        name: "BOXES",
        options: [
          { name: "CORROGATED BOXES", img: "" },
          { name: "3 PLY CORROAGTED BOXES", img: "" },
          { name: "5 PLY CORROGATED BOXES", img: "" },
          { name: "7 PLY CORROGATED BOXES", img: "" },
          { name: "ECOMMERCE CORROGATED BOXES", img: "" },
          { name: "CONTAINER BOXES", img: "" },
          { name: "CABLE WIRE PACKAGING", img: "" },
          { name: "MONO CARTON CUSTOM DESIGN AND PRINTED BOXES", img: "" },
          { name: "ECOMMERCE CUSTOMIZED BOXES", img: "" },
          { name: "CORROGATED FITTING", img: "" },
          { name: "PRINTED DUPLEX CORROGATED BOXES", img: "" },
          { name: "FLOWER AND PLANT BOXES", img: "" },
          { name: "GIFT BOX PERSONALIZED", img: "" },
          { name: "PHARMA MEDICINE", img: "" },
          { name: "MONO CARTON BOXES", img: "" },
          { name: "PLASTIC CORROGATED BOXES", img: "" },
          { name: "PLYWOOD BOXES", img: "" },
          { name: "PRINTED BROWN CORROGATED BOXES", img: "" },
          { name: "RIGID BOXES", img: "" },
          { name: "STORAGE ARCHIVED BOXES", img: "" },
          { name: "BOXES ON SCALE", img: "" },
        ],
        img: "https://cdn.pixabay.com/photo/2016/04/01/08/49/box-1299001_960_720.png",
      },
      {
        name: "BAGS",
        options: [
          { name: "AIR BUBBLE BAGS", img: "" },
          { name: "ALUMINIUM SPOUT PACKAGING", img: "" },
          { name: "BIODEGRADABLE BAGS", img: "" },
          { name: "SHRINK BAGS", img: "" },
          { name: "PAPER BAGS", img: "" },
          { name: "GOLD LOAN ENVELOPES", img: "" },
          { name: "FOOD DELIVERY BAGS", img: "" },
          { name: "D CUT CARRY BAGS", img: "" },
          { name: "CABLE WIRE BAGS", img: "" },
          { name: "SIM CARD BAGS", img: "" },
          { name: "FAST FOOD BAGS", img: "" },
          { name: "PAPER ENVELOPS", img: "" },
          { name: "SIDE GUSSET LOOP CARRY BAGS", img: "" },
          { name: "WEDDING BAGS", img: "" },
          { name: "STANDUP POUCHES", img: "" },
        ],
        img: "https://cdn.pixabay.com/photo/2013/07/13/09/47/paper-bag-156023_960_720.png",
      },
      {
        name: "CLOTHING",
        options: [
          { name: "WATCH PACKAGING", img: "" },
          { name: "SHOES PACKAGING", img: "" },
          { name: "BELT PACKAGING", img: "" },
          { name: "JEWLERY PACKAGING", img: "" },
          { name: "SHIRT/PANT PACKAGING", img: "" },
          { name: "WOMEN ACCESSORIES", img: "" },
        ],
        img: "https://cdn.pixabay.com/photo/2018/10/18/16/44/suitcase-3756821_960_720.png",
      },
      {
        name: "ECOMMERCE",
        options: [
          { name: "BOOKS PACKAGING", img: "" },
          { name: "CUSTOM BOOKS PACKAGING", img: "" },
          { name: "ECOMMERCE BOXES", img: "" },
          { name: "CUSTOM MOBILE ACCESSORIES", img: "" },
          { name: "MOBILE ACCESSORIES", img: "" },
          { name: "MARKETPLACE PACKAGING", img: "" },
          { name: "EYEWEAR PACKAGING", img: "" },
        ],
        img: "https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_960_720.png",
      },
      {
        name: "FOOD BOXES",
        options: [
          { name: "COKE BOXES", img: "" },
          { name: "TEA PACKAGING", img: "" },
          { name: "SWEETS BOXES", img: "" },
          { name: "BAR PACKAGING", img: "" },
          { name: "CUSTOM PIZZA BOXES", img: "" },
          { name: "PIZZA BOXES", img: "" },
          { name: "EGGS PACKAGING", img: "" },
          { name: "CHOCOLATE BOXES", img: "" },
          { name: "COOKIES BOXES", img: "" },
          { name: "DRY FRUITS BOXES", img: "" },
          { name: "DONUTS BOXES", img: "" },
          { name: "FOOD DELIVERY BOXES", img: "" },
          { name: "FOOD SERVING AND CONTAINER", img: "" },
        ],
        img: "https://cdn.pixabay.com/photo/2014/04/03/00/29/chicken-nuggets-308448_960_720.png",
      },
      {
        name: "COURIER",
        options: [
          { name: "CUSTOM COURIER BAGS", img: "" },
          { name: "PRINTED COURIER BAGS", img: "" },
          { name: "THIRD PARTY LIMITED BAGS", img: "" },
          { name: "60 MICRON WHITE COURIER BAGS WITH POD", img: "" },
        ],
        img: "https://cdn.pixabay.com/photo/2021/02/26/11/23/man-6051503_960_720.png",
      },
      {
        name: "STATIONARY",
        options: [
          { name: "PACKAGING PAPER", img: "" },
          { name: "PEN BOXES", img: "" },
        ],
        img: "https://cdn.pixabay.com/photo/2021/02/26/11/23/man-6051503_960_720.png",
      },
    ],
  },
];

export const CUSTOMIZATION = [
  {
    category: PACKAGING,
    options: [
      {
        name: "Type of Paper",
        type: "DROP",
        values: [
          "VIRGIN CRAFT PAPER",
          "PARTLY RECYCLED LINER PAPER",
          "FULL RECYCLED LINER PAPER",
          "WASTE BASED LINER",
          "FULLY BLEACHED CRAFT LINER",
          "WHITE COATED RECYCLED LINER",
          "MOLTED WHITE CRAFT",
          "100% RECYCLED FIBRES",
        ],
      },
      {
        name: "Select paper weight and GSM",
        type: "DROP",
        values: [
          "115 - 125 GSM",
          "140-150 GSM",
          "185 - 200 GSM",
          "250 GSM",
          "300 GSM",
        ],
      },
      {
        name: "Color of paper",
        type: "DROP",
        values: ["WHITE", "BROWN", "BLACK"],
      },
      {
        name: "Print options",
        type: "DROP",
        values: ["None", "MULTI-COLOR", "SINGLE-COLOR"],
      },
      {
        name: "Shape of box",
        type: "DROP",
        values: ["RECTANGLE", "PIZZA-TYPE", "TUCK-IN"],
      },
      {
        name: "Quality of paper",
        type: "DROP",
        values: ["ECONOMY", "PREMIUM", "SUPER-PREMIUM"],
      },
      {
        name: "Coating",
        type: "DROP",
        values: [
          "THERMAL-GLOSS",
          "PVC-LAMINATION",
          "EMBOSS",
          "SILVER",
          "LEAT FULL",
          "HYBRID",
          "VANISH-COATING",
          "SPOT-UV",
          "MATT-HALF",
          "HALF-GLOSS-LAMINATION",
          "MATT-LAMINATION",
          "GLOSS-LAMINATION",
        ],
      },
      {
        name: "Enter length",
        type: "TEXT",
        values: [],
      },
      {
        name: "Enter breadth",
        type: "TEXT",
        values: [],
      },
      {
        name: "Enter height",
        type: "TEXT",
        values: [],
      },
      {
        name: "Upload a photo of your design",
        type: "FILE",
        values: [],
      },
    ],
  },
  {
    category: PRINTING,
    options: [
      {
        name: "Select type of paper",
        type: "DROP",
        values: [
          "GLOSS",
          "MATTE",
          "BRIGHT-WHITE-PAPER",
          "BAND-PAPER",
          "COATED-PAPER",
          "MATTEMARKED-PAPER",
          "SATIN-PAPER",
          "DULL-PAPER",
          "MAPLITO",
        ],
      },
      {
        name: "Select GSM of paper",
        type: "DROP",
        values: ["52", "58", "60", "70", "150", "180", "200", "250", "300"],
      },
      {
        name: "Enter length",
        type: "TEXT",
        values: [],
      },
      {
        name: "Enter breadth",
        type: "TEXT",
        values: [],
      },
      {
        name: "Enter quanitity of gloss",
        type: "TEXT",
        values: [],
      },
      {
        name: "Select type of grinning",
        type: "DROP",
        values: ["CTP", "GRINNING"],
      },
      {
        name: "Select paper of cover",
        type: "DROP",
        values: [
          "GLOSS",
          "MATTE",
          "BRIGHT-WHITE-PAPER",
          "BAND-PAPER",
          "COATED-PAPER",
          "MATTEMARKED-PAPER",
          "SATIN-PAPER",
          "DULL-PAPER",
          "MAPLITO",
        ],
      },
      {
        name: "Enter GSM of cover",
        type: "TEXT",
        values: [],
      },
      {
        name: "Select cover color",
        type: "COLOR",
        values: [],
      },
      {
        name: "What kind of printing",
        type: "DROP",
        values: ["DIGITAL", "OFFSET"],
      },
      {
        name: "Select paper quality",
        type: "DROP",
        values: ["ECONOMY", "PREMIUM", "SUPER_PREMIUM"],
      },
      {
        name: "Do you want your book to be glued ?",
        type: "DROP",
        values: ["YES", "NO"],
      },
      {
        name: "What kind of cover lamination ?",
        type: "DROP",
        values: ["GLOSS", "MATTE", "VELVET", "GOLD", "SILVER", "NO_LAMINATION"],
      },
      {
        name: "Select printing mechanism",
        type: "DROP",
        values: ["FOLDING", "SEWING", "SPOT-UV"],
      },
      {
        name: "Upload a photo of your design",
        type: "FILE",
        values: [],
      },
    ],
  },
];
