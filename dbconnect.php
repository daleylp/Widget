<?php

   try{
   	// This code has been removed for security purposes
   	} 
   	catch (PDOException $e){
   		echo "Database connection error " . $e->getMessage();
   	}
	
?>