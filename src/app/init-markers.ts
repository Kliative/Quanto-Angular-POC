export class Init {
    load(){
        if(localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined){
                console.log('No markers found...creating...');

                var markers = [
                    {
                        name: 'Company One',
                        lat: -26.01428,
                        lng: 28.14238,
                        draggable:true
                    },
                    {
                        name: 'Company Two',
                        lat: -26.01428,
                        lng: 28.14898,
                        draggable:true
                    },
                    {
                        name: 'Company Three',
                        lat: -26.01428,
                        lng: 28.14568,
                        draggable:true
                    }
                ];

                localStorage.setItem('markers', JSON.stringify(markers));

        } else {
            console.log('Loading Markers...');
        }
    }
}