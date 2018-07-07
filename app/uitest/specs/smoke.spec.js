var BikesListPage = require('../pages/bikesList.page');

describe('Bikes Smoke Test Suite', function() {
  var jsonBikes;
  var selectedFilters;

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
        expect(expectedBike).toBeDefined(`Bike with name ${bike.name} is not displayed`);

        //if was found check all other info
        if(expectedBike != null){
          bike.class = bike.class.map(x => x.charAt(0).toUpperCase().concat(x.slice(1).toLowerCase()));
          expect(expectedBike.description).toEqual(bike.description, "Bike description is wrong!")
          expect(expectedBike.class).toEqual(bike.class, "Bike class is wrong!")
          expect(expectedBike.img).toEqual(bike.image.thumb, "Bike image url is wrong!")
        }
      });
    });
  });

  it('And I would like to see filters for all classes', function() {
    //check all filters are shown
    BikesListPage.isEveryClassHasFilter(jsonBikes).then((isCorrect) => expect(isCorrect).toBe(true, "Not correct filters are displayed"));
  });

  it('And I would like to be able to sort the bikes into a custom order based on class', function() {
    //select bike with more than 2 or select the first one 
    var testBike = jsonBikes.items.find(bike => bike.class.lenght > 1);
    if(!testBike){
      selectedFilters = jsonBikes.items[0].class;
    }else{
      selectedFilters = testBike.class;
    }

    //set class filters as class of selected bike 
    BikesListPage.setFilters(selectedFilters);

    //check correct bikes are shown
    BikesListPage.isCorrectBikesAreShown(selectedFilters, jsonBikes).then((isCorrect) => expect(isCorrect).toBe(true, "Not correct bikes are shown"));
  });

  it('And I would like my custom order to be saved and not change when I refresh the page', function() {
    //refresh page
    browser.refresh();

    //check filters are still selected
    BikesListPage.filterSideBar.getFilters().then((filters) =>{
      filters.forEach(filter => {
        if(selectedFilters.includes(filter.name)){
          BikesListPage.filterSideBar.isFilterSelected(filter.name).then((isSelected) => expect(isSelected).toBe(true, `Filter ${filter.name} is not selected`))
        }else{
          BikesListPage.filterSideBar.isFilterSelected(filter.name).then((isSelected) => expect(isSelected).toBe(false, `Filter ${filter.name} is selected`))
        }
      });
    });

    //check correct bikes are shown
    BikesListPage.isCorrectBikesAreShown(selectedFilters, jsonBikes).then((isCorrect) => expect(isCorrect).toBe(true, "Not correct bikes are shown"));
  });

  it('And I would like to be able to deselect some filter', function() {
    //deselect first selected filter
    BikesListPage.filterSideBar.deselectFilterByName(selectedFilters[0])

    //remove first element from selected filters array
    selectedFilters.shift();

    //check correct bikes are shown
    BikesListPage.isCorrectBikesAreShown(selectedFilters, jsonBikes).then((isCorrect) => expect(isCorrect).toBe(true, "Not correct bikes are shown"));
  });

  it('And I would like my custom order to be saved and not change when I refresh the page after deselect filter', function() {
    //refresh page
    browser.refresh();

    //check filters are still selected
    BikesListPage.filterSideBar.getFilters().then((filters) =>{
      filters.forEach(filter => {
        if(selectedFilters.includes(filter.name)){
          BikesListPage.filterSideBar.isFilterSelected(filter.name).then((isSelected) => expect(isSelected).toBe(true, `Filter ${filter.name} is not selected`))
        }else{
          BikesListPage.filterSideBar.isFilterSelected(filter.name).then((isSelected) => expect(isSelected).toBe(false, `Filter ${filter.name} is selected`))
        }
      });
    });

    //check correct bikes are shown
    BikesListPage.isCorrectBikesAreShown(selectedFilters, jsonBikes).then((isCorrect) => expect(isCorrect).toBe(true, "Not correct bikes are shown"));
  });
});