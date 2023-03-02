const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// /api/tags

// GET (READ) all tags
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name"],
          through: ProductTag,
          as: "productTag_products",
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET (READ) a single tag
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["product_name"],
          through: ProductTag,
          as: "productTag_products",
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST (CREATE) a new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT (UPDATE) a tag by its id value
router.put("/:id", async (req, res) => {
  const tagData = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE (DELETE) a tag by its id value
router.delete("/:id", async (req, res) => {
  const tagData = Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => res.status(200).json(tagData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
