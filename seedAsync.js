const { db, Vegetable, Gardener, Plot } = require('./models');
//const VegetablePlot = db.model('vegetable_plot');

(async () => {
  try {
    await db.sync({ force: true });

    console.log('sync successful');

    await Vegetable.bulkCreate([
      { name: 'carrot', color: 'orange' },
      { name: 'pepper', color: 'green' },
      { name: 'pepper', color: 'red' },
    ]);

    const vegetable = await Vegetable.findOne({
      where: { name: 'carrot' },
    });

    const gardener = await Gardener.create({
      name: 'Ross',
      age: 33,
      favoriteVegetableId: vegetable.id,
    });

    const plot = await Plot.create({
      size: 100,
      shaded: false,
      gardenerId: gardener.id,
    });

    await vegetable.addPlot(plot);
    /*
      return VegetablePlot.create({
        plotId: plot.id,
        vegetableId: vegetable.id,
      });
    */

    await db.close();
  } catch (err) {
    console.log('sync error', err);
  }
})();
