const items = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Fast Food",
    tastyTag: "Delicious",
    mealTime: ["All Items", "Lunch", "Dinner"],
    description: "A classic burger with fresh ingredients",
    image: "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
    size: [
      {
        sizeName: "Large",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
          { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
          { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
          { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
          { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
          { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
          { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
          { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
        ],
        preparationTime: 15,
        sellingPrice: 9.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
          { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
        ],
      },
      {
        sizeName: "Medium",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          { name: "Onion", properties: { quantity: 1, unit: "slice" } },
          { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
          { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
        ],
        preparationTime: 12,
        sellingPrice: 7.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
        ],
      },
      {
        sizeName: "Small",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
        ],
        preparationTime: 10,
        sellingPrice: 5.99,
        addOns: [
          {
            name: "Extra Lettuce",
            quantity: 1,
            unit: "leaf",
            addonPrice: 3.0,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Pizza",
    category: "Fast Food",
    tastyTag: "Delicious",
    mealTime: ["All Items", "All Day", "Lunch"],
    description: "A classic burger with fresh ingredients",
    image:
      "https://static.vecteezy.com/system/resources/previews/022/994/042/non_2x/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with-ai-generated-free-photo.jpg",
    size: [
      {
        sizeName: "Large",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
          { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
          { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
          { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
          { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
          { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
          { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
          { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
        ],
        preparationTime: 15,
        sellingPrice: 9.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
          { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
        ],
      },
      {
        sizeName: "Medium",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          { name: "Onion", properties: { quantity: 1, unit: "slice" } },
          { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
          { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
        ],
        preparationTime: 12,
        sellingPrice: 7.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
        ],
      },
      {
        sizeName: "Small",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
        ],
        preparationTime: 10,
        sellingPrice: 5.99,
        addOns: [
          {
            name: "Extra Lettuce",
            quantity: 1,
            unit: "leaf",
            addonPrice: 3.0,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Classic Burger",
    category: "Fast Food",
    tastyTag: "Delicious",
    mealTime: ["All Items", "Lunch", "Dinner"],
    description: "A classic burger with fresh ingredients",
    image: "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
    size: [
      {
        sizeName: "Large",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
          { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
          { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
          { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
          { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
          { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
          { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
          { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
        ],
        preparationTime: 15,
        sellingPrice: 9.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
          { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
        ],
      },
      {
        sizeName: "Medium",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          { name: "Onion", properties: { quantity: 1, unit: "slice" } },
          { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
          { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
        ],
        preparationTime: 12,
        sellingPrice: 7.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
        ],
      },
      {
        sizeName: "Small",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
        ],
        preparationTime: 10,
        sellingPrice: 5.99,
        addOns: [
          {
            name: "Extra Lettuce",
            quantity: 1,
            unit: "leaf",
            addonPrice: 3.0,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Pizza",
    category: "Fast Food",
    tastyTag: "Delicious",
    mealTime: ["All Items", "All Day", "Lunch"],
    description: "A classic burger with fresh ingredients",
    image:
      "https://static.vecteezy.com/system/resources/previews/022/994/042/non_2x/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with-ai-generated-free-photo.jpg",
    size: [
      {
        sizeName: "Large",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
          { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
          { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
          { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
          { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
          { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
          { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
          { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
        ],
        preparationTime: 15,
        sellingPrice: 9.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
          { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
        ],
      },
      {
        sizeName: "Medium",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          { name: "Onion", properties: { quantity: 1, unit: "slice" } },
          { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
          { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
        ],
        preparationTime: 12,
        sellingPrice: 7.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
        ],
      },
      {
        sizeName: "Small",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
        ],
        preparationTime: 10,
        sellingPrice: 5.99,
        addOns: [
          {
            name: "Extra Lettuce",
            quantity: 1,
            unit: "leaf",
            addonPrice: 3.0,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "Classic Burger",
    category: "Fast Food",
    tastyTag: "Delicious",
    mealTime: ["All Items", "Lunch", "Dinner"],
    description: "A classic burger with fresh ingredients",
    image:
      "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
    size: [
      {
        sizeName: "Large",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
          { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
          { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
          { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
          { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
          { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
          { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
          { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
        ],
        preparationTime: 15,
        sellingPrice: 9.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
          { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
        ],
      },
      {
        sizeName: "Medium",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          { name: "Onion", properties: { quantity: 1, unit: "slice" } },
          { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
          { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
        ],
        preparationTime: 12,
        sellingPrice: 7.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
        ],
      },
      {
        sizeName: "Small",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
        ],
        preparationTime: 10,
        sellingPrice: 5.99,
        addOns: [
          {
            name: "Extra Lettuce",
            quantity: 1,
            unit: "leaf",
            addonPrice: 3.0,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Pizza",
    category: "Fast Food",
    tastyTag: "Delicious",
    mealTime: ["All Items", "All Day", "Lunch"],
    description: "A classic burger with fresh ingredients",
    image:
      "https://static.vecteezy.com/system/resources/previews/022/994/042/non_2x/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with-ai-generated-free-photo.jpg",
    size: [
      {
        sizeName: "Large",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
          { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
          { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
          { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
          { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
          { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
          { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
          { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
        ],
        preparationTime: 15,
        sellingPrice: 9.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
          { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
        ],
      },
      {
        sizeName: "Medium",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          { name: "Onion", properties: { quantity: 1, unit: "slice" } },
          { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
          { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
        ],
        preparationTime: 12,
        sellingPrice: 7.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
        ],
      },
      {
        sizeName: "Small",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
        ],
        preparationTime: 10,
        sellingPrice: 5.99,
        addOns: [
          {
            name: "Extra Lettuce",
            quantity: 1,
            unit: "leaf",
            addonPrice: 3.0,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "Classic Burger",
    category: "Fast Food",
    tastyTag: "Delicious",
    mealTime: ["All Items", "Lunch", "Dinner"],
    description: "A classic burger with fresh ingredients",
    image:
      "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
    size: [
      {
        sizeName: "Large",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
          { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
          { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
          { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
          { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
          { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
          { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
          { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
        ],
        preparationTime: 15,
        sellingPrice: 9.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
          { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
        ],
      },
      {
        sizeName: "Medium",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          { name: "Onion", properties: { quantity: 1, unit: "slice" } },
          { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
          { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
        ],
        preparationTime: 12,
        sellingPrice: 7.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
        ],
      },
      {
        sizeName: "Small",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
        ],
        preparationTime: 10,
        sellingPrice: 5.99,
        addOns: [
          {
            name: "Extra Lettuce",
            quantity: 1,
            unit: "leaf",
            addonPrice: 3.0,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Pizza",
    category: "Fast Food",
    tastyTag: "Delicious",
    mealTime: ["All Items", "All Day", "Lunch"],
    description: "A classic burger with fresh ingredients",
    image:
      "https://static.vecteezy.com/system/resources/previews/022/994/042/non_2x/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with-ai-generated-free-photo.jpg",
    size: [
      {
        sizeName: "Large",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
          { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
          { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
          { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
          { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
          { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
          { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
          { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
        ],
        preparationTime: 15,
        sellingPrice: 9.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
          { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
        ],
      },
      {
        sizeName: "Medium",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          { name: "Onion", properties: { quantity: 1, unit: "slice" } },
          { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
          { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
        ],
        preparationTime: 12,
        sellingPrice: 7.99,
        addOns: [
          {
            name: "Extra Cheese",
            quantity: 1,
            unit: "slice",
            addonPrice: 3.0,
          },
        ],
      },
      {
        sizeName: "Small",
        ingredients: [
          { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
          { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
          { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
        ],
        preparationTime: 10,
        sellingPrice: 5.99,
        addOns: [
          {
            name: "Extra Lettuce",
            quantity: 1,
            unit: "leaf",
            addonPrice: 3.0,
          },
        ],
      },
    ],
  },
];

export default items;
