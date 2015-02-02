<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: X-Requested-With');

$hostname = 'xxxxx';
$username = 'xxxxx';
$password = 'xxxxx';
$dbname  = 'xxxxx';

try 
{
		$nid = $_SERVER['QUERY_STRING'];
		$json = array();

    $dbh = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
		$sql = "SELECT body_value FROM field_data_body WHERE entity_id='$nid'";
		foreach($dbh->query($sql) as $row)
		{
				//---- SEND THE ENTIRE HTML PAYLOAD ----
				echo $row['body_value'];
		}
		$dbh = null;
}
catch(PDOException $e)
{
    echo $e->getMessage();
}
?>
