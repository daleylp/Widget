<?php

   //https://jonsuh.com/blog/convert-loop-through-json-php-javascript-arrays-objects/

    try{
        // Connect, retrieve all data
        require_once('dbconnect.php');
        $query = "select * from shareprices";
        $result = $con->query($query);

        // Array to store data
        $data = [];

        // Iterate through the database adding the share data to the array
        while ($row = $result->fetch()){
            array_push($data, ['name' => $row['Name'], 
                               'price' => $row['Price'],
                               'change' => $row['Change']]);
        }
        
        // Encode array into json
        $dataJSON = json_encode($data);
        echo $dataJSON;
    } 
    catch (PDOException $e){
        echo "Database connection error " . $e->getMessage();
    }

?>