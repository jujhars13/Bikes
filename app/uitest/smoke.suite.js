var BikesListPage = require('./pages/bikesList.page');

describe('Bikes Smoke Test Suite', function() {
  var jsonBikes;

  beforeAll(function() {
    browser.get(browser.baseUrl);
    jsonBikes = BikesListPage.getResourceJson();
  });

  it('As a user I would like to see a list/grid of bikes based on json document', function() {
    //check if all bikes from json are shown on bikes page
    BikesListPage.getBikes().then((bikes) => { 
      jsonBikes.items.forEach(bike => {

        //trying to find bike by name
        var expectedBike = bikes.find(x => {
          if(x.name == bike.name){
            return x.name == bike.name
          }
        });
        expect(expectedBike).toBeDefined();

        //if was found check all other info
        if(expectedBike != null){
          bike.class = bike.class.map(x => x.charAt(0).toUpperCase().concat(x.slice(1).toLowerCase()));
          expect(expectedBike.description).toEqual(bike.description)
          expect(expectedBike.class).toEqual(bike.class)
          expect(expectedBike.img).toEqual(bike.image.thumb)
        }
      });
    });
  });
});