<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: X-Requested-With');

$hostname = 'xxxxxxx';
$username = 'xxxxxxx';
$password = 'xxxxxxx';
$dbname  = 'xxxxxxx';

try 
{
		$json = array();

    $dbh = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
		$sql = "SELECT nid, title,created FROM node WHERE type='narration' AND status='1' ORDER BY created DESC";
		foreach($dbh->query($sql) as $row)
		{
			$node = array(
				"nid" => $row['nid'],
				"title" => $row['title'],
				"date" => date("m-d-Y", $row['created']), 
			);
			$json[] = $node;
		}
		echo json_encode($json);
		$dbh = null;
}
catch(PDOException $e)
{
    echo $e->getMessage();
}
?>
