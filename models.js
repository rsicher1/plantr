const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr');

const Gardener = db.define('gardener', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
});

const Plot = db.define('plot', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN,
});

Plot.belongsTo(Gardener);

const Vegetable = db.define('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },
});

Gardener.belongsTo(Vegetable, { as: 'favorite_vegetable' });

Vegetable.belongsToMany(Plot, { through: 'vegetable_plot' });
Plot.belongsToMany(Vegetable, { through: 'vegetable_plot' });

module.exports = { db, Vegetable, Gardener, Plot };
