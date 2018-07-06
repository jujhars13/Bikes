var BikesListPage = require('./pages/bikesList.page');

describe('Bikes Smoke Test Suite', function() {
  var jsonBikes;
  var testBike;

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

  it('And I would like to be able to sort the bikes into a custom order based on class', function() {
    //select bike with more than 2 or select the first one 
    testBike = jsonBikes.items.find(bike => bike.class.lenght > 1);
    if(!testBike){
      testBike = jsonBikes.items[0];
    }

    //set class filters as class of selected bike 
    BikesListPage.setFilters(testBike.class);

    //check correct bikes are shown
    BikesListPage.isCorrectBikesAreShown(testBike, jsonBikes).then((isCorrect) => expect(isCorrect).toBe(true));
  });

  it('And I would like my custom order to be saved and not change when I refresh the page', function() {
    //refresh page
    browser.refresh();

    //check filters are still selected
    BikesListPage.filterSideBar.getFilters().then((filters) =>{
      filters.forEach(filter => {
        if(testBike.class.includes(filter.name)){
          BikesListPage.filterSideBar.isFilterSelected(filter.name).then((isSelected) => expect(isSelected).toBe(true))
        }else{
          BikesListPage.filterSideBar.isFilterSelected(filter.name).then((isSelected) => expect(isSelected).toBe(false))
        }
      });
    });

    //check correct bikes are shown
    BikesListPage.isCorrectBikesAreShown(testBike, jsonBikes).then((isCorrect) => expect(isCorrect).toBe(true));
  });
});