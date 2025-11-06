<?php

$dbconn = null;
if(getenv('DATABASE_URL')){ 
	$connectionConfig = parse_url(getenv('DATABASE_URL'));
	$host = $connectionConfig['host'];
	$user = $connectionConfig['user'];
	$password = $connectionConfig['pass'];
	$port = $connectionConfig['port'];
	$dbname = trim($connectionConfig['path'],'/');
	$dbconn = pg_connect(
		"host=".$host." ".
		"user=".$user." ".
		"password=".$password." ".
		"port=".$port." ".
		"dbname=".$dbname
	);
} else {
	$dbconn = pg_connect("host=localhost dbname=marbeachrec");
}

class Beach {
  public $id;
  public $name;
	public $photo;
	public $photo_credit;
  public $access;
	public $parking;
	public $hours;
	public $avail_rec;
	public $notes;

  public function __construct($id, $beach_name, $beach_photo, $photo_credit, $access, $parking, $hours, $avail_rec, $notes){
    $this->id = $id;
    $this->name = $name;
    $this->photo = $photo;
		$this->photo_credit = $photo_credit;
		$this->access = $access;
		$this->parking = $parking;
		$this->hours = $hours;
		$this->avail_rec = $avail_rec;
		$this->notes = $notes;
	}
}

class Beaches {
    static function delete($id){
      $query = "DELETE FROM beaches WHERE id = $1";
      $query_params = array($id);
      pg_query_params($query, $query_params);
      return self::all();
    }
    static function update($updated_beach) {
      $query = "UPDATE beaches SET beach_name = $1, beach_photo = $2, photo_credit = $3, access = $4, parking = $5, hours = $6, avail_rec=$7, notes = $8 WHERE id = $9";
      $query_params = array($updated_beach->beach_name, $updated_beach->beach_photo, $updated_beach->photo_credit, $updated_beach->access, $updated_beach->parking, $updated_beach->hours, $updated_beach->avail_rec, $updated_beach->notes, $updated_beach->id);
      pg_query_params($query, $query_params);
      return self::all();
    }
    static function create($beach){
      $query = "INSERT INTO beaches (name, photo, photo_credit, access, parking, hours, avail_rec, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
      $query_params = array($updated_beach->beach_name, $updated_beach->beach_photo, $updated_beach->photo_credit, $updated_beach->access, $updated_beach->parking, $updated_beach->hours, $updated_beach->avail_rec, $updated_beach->notes);    pg_query_params($query, $query_params); //pass the query and the params to pg_query_params
      return self::all();
    }

    static function all(){
      $beaches = array();
      $results = pg_query("SELECT * FROM beaches ORDER BY id ASC");
      $row_object = pg_fetch_object($results);
      while($row_object !== false){
        $new_beach = new Beach(
          intval($row_object->id),
          $row_object->beach_name,
          $row_object->beach_photo,
					$row_object->beach_photo_credit,
					$row_object->beach_access,
					$row_object->beach_parking,
					$row_object->beach_hours,
					$row_object->beach_avail_rec,
					$row_object->beach_notes,
        );
        $beaches[] = $new_beach;
        $row_object = pg_fetch_object($results);
      }
      return $beaches;
    }
	}
 ?>
