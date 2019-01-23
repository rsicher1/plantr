const { db, Vegetable, Gardener, Plot } = require('./models');
//const VegetablePlot = db.model('vegetable_plot');

db.sync({ force: true })
  .then(() => {
    console.log('sync successful');
  })
  .then(() => {
    return Vegetable.bulkCreate([
      { name: 'carrot', color: 'orange' },
      { name: 'pepper', color: 'green' },
      { name: 'pepper', color: 'red' },
    ]);
  })
  .then(() => {
    return Vegetable.findOne({ where: { name: 'pepper', color: 'red' } });
  })
  .then(vegetable => {
    return Gardener.create({
      name: 'Ross',
      age: 33,
      favoriteVegetableId: vegetable.id,
    }).then(gardener => {
      return { vegetable, gardener };
    });
  })
  .then(({ gardener, vegetable }) => {
    return Plot.create({
      size: 100,
      shaded: false,
      gardenerId: gardener.id,
    }).then(plot => {
      return { vegetable, plot };
    });
  })
  .then(({ plot, vegetable }) => {
    return vegetable.addPlot(plot);
    /*
      return VegetablePlot.create({
        plotId: plot.id,
        vegetableId: vegetable.id,
      });
    */
  })
  .catch(err => {
    console.log('sync error', err);
  })
  .finally(() => {
    db.close();
  });
