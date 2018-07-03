/*
 * Constructor function for a ShareWidget instance.
 * 
 * container_element : a DOM element inside which the widget will place its UI
 *
 */
 
function ShareWidget(page_element){

    //declare variables for the data properties of the widget
    var _this_widget_instance = this; // variable to hold this widget instance
    var _container = page_element; // this widget div container
    
    var _data = new Array(); // all data from the db
    var _share_lines = new Array(); // current sharelines
    
    var sorted = false; // used to check if the sharelines have already been sorted
    
    //an object literal representing the widget's UI
    var _ui = {
        //declare variables for the UI properties of the widget
        _container : null,
        _title_div : null,
	        _select_label : null,
	        _select_element : null,
	        	_option1 : null,
		        _option2 : null,
		        _option3 : null,
		        _option4 : null,
		        _option5 : null,
		        _option6 : null,
	        _br : null,
	        _button : null,
        _sort_label : null,
        _sort_company : null,
        _company_label : null,
        _sort_price : null,
        _price_label : null,
        _section : null,
   };

    /**
    * Constructor function for an inner object to hold the full share data for a company
    */

    var ShareLine = function(s_company, s_price, s_change){

        //declare variables for the data properties of one company's share information
        var _s_company = s_company;
        var _s_price = s_price;
        var _s_change = s_change;
        
        //an object literal representing the UI for the share info
        var _ui = {
            //declare variables for the UI properties of the ShareLine
            _container : null,
            _line : null,
            _br : null,
            
        };

        //function to create the DOM elements needed for the ShareLine UI
        var _createUI = function(){
            //create and initialise each of the UI elements and add them to the _ui object
            _ui._container = page_element;
            _ui._line = document.createTextNode(s_company + " " + s_price + " " + s_change);
            _ui._br = document.createElement("br");
            _ui._container.lastChild.appendChild(_ui._line);
            _ui._container.lastChild.appendChild(_ui._br);
        };

    //getter methods for ShareLine should be defined next as needed 
        this.getCompany = function(){
            return _s_company;
        }
        
        this.getPrice = function(){
            return _s_price;
        }
        
        this.getChange = function(){
            return _s_change;
        }
        
        this.getLine = function(){
            return this;
        }

        this.setPrice = function(_price){
            _s_company = _price;
        }

        _createUI();    //call this function last to build the UI

    };  //End of ShareLine constructor function
    
    //private method to construct the DOM subtree for the UI and put into container element
    // Note: indentation is added for 'element location' reference only
    var _createUI = function(){
    	
        _ui._container = page_element; // Get the div container and set the appropriate css
        _ui._container.className = "monitor"; 
        
        _ui._title_div = document.createElement("div"); // Create the title div and set the appropriate css
        _ui._title_div.className = "title";
        	
            _ui._select_label = document.createTextNode("Select company: "); // Label for select element
            _ui._select_element = document.createElement("select"); // Create the select element
            _ui._br = document.createElement("br"); // Create br element for page structure
            _ui._button = document.createElement("input"); // Create the 'update' button element and set the appropriate attributes
            _ui._button.type = "button";
            _ui._button.value = "Update";
            _ui._button.onclick = function(){
            	_update.call(null, "Update");
        	};
       
        _ui._sort_label = document.createTextNode("Sort by "); // Label for 'sort' input elements
        
        _ui._sort_company = document.createElement("input"); // Create radio element and set the appropriate attributes
        _ui._sort_company.name = _container.id; // Unique id to this widget used for sorting sort 'this' widget
        _ui._sort_company.type = "radio";
        _ui._sort_company.value = "company";
        _ui._sort_company.onclick = function(){
            _sort.call(null, "company"); // Send the label to the function as 'sorting type'
        };
        
        _ui._company_label = document.createTextNode("company"); // Label for 'company' input element
        
        _ui._sort_price = document.createElement("input"); // Create radio element and set the appropriate attributes
        _ui._sort_price.name = _container.id; // Unique id to this widget used for sorting sort 'this' widget
        _ui._sort_price.type = "radio";
        _ui._sort_price.value = "price";
        _ui._sort_price.onclick = function(){
            _sort.call(null, "price"); // Send the label to the function as 'sorting type'
        };
        
        _ui._price_label = document.createTextNode("price"); // Label for 'price' input element
        
        _ui._section = document.createElement("div"); // Create the section div and set the appropriate css
        _ui._section.className = "section";
       
        // Create the option element
        // Each option element is created and appropriate attributes are set
        // including: the hard coded company name
        // The parent elements(select element) selected index is sent when adding share line
        _ui._option1 = document.createElement("option");
        _ui._option1.value = "NZ Wind Farms";
        _ui._option1.text = "NZ Wind Farms";
        _ui._option1.onclick = function(){
            _addShareLine.call(null, _ui._option1.parentElement.selectedIndex, "NZ Wind Farms");
        };
        
        _ui._option2 = document.createElement("option");
        _ui._option2.value = "Foley Wines";
        _ui._option2.text = "Foley Wines";
        _ui._option2.onclick = function(){
            _addShareLine.call(null, _ui._option2.parentElement.selectedIndex, "Foley Wines");
        };
        
        _ui._option3 = document.createElement("option");
        _ui._option3.value = "Geneva Finance";
        _ui._option3.text = "Geneva Finance";
        _ui._option3.onclick = function(){
            _addShareLine.call(null, _ui._option3.parentElement.selectedIndex, "Geneva Finance");
        };
        
        _ui._option4 = document.createElement("option");
        _ui._option4.value = "Xero Live";
        _ui._option4.text = "Xero Live";
        _ui._option4.onclick = function(){
            _addShareLine.call(null, _ui._option4.parentElement.selectedIndex, "Xero Live");
        };
        
        _ui._option5 = document.createElement("option");
        _ui._option5.value = "Moa Group Ltd";
        _ui._option5.text = "Moa Group Ltd";
        _ui._option5.onclick = function(){
            _addShareLine.call(null, _ui._option5.parentElement.selectedIndex, "Moa Group Ltd");
        };
        
        _ui._option6 = document.createElement("option");
        _ui._option6.value = "Solution Dynamics";
        _ui._option6.text = "Solution Dynamics";
        _ui._option6.onclick = function(){
            _addShareLine.call(null, _ui._option6.parentElement.selectedIndex, "Solution Dynamics");
        };
        
        // Append the elements appropriately
        _ui._title_div.appendChild(_ui._select_label);
        _ui._title_div.appendChild(_ui._select_element);
        _ui._title_div.appendChild(_ui._br);
        _ui._title_div.appendChild(_ui._button);
        
        _ui._select_element.appendChild(_ui._option1);
        _ui._select_element.appendChild(_ui._option2);
        _ui._select_element.appendChild(_ui._option3);
        _ui._select_element.appendChild(_ui._option4);
        _ui._select_element.appendChild(_ui._option5);
        _ui._select_element.appendChild(_ui._option6);
        
        _ui._container.appendChild(_ui._title_div);
        _ui._container.appendChild(_ui._sort_label);
        _ui._container.appendChild(_ui._sort_company);
        _ui._container.appendChild(_ui._company_label);
        _ui._container.appendChild(_ui._sort_price);
        _ui._container.appendChild(_ui._price_label);
        _ui._container.appendChild(_ui._section);
        
    }
    
    // Removes the lines and adds the lines from shareLines list
    this.updateDisplay = function(){
        // array to temporarily store new share lines
        var _tmp = new Array();
        
        // Remove all lines
        while (_container.lastChild.hasChildNodes()){
            _container.lastChild.removeChild(_container.lastChild.lastChild);
        }
        
        //Add all items already displayed from share lines using data from _data array
        for (var i = 0; i < _share_lines.length; i++){
            
            //find the item in _data and set the index
            for (var j = 0; j < _data.length; j++){
                if (_data[j].name == _share_lines[i].getCompany()){
                    index = j;
                    
                }
            }
            
            var _new_line = new ShareLine(_data[index].name, _data[index].price, _data[index].change); // Create a new line
            _tmp.push(_new_line.getLine()); // Add to temporary array
            
        }
        _share_lines = _tmp; // Replace current share lines array with the temporary array
    }

    /**
     * private methods for the rest of the functionality should
     * be added below 
     */
    
    // Adds a share line if it is not already displayed
    var _addShareLine = function(index, label){
        // Check the selected index is not already on sharelines
        // If it is, the selected item is already displayed on the widget.
        for (var i = 0; i < _share_lines.length; i++){
            if (_share_lines[i].getCompany() == label){
                return; // Return if already displayed
            }
        }

        // add the line to lines array from _data array
        var _new_line = new ShareLine(_data[index].name, _data[index].price, _data[index].change);
        _share_lines.push(_new_line.getLine());
        // Sort if already sorted so new share line is displayed in sorted order
        if (sorted){
            //sort by selected index
            var _radios = document.getElementsByName(_container.id); // Gets the instance of 'this' radio element
            var _label
            for (var j = 0; j < _radios.length; j++){
                if (_radios[j].checked) _label = _radios[j].value;
            }
            _sort(_label);
        }
    }

    // the data array is updated every second, this will update the display when executed
    var _update = function(){
        _this_widget_instance.updateDisplay();   // Call method to replace with share lines
        // Sort if already sorted so new share line is displayed in sorted order
        if (sorted){
            //sort by selected index
            var _radios = document.getElementsByName(_container.id);
            var _label
            for (var i = 0; i < _radios.length; i++){
                if (_radios[i].checked) _label = _radios[i].value;
            }
            _sort(_label);
        }
    }
    
    
    // Reference used to implement sorting methods:
    //https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
    //https://stackoverflow.com/questions/18496898/sorting-array-of-float-point-numbers
    var _sort = function(label){
        if (label == "company"){
            //sort _share_lines by company
            _share_lines.sort(function(a, b){
                var name_a = a.getCompany().toLowerCase();
                var name_b = b.getCompany().toLowerCase();
                if (name_a < name_b) return -1;
                if (name_a > name_b) return 1;
                else return 0;
            });
        }
        if (label == "price"){
            //sort _share_lines by price
            _share_lines.sort(function(a, b){
                var name_a = parseFloat(a.getPrice());
                var name_b = parseFloat(b.getPrice());
                return name_a - name_b;
            });"invalid"
        }
        // Update with sorted list
        _this_widget_instance.updateDisplay();
        sorted = true; // Set sorted to true so this
    }
    
    // AJAX request
    var AjaxRequest = function(method, url, async, data, callback){

        var request = new XMLHttpRequest();
        request.open(method,url,async);

        if(method == "POST"){
            request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        }
        
        request.onreadystatechange = function(){
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var response = request.responseText;
                    callback(response);
                } else {
                    //do nothing
                }
            }
        }
        request.send(data);
    }
    
    // Requests all data in an ajax request and returns a json array
    var GetData = function(){
        AjaxRequest("POST", "get_data.php", true, "", GetDataCallback);
    }

    // Uses json parse to get the response (data from the database json array)
    // and stores it into the data array
    var GetDataCallback = function(response){
		var _tmp = new Array(); // Temporary array to store the new data
        _data = JSON.parse(response); // Parse the array
        
        for (var i = 0; i < _data.length; i++){
        	// Share object contains data for each company
            var _share = {name: _data[i].name, price: _data[i].price, change: _data[i].change};
            // Add the new object to the temporary array
            _tmp.push(_share);
        }
        // Store the temporary array into the data array
        _data = _tmp;
        
    }

    //private method to intialise the widget's UI on start up
    var _initialise = function(container_element){
        _createUI(container_element);
    }
    
    // https://stackoverflow.com/questions/2170923/whats-the-easiest-way-to-call-a-function-every-5-seconds-in-jquery
	// execute the get data function every 0.1 seconds
	window.setInterval(function(){
		GetData();
	}, 100);
    
    _initialise(_container);   //finally call the _initialise function 
} 