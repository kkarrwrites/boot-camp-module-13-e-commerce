const router = require("express").Router();
const { Category, Product } = require("../../models");

// /api/categories

// GET (READ) all categories
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: Product });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET (READ) a single category
router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST (CREATE) a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT (UPDATE) a category by its id value
router.put("/:id", async (req, res) => {
  const categoryData = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => {
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE (DELETE) a category by its id value
router.delete("/:id", async (req, res) => {
  const categoryData = Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryData) => res.status(200).json(categoryData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
