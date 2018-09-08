import { loadList, loadDetails } from './api';
import { getDetailsContentLayout } from './details';
import { createFilterControl } from './filter';


export function initMap(ymaps, containerId) {
  const myMap = new ymaps.Map(containerId, {
    center: [37.640732, 55.852905],
    controls: [],
    zoom: 11
  });


  const objectManager = new ymaps.ObjectManager({
    clusterize: true,
    gridSize: 64,
    clusterIconLayout: 'default#pieChart',
    clusterDisableClickZoom: false,
    geoObjectOpenBalloonOnClick: true,
    geoObjectHideIconOnBalloonOpen: true,
    geoObjectBalloonContentLayout: getDetailsContentLayout(ymaps)
  });

  objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');


  loadList().then(data => {
    objectManager.add(data);
  });

  myMap.geoObjects.add(objectManager);


    // details
    objectManager.objects.events.add('click', event => {
      const objectId = event.get('objectId');
      const obj = objectManager.objects.getById(objectId);
      objectManager.objects.balloon.open(objectId);
       if (!obj.properties.details) {
         loadDetails(objectId).then(data => {
           obj.properties.details = data;
         //  console.log('test data');
           //console.log(obj.properties);
           objectManager.objects.balloon.setData(obj);
         });
       }
    });

    // filters
    const listBoxControl = createFilterControl(ymaps);
    myMap.controls.add(listBoxControl);

    var filterMonitor = new ymaps.Monitor(listBoxControl.state);
    filterMonitor.add('filters', filters => {
      objectManager.setFilter(
        obj => filters[obj.isActive ? 'active' : 'defective']
      );
    });
}
