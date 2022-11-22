function showTests() {
    fetch('http://localhost:5119/tests', {
        method: 'GET',
        mode: 'cors'
    })  
    .then(  
        (response) => {  
            if (response.status !== 200) {  
                console.log('Кажется тут проблемка. Status Code: ' + response.status);  
                return;  
            }
  
            response.json().then((data) => {  
                let testsBox = document.querySelector('.tests');

                data.forEach(element => {
                    let testPreview = document.createElement('div');
                    testPreview.append();

                    testsBox.append(testPreview); 
                });
            });  
        }  
    )  
    .catch((err) => {  
        console.log('Fetch Error :-S', err);  
    });
}

showTests();