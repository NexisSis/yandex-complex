import { createChart } from './chart';

export function getDetailsContentLayout(ymaps) {
  const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    `<div class="details-info">
        {% if (properties.details) %}
            <div class="details-info">
                <div class="details-label">base station</div>
                <div class="details-title">{{properties.details.serialNumber}}</div>
                {% if (properties.details.isActive) %}
                <div class="details-state details-state_active">active</div>
                {% else %}
                <div class="details-state details-state_defective">defective</div>
                {% endif %}
                <div class="details-state details-state_connections">
                    connections: {{properties.details.connections}}
                </div>
            </div>
            <div class="details-info">
                <div class="details-label details-label_change">connections</div>             
                <canvas class="details-chart" style="position: relative;width:270px;height:100px;"/>             
            </div>
        {% else %}
            <div class="details-info">
                Loading...
            </div>
        {% endif %}
    `,
    {
      build: function(){
        BalloonContentLayout.superclass.build.call(this);

          const obj  = this.getData().object;
          console.log(obj)
        if (obj) {
          const container = this.getElement().querySelector('.details-chart');
          if(this.connectionChart){
              console.log('time to destroy');
              this.connectionChart.destroy();
          }else{
              console.log('details chart');
              if(obj.properties.details && container && obj.isActive){
                  this.connectionChart = createChart(
                      container,
                      obj.properties.details.chart,
                      obj.isActive
                  );
              }else{
                  console.log('bad chart details');
                  var label = this.getElement().querySelector('.details-label_change');
                  if(label){
                      label.innerHTML='nothing to display';
                  }
              }
          }
        }else{
            console.log('details.js file, obj data is undefinded');
        }
      },
      clear: function(){
           console.log('clear');
           console.log(this.connectionChart);
         if (this.connectionChart) {
             console.log('clear inside if');
           this.connectionChart.destroy();
           console.log(this);
           console.log('end clear');

         }
        BalloonContentLayout.superclass.clear.call(this);
       // console.log('here2');

      }
    }
  );

  return BalloonContentLayout;
}
